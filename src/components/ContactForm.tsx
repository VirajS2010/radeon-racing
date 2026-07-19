'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { enquiryTypes } from '@/data/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

    // No endpoint configured yet — surface a clear, honest message rather
    // than pretending the message was sent. Wire NEXT_PUBLIC_CONTACT_ENDPOINT
    // in .env.local (see README) to enable real delivery.
    if (!endpoint) {
      setStatus('error');
      setError(
        'Form endpoint not configured yet. Set NEXT_PUBLIC_CONTACT_ENDPOINT to start receiving messages.',
      );
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Something went wrong sending your message. Please try again.');
    }
  }

  const field =
    'w-full rounded-brand border border-line bg-surface px-4 py-3 text-sm text-chalk placeholder:text-faint outline-none focus:border-radeon transition-colors duration-150';

  return (
    <form onSubmit={handleSubmit} className="card p-6 md:p-8" noValidate>
      <h3 className="font-heading text-xl">Send a Message</h3>

      <div className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm text-muted">Full Name</span>
            <input name="fullName" required autoComplete="name" className={field} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-muted">Email Address</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={field}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm text-muted">Organisation</span>
          <input name="organisation" autoComplete="organization" className={field} />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-muted">Enquiry Type</span>
          <select name="enquiryType" className={field} defaultValue={enquiryTypes[0]}>
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-muted">Message</span>
          <textarea name="message" rows={4} required className={field} />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary mt-6 w-full disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
        {status !== 'submitting' && <Send size={16} />}
      </button>

      <div aria-live="polite" className="mt-4 min-h-5 text-sm">
        {status === 'success' && (
          <p className="text-green-400">Thanks — your message is on its way.</p>
        )}
        {status === 'error' && <p className="text-radeon-bright">{error}</p>}
      </div>
    </form>
  );
}
