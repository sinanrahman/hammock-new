'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Hero entrance
    gsap.fromTo('.hero-anim', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
    );

    // Split sections (Story & Rooms)
    const splitSections = gsap.utils.toArray('.split-section') as HTMLElement[];
    splitSections.forEach((section) => {
      const imgWrapper = section.querySelector('.split-img-wrapper');
      const img = section.querySelector('img');
      const textGroup = section.querySelectorAll('.split-text-anim');

      // Image Mask Reveal
      gsap.fromTo(imgWrapper, 
        { clipPath: 'inset(10% 0 10% 0)' },
        { 
          clipPath: 'inset(0% 0 0% 0)',
          ease: 'power3.out',
          duration: 1.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );

      // Image Scale
      gsap.fromTo(img,
        { scale: 1.05 },
        {
          scale: 1,
          ease: 'power3.out',
          duration: 1.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );

      // Text reveal
      gsap.fromTo(textGroup,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        }
      );
    });

    // Idea Section
    gsap.fromTo('.idea-anim',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.idea-section', start: 'top 75%' } }
    );
    
    // H mark mask reveal
    gsap.fromTo('.h-mark-wrapper',
      { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
      { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.idea-section', start: 'top 75%' } }
    );

    // Values Section
    const valueItems = gsap.utils.toArray('.value-item') as HTMLElement[];
    valueItems.forEach((item) => {
      const divider = item.querySelector('.value-divider');
      const content = item.querySelectorAll('.value-content');
      
      const tl = gsap.timeline({
        scrollTrigger: { trigger: item, start: 'top 85%' }
      });

      tl.fromTo(divider, 
        { scaleX: 0, transformOrigin: 'left' }, 
        { scaleX: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(content,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        "-=0.4"
      );
    });

    // Closing Section
    gsap.fromTo('.closing-anim',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.closing-section', start: 'top 75%' } }
    );
    
    gsap.fromTo('.closing-img-wrapper',
      { clipPath: 'inset(10% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', ease: 'power3.out', duration: 1.2, scrollTrigger: { trigger: '.closing-section', start: 'top 75%' } }
    );
    
    gsap.fromTo('.closing-img-wrapper img',
      { scale: 1.05 },
      { scale: 1, ease: 'power3.out', duration: 1.2, scrollTrigger: { trigger: '.closing-section', start: 'top 75%' } }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <Header />
      <main>
        {/* Nav spacer */}
        <div style={{ height: 'var(--nav-height)', backgroundColor: 'var(--hammock-cream)' }} />

        {/* 1. About hero */}
        <section style={{ backgroundColor: 'var(--hammock-cream)', padding: 'var(--spacing-16) 0 var(--spacing-24) 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
            <span className="hero-anim" style={{ display: 'block', color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1.5rem' }}>
              ABOUT HAMMOCK
            </span>
            <h1 className="hero-anim text-display" style={{ color: 'var(--hammock-burgundy)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              A place to pause.<br />A place to stay.
            </h1>
            <p className="hero-anim text-body-lg" style={{ color: 'var(--hammock-burgundy)', opacity: 0.8, maxWidth: '540px', margin: '0 auto' }}>
              HAMMOCK Suites & Rooms creates spaces where comfort comes naturally and every stay feels unhurried.
            </p>
          </div>
        </section>

        {/* 2. Hospitality story */}
        <section className="split-section" style={{ backgroundColor: 'var(--hammock-cream)', paddingBottom: 'var(--spacing-24)' }}>
          <div className="container">
            <div className="split-layout">
              <div className="split-img-col">
                <div className="split-img-wrapper" style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/about-story.jpeg" alt="HAMMOCK hospitality interior" fill sizes="(max-width: 768px) 100vw, 55vw" style={{ objectFit: 'cover' }} />
                </div>
              </div>
              <div className="split-text-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="split-text-anim" style={{ display: 'block', color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1.5rem' }}>
                  OUR STORY
                </span>
                <h2 className="split-text-anim text-display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--hammock-burgundy)', marginBottom: '2rem', lineHeight: 1.1 }}>
                  Hospitality, at its most comfortable.
                </h2>
                <div style={{ maxWidth: '640px' }}>
                  <p className="split-text-anim text-body-lg" style={{ color: 'var(--hammock-burgundy)', opacity: 0.8, marginBottom: '1.5rem' }}>
                    HAMMOCK was created with a simple belief: a stay should offer more than a place to sleep. It should give you space to slow down, settle in and feel at ease.
                  </p>
                  <p className="split-text-anim text-body-lg" style={{ color: 'var(--hammock-burgundy)', opacity: 0.8 }}>
                    From thoughtfully designed rooms to spaces made for everyday comfort, HAMMOCK brings together the essentials of a relaxed and welcoming stay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The idea behind the name */}
        <section className="idea-section" style={{ backgroundColor: 'var(--hammock-burgundy)', padding: 'var(--spacing-24) 0', color: 'var(--hammock-cream)' }}>
          <div className="container">
            <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="idea-anim" style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500, marginBottom: '2rem', opacity: 0.8 }}>
                THE IDEA
              </span>
              <div className="h-mark-wrapper idea-anim" style={{ position: 'relative', width: '64px', height: '64px', marginBottom: '2.5rem', overflow: 'hidden' }}>
                <Image src="/h-mark-cream.svg" alt="" fill style={{ objectFit: 'contain' }} aria-hidden="true" />
              </div>
              <h2 className="idea-anim text-display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '2rem', lineHeight: 1.1 }}>
                The idea behind the name.
              </h2>
              <p className="idea-anim text-body-lg" style={{ opacity: 0.9, marginBottom: '2rem', maxWidth: '640px' }}>
                A hammock rests between movement and stillness, offering a moment to pause. That feeling of comfort, calm and ease is at the heart of HAMMOCK.
              </p>
              <p className="idea-anim" style={{ opacity: 0.7, fontSize: '0.9rem', maxWidth: '540px' }}>
                Our custom wordmark carries a subtle hammock curve through the H—a quiet expression of the comfort waiting within.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Brand values */}
        <section style={{ backgroundColor: 'var(--hammock-cream)', padding: 'var(--spacing-24) 0' }}>
          <div className="container">
            <div className="values-layout">
              {/* Value 01 */}
              <div className="value-item" style={{ flex: 1 }}>
                <div className="value-divider" style={{ height: '1px', backgroundColor: 'rgba(89, 10, 23, 0.2)', marginBottom: '1.5rem', width: '100%' }} />
                <div className="value-content">
                  <h3 style={{ color: 'var(--hammock-burgundy)', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                    01 — COMFORT
                  </h3>
                  <p style={{ color: 'var(--hammock-burgundy)', opacity: 0.8, lineHeight: 1.6, maxWidth: '400px' }}>
                    Spaces designed to feel natural, welcoming and easy to settle into.
                  </p>
                </div>
              </div>
              
              {/* Value 02 */}
              <div className="value-item" style={{ flex: 1 }}>
                <div className="value-divider" style={{ height: '1px', backgroundColor: 'rgba(89, 10, 23, 0.2)', marginBottom: '1.5rem', width: '100%' }} />
                <div className="value-content">
                  <h3 style={{ color: 'var(--hammock-burgundy)', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                    02 — CALM
                  </h3>
                  <p style={{ color: 'var(--hammock-burgundy)', opacity: 0.8, lineHeight: 1.6, maxWidth: '400px' }}>
                    A quieter environment where you can step away from the pace of everyday life.
                  </p>
                </div>
              </div>
              
              {/* Value 03 */}
              <div className="value-item" style={{ flex: 1 }}>
                <div className="value-divider" style={{ height: '1px', backgroundColor: 'rgba(89, 10, 23, 0.2)', marginBottom: '1.5rem', width: '100%' }} />
                <div className="value-content">
                  <h3 style={{ color: 'var(--hammock-burgundy)', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                    03 — CARE
                  </h3>
                  <p style={{ color: 'var(--hammock-burgundy)', opacity: 0.8, lineHeight: 1.6, maxWidth: '400px' }}>
                    Thoughtful hospitality focused on making every stay comfortable and effortless.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Rooms and stays */}
        <section className="split-section" style={{ backgroundColor: 'var(--hammock-cream)', paddingBottom: 'var(--spacing-24)' }}>
          <div className="container">
            <div className="split-layout reverse">
              <div className="split-img-col">
                <div className="split-img-wrapper" style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/about-rooms.jpeg" alt="HAMMOCK guest room interior" fill sizes="(max-width: 768px) 100vw, 55vw" style={{ objectFit: 'cover' }} />
                </div>
              </div>
              <div className="split-text-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="split-text-anim" style={{ display: 'block', color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1.5rem' }}>
                  ROOMS & SUITES
                </span>
                <h2 className="split-text-anim text-display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--hammock-burgundy)', marginBottom: '2rem', lineHeight: 1.1 }}>
                  Made for different kinds of stays.
                </h2>
                <div style={{ maxWidth: '640px' }}>
                  <p className="split-text-anim text-body-lg" style={{ color: 'var(--hammock-burgundy)', opacity: 0.8, marginBottom: '2.5rem' }}>
                    With more than 30 rooms and suites, including Deluxe and Premium accommodations, HAMMOCK offers comfortable spaces for short visits, extended stays, families and guests who simply want a little more room to breathe.
                  </p>
                  <Link href="/rooms" className="split-text-anim group" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'var(--hammock-burgundy)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}>
                    <span>Explore Rooms</span>
                    <ArrowRight size={16} style={{ transition: 'transform 0.3s ease' }} className="group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Amenities and closing statement */}
        <section className="closing-section" style={{ backgroundColor: 'var(--hammock-cream)', paddingBottom: 'var(--spacing-24)' }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="closing-anim" style={{ display: 'block', color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1.5rem' }}>
                THE HAMMOCK EXPERIENCE
              </span>
              <h2 className="closing-anim text-display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--hammock-burgundy)', marginBottom: '2rem', lineHeight: 1.1 }}>
                Everything you need to feel at ease.
              </h2>
              <p className="closing-anim text-body-lg" style={{ color: 'var(--hammock-burgundy)', opacity: 0.8, marginBottom: '2.5rem', maxWidth: '640px' }}>
                From restful rooms to spaces for movement and everyday comfort, everything at HAMMOCK is designed to make your stay feel effortless.
              </p>
              
              <div className="closing-anim" style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', color: 'var(--hammock-burgundy)', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2.5rem' }}>
                <span>Gym</span>
                <span style={{ opacity: 0.5 }}>•</span>
                <span>Comfortable Rooms</span>
              </div>
              
              <Link href="/contact" className="closing-anim group" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'var(--hammock-burgundy)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', marginBottom: '4rem' }}>
                <span>Contact Us</span>
                <ArrowRight size={16} style={{ transition: 'transform 0.3s ease' }} className="group-hover:translate-x-1" />
              </Link>
              
              <div className="closing-img-wrapper" style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '4rem' }}>
                <Image src="/images/about-closing.jpeg" alt="HAMMOCK stay experience" fill sizes="(max-width: 1024px) 100vw, 800px" style={{ objectFit: 'cover' }} />
              </div>
              
              <div className="closing-anim" style={{ position: 'relative', width: '48px', height: '48px', margin: '0 auto 2rem auto', opacity: 0.9 }}>
                <Image src="/h-mark-exact.png" alt="" fill style={{ objectFit: 'contain' }} aria-hidden="true" />
              </div>
              
              <h2 className="closing-anim text-display" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--hammock-burgundy)', marginBottom: '2.5rem', lineHeight: 1.2 }}>
                Come for the stay.<br />
                Leave with the feeling of having slowed down.
              </h2>
              
              <Link href="/rooms" className="closing-anim" style={{ padding: '1rem 2rem', borderRadius: '999px', backgroundColor: 'var(--hammock-burgundy)', color: 'var(--hammock-cream)', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', display: 'inline-block' }}>
                Explore Your Stay
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .split-layout {
          display: flex;
          align-items: center;
          gap: 6vw;
        }
        .split-img-col {
          flex: 0 0 55%;
        }
        .split-text-col {
          flex: 1;
        }
        .values-layout {
          display: flex;
          gap: 4rem;
        }
        
        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(4px);
        }
        
        @media (max-width: 1023px) {
          .split-layout {
            gap: 3rem;
          }
          .split-img-col {
            flex: 0 0 50%;
          }
          .values-layout {
            gap: 2rem;
          }
        }
        
        @media (max-width: 767px) {
          .split-layout {
            flex-direction: column !important;
            gap: 2.5rem;
          }
          .split-img-col {
            width: 100%;
          }
          .values-layout {
            flex-direction: column;
            gap: 3rem;
          }
        }
        
        @media (min-width: 768px) {
          .split-layout.reverse {
            flex-direction: row-reverse;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .hero-anim, .split-text-anim, .idea-anim, .value-content, .closing-anim {
            opacity: 1 !important;
            transform: none !important;
          }
          .split-img-wrapper, .h-mark-wrapper, .value-divider, .closing-img-wrapper {
            clip-path: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          img {
            transform: none !important;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
}
