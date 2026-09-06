'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { submitContactForm } from './actions';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const arrival = formData.get('arrival') as string;
    const departure = formData.get('departure') as string;

    if (new Date(departure) <= new Date(arrival)) {
      setStatus('error');
      setErrorMessage('Departure date must be after arrival date.');
      return;
    }

    try {
      // Connect to the project's existing backend if present; otherwise provide a documented server-action/API placeholder with visible error handling and a configuration note.
      await submitContactForm(formData);
    } catch {
      setStatus('error');
      setErrorMessage('Form submission is currently not configured to a real backend. Please configure the server action in `app/contact/actions.ts`.');
    }
  };

  return (
    <>
      <Header />
      <main>
        <div style={{ height: 'var(--nav-height)', backgroundColor: 'var(--hammock-cream)' }} />

        <section style={{ padding: 'var(--spacing-16) 0 var(--spacing-24)', backgroundColor: 'var(--hammock-cream)' }}>
          <div className="container">
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h1 className="text-display" style={{ marginBottom: '1rem', textAlign: 'center' }}>Contact Us</h1>
              <p className="text-body-lg" style={{ opacity: 0.8, marginBottom: '3rem', textAlign: 'center' }}>
                We are here to assist with your booking, answer any questions, and ensure your stay is perfectly arranged.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {status === 'error' && (
                  <div style={{ backgroundColor: 'rgba(89, 10, 23, 0.1)', padding: '1rem', borderRadius: 'var(--radius-sm)', color: 'var(--hammock-burgundy)', border: '1px solid var(--hammock-burgundy)' }}>
                    {errorMessage}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Name</label>
                    <input type="text" id="name" name="name" required style={{ padding: '0.75rem', border: '1px solid rgba(89,10,23,0.3)', borderRadius: 'var(--radius-sm)', backgroundColor: 'transparent', fontFamily: 'inherit', color: 'inherit' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email</label>
                    <input type="email" id="email" name="email" required style={{ padding: '0.75rem', border: '1px solid rgba(89,10,23,0.3)', borderRadius: 'var(--radius-sm)', backgroundColor: 'transparent', fontFamily: 'inherit', color: 'inherit' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="phone" style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Phone</label>
                  <input type="tel" id="phone" name="phone" style={{ padding: '0.75rem', border: '1px solid rgba(89,10,23,0.3)', borderRadius: 'var(--radius-sm)', backgroundColor: 'transparent', fontFamily: 'inherit', color: 'inherit' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="arrival" style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Arrival Date</label>
                    <input type="date" id="arrival" name="arrival" required style={{ padding: '0.75rem', border: '1px solid rgba(89,10,23,0.3)', borderRadius: 'var(--radius-sm)', backgroundColor: 'transparent', fontFamily: 'inherit', color: 'inherit' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="departure" style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Departure Date</label>
                    <input type="date" id="departure" name="departure" required style={{ padding: '0.75rem', border: '1px solid rgba(89,10,23,0.3)', borderRadius: 'var(--radius-sm)', backgroundColor: 'transparent', fontFamily: 'inherit', color: 'inherit' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="guests" style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Number of Guests</label>
                  <select id="guests" name="guests" style={{ padding: '0.75rem', border: '1px solid rgba(89,10,23,0.3)', borderRadius: 'var(--radius-sm)', backgroundColor: 'transparent', fontFamily: 'inherit', color: 'inherit', WebkitAppearance: 'none' }}>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4+">4+ Guests</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="message" style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Message</label>
                  <textarea id="message" name="message" rows={5} required style={{ padding: '0.75rem', border: '1px solid rgba(89,10,23,0.3)', borderRadius: 'var(--radius-sm)', backgroundColor: 'transparent', fontFamily: 'inherit', color: 'inherit', resize: 'vertical' }}></textarea>
                </div>

                <button type="submit" disabled={status === 'submitting'} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
