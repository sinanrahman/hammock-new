'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { createWhatsAppUrl, getGeneralBookingMessage } from '../../lib/whatsapp';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Ensure the form uses client side Suspense if needed, but we can wrap the whole page or just the search params part.
import { Suspense } from 'react';

const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/drJBcrAJQxoBUNR67";
const PHONE_NUMBER = "+91 85477 31887";
const PHONE_LINK = "tel:+918547731887";

const roomsList = [
  "Room 01", "Room 02", "Room 03", "Room 04", "Room 05",
  "Room 06", "Room 07", "Room 08", "Room 09", "Room 10"
];

function ContactContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const roomParam = searchParams.get('room');
  
  // Format room from 'room-1' to 'Room 01'
  const initialRoom = roomParam 
    ? `Room ${roomParam.replace('room-', '').padStart(2, '0')}`
    : '';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    arrivalDate: '',
    departureDate: '',
    guests: '',
    selectedRoom: initialRoom,
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Hero entrance
    gsap.fromTo('.contact-hero-anim', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
    );

    // Section reveals
    const sections = gsap.utils.toArray('.contact-section-anim');
    sections.forEach((section: any) => {
      gsap.fromTo(section,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%'
          }
        }
      );
    });

  }, { scope: containerRef });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.arrivalDate) {
      newErrors.arrivalDate = 'Arrival date is required';
    } else {
      const arrDate = new Date(formData.arrivalDate);
      if (arrDate < today) newErrors.arrivalDate = 'Arrival date cannot be in the past';
    }

    if (!formData.departureDate) {
      newErrors.departureDate = 'Departure date is required';
    } else if (formData.arrivalDate) {
      const arrDate = new Date(formData.arrivalDate);
      const depDate = new Date(formData.departureDate);
      if (depDate <= arrDate) newErrors.departureDate = 'Departure date must be after arrival date';
    }

    if (formData.guests && parseInt(formData.guests) < 1) {
      newErrors.guests = 'Guest count must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    let message = `Hello HAMMOCK Suites & Rooms, I would like to enquire about booking a stay.\n`;
    message += `Room: ${formData.selectedRoom || 'Not selected'}\n`;
    message += `Name: ${formData.fullName}\n`;
    message += `Arrival date: ${formData.arrivalDate}\n`;
    message += `Departure date: ${formData.departureDate}\n`;
    if (formData.guests) message += `Guests: ${formData.guests}\n`;
    message += `Phone: ${formData.phone}\n`;
    if (formData.email) message += `Email: ${formData.email}\n`;
    if (formData.message) message += `Special request: ${formData.message}\n`;
    message += `Please confirm availability and share the booking details.`;

    window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div ref={containerRef}>
      <Header />
      <main>
        {/* Nav spacer */}
        <div style={{ height: 'var(--nav-height)', backgroundColor: 'var(--hammock-cream)' }} />

        {/* 1. Contact hero */}
        <section style={{ backgroundColor: 'var(--hammock-cream)', padding: 'var(--spacing-16) 0 var(--spacing-24) 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
            <span className="contact-hero-anim" style={{ display: 'block', color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1.5rem' }}>
              CONTACT HAMMOCK
            </span>
            <h1 className="contact-hero-anim text-display" style={{ color: 'var(--hammock-burgundy)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Your stay begins here.
            </h1>
            <p className="contact-hero-anim text-body-lg" style={{ color: 'var(--hammock-burgundy)', opacity: 0.8, maxWidth: '540px', margin: '0 auto 2.5rem auto' }}>
              Planning a stay, exploring our rooms or arranging a visit? Connect with HAMMOCK and we’ll help you with the details.
            </p>
            <div className="contact-hero-anim" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={createWhatsAppUrl(getGeneralBookingMessage())} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '1rem 2rem', borderRadius: '999px', backgroundColor: 'var(--hammock-burgundy)', color: 'var(--hammock-cream)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', border: '1px solid var(--hammock-burgundy)' }}>
                Book on WhatsApp
              </a>
              <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer" style={{ padding: '1rem 2rem', borderRadius: '999px', color: 'var(--hammock-burgundy)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', border: '1px solid rgba(89, 10, 23, 0.2)' }}>
                View Location
              </a>
            </div>
          </div>
        </section>

        {/* 2. Main contact options */}
        <section className="contact-section-anim" style={{ backgroundColor: 'var(--hammock-cream)', paddingBottom: 'var(--spacing-24)' }}>
          <div className="container">
            <div className="contact-options-grid">
              <div className="contact-option-card">
                <h3 className="option-title">Plan your stay</h3>
                <p className="option-copy">Speak with us directly to check room availability and share your preferred dates.</p>
                <a href={createWhatsAppUrl(getGeneralBookingMessage())} target="_blank" rel="noopener noreferrer" className="option-link">Book on WhatsApp</a>
              </div>
              <div className="contact-option-card">
                <h3 className="option-title">Call HAMMOCK</h3>
                <p className="option-copy" style={{ fontSize: '1.25rem', fontFamily: 'var(--font-cormorant)' }}>{PHONE_NUMBER}</p>
                <a href={PHONE_LINK} className="option-link">Call us</a>
              </div>
              <div className="contact-option-card">
                <h3 className="option-title">Visit HAMMOCK</h3>
                <p className="option-copy">Open our location in Google Maps for directions to HAMMOCK Suites & Rooms.</p>
                <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer" className="option-link">Get Directions</a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Booking enquiry form */}
        <section className="contact-section-anim" style={{ backgroundColor: 'var(--hammock-cream)', paddingBottom: 'var(--spacing-32)' }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ padding: '3rem', backgroundColor: 'var(--hammock-cream)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(89, 10, 23, 0.1)' }}>
                <h2 className="text-display" style={{ fontSize: '2.5rem', color: 'var(--hammock-burgundy)', marginBottom: '2rem' }}>Booking Enquiry</h2>
                <form onSubmit={handleSubmit} className="booking-form" noValidate>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="fullName">Full name *</label>
                      <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined} />
                      {errors.fullName && <span className="error-msg" id="fullName-error">{errors.fullName}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone number *</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
                      {errors.phone && <span className="error-msg" id="phone-error">{errors.phone}</span>}
                    </div>
                    <div className="form-group full-width">
                      <label htmlFor="email">Email address</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                      {errors.email && <span className="error-msg" id="email-error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="arrivalDate">Arrival date *</label>
                      <input type="date" id="arrivalDate" name="arrivalDate" value={formData.arrivalDate} onChange={handleInputChange} aria-invalid={!!errors.arrivalDate} aria-describedby={errors.arrivalDate ? "arrivalDate-error" : undefined} />
                      {errors.arrivalDate && <span className="error-msg" id="arrivalDate-error">{errors.arrivalDate}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="departureDate">Departure date *</label>
                      <input type="date" id="departureDate" name="departureDate" value={formData.departureDate} onChange={handleInputChange} aria-invalid={!!errors.departureDate} aria-describedby={errors.departureDate ? "departureDate-error" : undefined} />
                      {errors.departureDate && <span className="error-msg" id="departureDate-error">{errors.departureDate}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="guests">Number of guests</label>
                      <input type="number" id="guests" name="guests" min="1" value={formData.guests} onChange={handleInputChange} aria-invalid={!!errors.guests} aria-describedby={errors.guests ? "guests-error" : undefined} />
                      {errors.guests && <span className="error-msg" id="guests-error">{errors.guests}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="selectedRoom">Selected room</label>
                      <select id="selectedRoom" name="selectedRoom" value={formData.selectedRoom} onChange={handleInputChange}>
                        <option value="">Not selected</option>
                        {roomsList.map(room => (
                          <option key={room} value={room}>{room}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group full-width">
                      <label htmlFor="message">Message or special request</label>
                      <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div style={{ marginTop: '2.5rem' }}>
                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '999px', backgroundColor: 'var(--hammock-burgundy)', color: 'var(--hammock-cream)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}>
                      Continue on WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Location */}
        <section className="contact-section-anim" style={{ backgroundColor: 'var(--hammock-cream)', paddingBottom: 'var(--spacing-32)' }}>
          <div className="container">
            <div className="location-panel">
              <div className="location-content">
                <div style={{ position: 'relative', width: '48px', height: '48px', marginBottom: '1.5rem' }}>
                  <Image src="/h-mark-cream.svg" alt="HAMMOCK Mark" fill style={{ objectFit: 'contain' }} aria-hidden="true" />
                </div>
                <h2 className="text-display" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                  Find your way to HAMMOCK.
                </h2>
                <p style={{ opacity: 0.9, marginBottom: '2rem', maxWidth: '400px', lineHeight: 1.6 }}>
                  Use Google Maps for accurate directions to HAMMOCK Suites & Rooms.
                </p>
                <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '1rem 2rem', borderRadius: '999px', backgroundColor: 'var(--hammock-cream)', color: 'var(--hammock-burgundy)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}>
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Helpful information */}
        <section className="contact-section-anim" style={{ backgroundColor: 'var(--hammock-cream)', paddingBottom: 'var(--spacing-32)' }}>
          <div className="container">
            <h2 className="text-display text-center" style={{ fontSize: '2.5rem', color: 'var(--hammock-burgundy)', marginBottom: '3rem' }}>Before you arrive.</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3 className="info-title">Room enquiries</h3>
                <p className="info-copy">Contact us on WhatsApp to check current room availability and choose the right stay.</p>
              </div>
              <div className="info-card">
                <h3 className="info-title">Group and extended stays</h3>
                <p className="info-copy">Planning a longer visit or travelling as a group? Share your requirements and we’ll help you explore the available options.</p>
              </div>
              <div className="info-card">
                <h3 className="info-title">Gym and conference enquiries</h3>
                <p className="info-copy">For information about the gym or conference space, contact the HAMMOCK team directly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Closing CTA */}
        <section className="contact-section-anim" style={{ backgroundColor: 'var(--hammock-burgundy)', color: 'var(--hammock-cream)', padding: 'var(--spacing-24) 0' }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '48px', height: '48px', marginBottom: '2rem', opacity: 0.9 }}>
                <Image src="/h-mark-cream.svg" alt="" fill style={{ objectFit: 'contain' }} aria-hidden="true" />
              </div>
              <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                A comfortable stay is only a message away.
              </h2>
              <p className="text-body-lg" style={{ opacity: 0.8, marginBottom: '2.5rem', maxWidth: '540px' }}>
                Tell us your dates and we’ll help you take the next step.
              </p>
              <a href={createWhatsAppUrl(getGeneralBookingMessage())} target="_blank" rel="noopener noreferrer" style={{ padding: '1rem 2rem', borderRadius: '999px', backgroundColor: 'var(--hammock-cream)', color: 'var(--hammock-burgundy)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', display: 'inline-block' }}>
                Book Now on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .contact-options-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(89, 10, 23, 0.1);
        }
        .contact-option-card {
          display: flex;
          flex-direction: column;
        }
        .option-title {
          color: var(--hammock-burgundy);
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }
        .option-copy {
          color: var(--hammock-burgundy);
          opacity: 0.8;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        .option-link {
          color: var(--hammock-burgundy);
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-decoration: none;
          position: relative;
          align-self: flex-start;
        }
        .option-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--hammock-burgundy);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        .option-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* Form Styles */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        label {
          color: var(--hammock-burgundy);
          font-size: 0.875rem;
          font-weight: 500;
        }
        input, select, textarea {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 1px solid rgba(89, 10, 23, 0.2);
          border-radius: 8px;
          background-color: transparent;
          color: var(--hammock-burgundy);
          font-family: var(--font-inter);
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--hammock-burgundy);
          box-shadow: 0 0 0 2px rgba(89, 10, 23, 0.1);
        }
        input[aria-invalid="true"] {
          border-color: #d32f2f;
        }
        .error-msg {
          color: #d32f2f;
          font-size: 0.75rem;
        }

        /* Location Panel */
        .location-panel {
          background-color: var(--hammock-burgundy);
          color: var(--hammock-cream);
          border-radius: var(--radius-xl);
          padding: 4rem;
          position: relative;
          overflow: hidden;
        }
        .location-panel::before {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          background-image: radial-gradient(circle at 80% 20%, rgba(245, 235, 213, 0.05) 0%, transparent 40%),
                            linear-gradient(45deg, transparent 48%, rgba(245, 235, 213, 0.03) 49%, rgba(245, 235, 213, 0.03) 51%, transparent 52%);
          background-size: 100% 100%, 40px 40px;
          pointer-events: none;
        }
        .location-content {
          position: relative;
          z-index: 1;
          max-width: 600px;
        }

        /* Info Grid */
        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .info-card {
          text-align: center;
        }
        .info-title {
          color: var(--hammock-burgundy);
          font-size: 1.125rem;
          font-family: var(--font-cormorant);
          margin-bottom: 1rem;
        }
        .info-copy {
          color: var(--hammock-burgundy);
          opacity: 0.8;
          line-height: 1.6;
          font-size: 0.9375rem;
        }

        @media (max-width: 768px) {
          .contact-options-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
          .info-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .location-panel {
            padding: 3rem 2rem;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .contact-hero-anim, .contact-section-anim {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
      <Footer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: 'var(--hammock-cream)' }} />}>
      <ContactContent />
    </Suspense>
  );
}
