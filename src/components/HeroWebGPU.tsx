'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import type { Mesh } from 'three';
import {
  abs, add, blendScreen, float, mix, mod,
  mx_cell_noise_float, oneMinus, pass,
  smoothstep, texture, uniform, uv, vec2, vec3,
} from 'three/tsl';

const DEPTHMAP = { src: '/assets/images/logo-depth.png' };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);

// ── Scramble text hook ────────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%<>[]{}/?';

function useScramble(text: string, active: boolean, speed = 55) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!active) { setOut(''); return; }
    let frame = 0;
    const framesPerChar = 3;
    const total = text.length * framesPerChar;
    let raf: number;
    let last = 0;

    const run = (ts: number) => {
      if (ts - last >= speed) {
        setOut(
          text.split('').map((char, i) => {
            if (char === ' ' || char === '.') return char;
            if (i < Math.floor(frame / framesPerChar)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );
        frame++;
        last = ts;
      }
      if (frame <= total) raf = requestAnimationFrame(run);
      else setOut(text);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [active, text, speed]);

  return out || text.replace(/[^. ]/g, '_');
}

// ── Post Processing — dual scan beams + bloom ─────────────────────────────────
const PostProcessing = () => {
  const { gl, scene, camera } = useThree();
  const scanA = useRef({ value: 0 });
  const scanB = useRef({ value: 1 });

  const render = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pp = new THREE.PostProcessing(gl as any);
    const scenePass = pass(scene, camera);
    const col = scenePass.getTextureNode('output');
    const bloomPass = bloom(col, 1.4, 0.4, 0.85);

    // Beam A — top → bottom (red)
    const uA = uniform(0); scanA.current = uA;
    const lineA = smoothstep(0, float(0.10), abs(uv().y.sub(float(uA.value))));
    const beamA = vec3(1, 0.05, 0).mul(oneMinus(lineA)).mul(0.55);

    // Beam B — bottom → top (slightly orange tint)
    const uB = uniform(1); scanB.current = uB;
    const lineB = smoothstep(0, float(0.07), abs(uv().y.sub(float(uB.value))));
    const beamB = vec3(1, 0.25, 0).mul(oneMinus(lineB)).mul(0.25);

    const withBeams = mix(col, add(col, add(beamA, beamB)), 1.0);
    pp.outputNode = withBeams.add(bloomPass);
    return pp;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, scene, camera]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    scanA.current.value = Math.sin(t * 0.45) * 0.44 + 0.56;
    scanB.current.value = Math.sin(t * 0.38 + 1.2) * 0.44 + 0.56;
    render.renderAsync();
  }, 1);

  return null;
};

// ── Scene — dense red particle grid ──────────────────────────────────────────
const WIDTH = 400, HEIGHT = 300;

