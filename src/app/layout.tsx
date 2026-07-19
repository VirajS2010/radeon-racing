import type { Metadata, Viewport } from 'next';
import { Anton, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const description =
  'Team Radeon is a STEM Racing team engineering the RF4 — a precision-built miniature race car competing on the world stage.';

export const metadata: Metadata = {
  metadataBase: new URL('https://radeonracing.example'),
  title: {
    default: 'Radeon Racing — Rethink Speed. Redefine Limits.',
    template: '%s — Radeon Racing',
  },
  description,
  keywords: [
    'STEM Racing',
    'Team Radeon',
    'RF4',
    'motorsport engineering',
    'New Delhi',
  ],
  openGraph: {
    title: 'Radeon Racing — STEM Racing',
    description: 'Rethink Speed. Redefine Limits. Team Radeon STEM Racing.',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radeon Racing — STEM Racing',
    description: 'Rethink Speed. Redefine Limits. Team Radeon STEM Racing.',
    images: ['/assets/images/app_logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '64x64', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/favicon.png',
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${jakarta.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-radeon focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