const Scene = () => {
  const depthMap = useTexture(DEPTHMAP.src);
  const meshRef  = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => { if (depthMap) setVisible(true); }, [depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uProgress  = uniform(0);
    const uProgress2 = uniform(0.5);

    // vec4 texture — safe for all TSL versions
    const tD = texture(depthMap);
    const aspect  = float(WIDTH).div(HEIGHT);
    const tUv     = vec2(uv().x.mul(aspect), uv().y);

    // Layer 1 — fine grid (140 tiling)
    const t1 = vec2(140.0);
    const tiled1   = mod(tUv.mul(t1), 2.0).sub(1.0);
    const bright1  = mx_cell_noise_float(tUv.mul(t1).div(2));
    const dot1     = float(smoothstep(0.5, 0.47, float(tiled1.length()))).mul(bright1);
    const flow1    = oneMinus(smoothstep(0, 0.28, abs(tD.sub(uProgress))));

    // Layer 2 — coarser grid (60 tiling) — secondary pulse
    const t2 = vec2(60.0);
    const tiled2   = mod(tUv.mul(t2), 2.0).sub(1.0);
    const bright2  = mx_cell_noise_float(tUv.mul(t2).div(2));
    const dot2     = float(smoothstep(0.5, 0.45, float(tiled2.length()))).mul(bright2);
    const flow2    = oneMinus(smoothstep(0, 0.38, abs(tD.sub(uProgress2))));

    const mask1 = dot1.mul(flow1).mul(vec3(9, 0.05, 0.05));
    const mask2 = dot2.mul(flow2).mul(vec3(4, 0.3, 0.05));
    const combined = add(mask1, mask2);
    const final = blendScreen(vec3(0), combined);

    const mat = new THREE.MeshBasicNodeMaterial({ colorNode: final, transparent: true, opacity: 0 });
    return { material: mat, uniforms: { uProgress, uProgress2 } };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Keep progress in [0.12, 1.0] — never reaches 0 so background stays off
    uniforms.uProgress.value  = Math.sin(t * 0.45) * 0.44 + 0.56;
    uniforms.uProgress2.value = Math.sin(t * 0.38 + 1.2) * 0.44 + 0.56;
    if (meshRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const m = meshRef.current.material as any;
      if (m?.opacity !== undefined) m.opacity = THREE.MathUtils.lerp(m.opacity, visible ? 1 : 0, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[w * 0.75, h * 0.75, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

// ── HTML overlay ──────────────────────────────────────────────────────────────
function ScrambleWord({ word, active, delay = 0 }: { word: string; active: boolean; delay?: number }) {
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setTriggered(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);
  const text = useScramble(word, triggered, 28);
  return (
    <span
      style={{
        opacity: triggered ? 1 : 0,
        transition: 'opacity 0.1s',
        fontVariantNumeric: 'tabular-nums',
        display: 'inline-block',
        minWidth: `${word.length}ch`,
      }}
    >
      {text || word}
    </span>
  );
}

export function HeroWebGPU() {
  const [started, setStarted] = useState(false);

  // Kick off text after 0.6s
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="h-svh relative overflow-hidden bg-black">

      {/* Text overlay */}
      <div className="pointer-events-none absolute inset-0 z-[60] flex flex-col items-center justify-center gap-4 px-6 text-center uppercase">

        {/* Glowing team logo */}
        <div
          style={{
            opacity: started ? 1 : 0,
            transform: started ? 'scale(1)' : 'scale(0.8)',
            transition: 'opacity 1s ease 0.2s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.2s',
            marginBottom: '1.5rem',
          }}
        >
          {/* Outer red halo */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute rounded-full"
              style={{
                width: 220, height: 220,
                background: 'radial-gradient(circle, rgba(215,25,32,0.22) 0%, transparent 70%)',
                filter: 'blur(28px)',
                animation: 'logo-pulse 2.8s ease-in-out infinite',
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/logo.png"
              alt="Radeon"
              className="logo-glow relative z-10"
              style={{ width: 160, height: 160, objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Main title */}
        <div
          className="font-heading text-white"
          style={{ fontSize: 'clamp(5rem, 17vw, 13rem)', lineHeight: 0.86, letterSpacing: '-0.02em' }}
        >
          <ScrambleWord word="RADEON." active={started} delay={0} />
        </div>

        {/* Tagline line */}
        <div
          className="font-heading text-white/60"
          style={{ fontSize: 'clamp(0.75rem, 2.2vw, 1.4rem)', letterSpacing: '0.3em' }}
        >
          <ScrambleWord word="RETHINK SPEED. REDEFINE LIMITS." active={started} delay={400} />
        </div>

        {/* Divider */}
        <div
          style={{
            width: started ? '120px' : '0px',
            height: '1px',
            background: 'rgba(215,25,32,0.8)',
            transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1) 1s',
          }}
        />

        {/* Subtitle */}
        <div
          className="max-w-xl normal-case text-white/70"
          style={{
            fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
            opacity: started ? 1 : 0,
            transform: started ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.8s ease 1.4s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 1.4s',
          }}
        >
          India&rsquo;s finest STEM Racing team —<br className="hidden sm:block" />
          built to compete on the world stage.
        </div>

        {/* CTAs */}
        <div
          className="pointer-events-auto mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 normal-case"
          style={{
            opacity: started ? 1 : 0,
            transform: started ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.7s ease 1.9s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 1.9s',
          }}
        >
          <a href="#team"     className="apple-link text-[15px]">Meet the Team →</a>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <a href="#rf4"      className="apple-link text-[15px]">Our Car →</a>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <a href="#contact"  className="apple-link text-[15px]">Get in Touch →</a>
        </div>
      </div>

      {/* Scroll CTA */}
      <button
        className="explore-btn"
        style={{ animationDelay: '2.6s' }}
        onClick={() => document.getElementById('rf4')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Scroll to explore
        <span className="explore-arrow">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <path d="M11 5V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 12L11 17L16 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* WebGPU Canvas */}
      <Canvas
        flat
        className="absolute inset-0"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gl={async (props) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const renderer = new THREE.WebGPURenderer(props as any);
          await renderer.init();
          return renderer;
        }}
      >
        <PostProcessing />
        <Scene />
      </Canvas>
    </div>
  );
}
