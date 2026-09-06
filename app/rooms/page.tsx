'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { roomsData } from './data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function RoomsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = gsap.utils.toArray('.room-card') as HTMLElement[];
    cards.forEach((card) => {
      const imgWrapper = card.querySelector('.room-img-wrapper');
      const content = card.querySelector('.room-content');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(imgWrapper, 
        { clipPath: 'inset(10% 0% 10% 0% round var(--radius-xl))', scale: 0.98 },
        { clipPath: 'inset(0% 0% 0% 0% round var(--radius-xl))', scale: 1, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo(content,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        "-=0.8"
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <Header />
      <main>
        {/* Intro Section */}
        <section style={{ paddingTop: 'calc(var(--nav-height) + var(--spacing-24))', paddingBottom: 'var(--spacing-24)', backgroundColor: 'var(--hammock-cream)', textAlign: 'center' }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>
                ROOMS & SUITES
              </span>
              <h1 className="text-display" style={{ marginTop: '1.5rem', marginBottom: '1.5rem', color: 'var(--hammock-burgundy)' }}>
                A room for every way you stay.
              </h1>
              <p className="text-body-lg" style={{ opacity: 0.8, color: 'var(--hammock-burgundy)', maxWidth: '600px', margin: '0 auto' }}>
                Thoughtfully designed spaces shaped around comfort, calm and a more considered stay.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section style={{ paddingBottom: 'var(--spacing-32)', backgroundColor: 'var(--hammock-cream)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8rem' }}>
              {roomsData.map((room, index) => {
                // Alternating layout: even items image left, odd items image right (desktop)
                const isEven = index % 2 === 0;
                
                return (
                  <Link 
                    href={`/rooms/${room.id}`} 
                    key={room.id}
                    className="room-card group"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                    scroll={false}
                  >
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '4rem', 
                      alignItems: 'center',
                      flexDirection: isEven ? 'row' : 'row-reverse'
                    }}>
                      
                      {/* Image Side */}
                      <div style={{ flex: '1 1 500px' }}>
                        <div 
                          className="room-img-wrapper"
                          style={{ 
                            position: 'relative', 
                            // Vary aspect ratios slightly for editorial feel
                            height: index % 3 === 0 ? '70vh' : '55vh', 
                            minHeight: '400px', 
                            borderRadius: 'var(--radius-xl)', 
                            overflow: 'hidden' 
                          }}
                        >
                          <motion.div 
                            layoutId={`room-image-${room.id}`}
                            style={{ position: 'absolute', inset: 0, transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                            className="group-hover:scale-[1.025]"
                          >
                            <Image 
                              src={room.image} 
                              alt={`Interior view of ${room.name}`}
                              fill 
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              priority={index < 2} // Preload first two
                              style={{ objectFit: 'cover' }} 
                            />
                          </motion.div>
                          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.03)', pointerEvents: 'none' }} />
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="room-content" style={{ flex: '1 1 300px' }}>
                        <div style={{ maxWidth: '400px', margin: isEven ? '0 auto 0 0' : '0 0 0 auto' }}>
                          <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>
                            {room.name}
                          </span>
                          <h2 className="text-h2" style={{ marginTop: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--hammock-display)' }}>
                            {room.shortDescription}
                          </h2>
                          <div 
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '0.5rem', 
                              borderBottom: '1px solid var(--hammock-burgundy)', 
                              paddingBottom: '0.25rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              fontSize: '0.875rem',
                              fontWeight: 500
                            }}
                          >
                            View room <span aria-hidden="true" style={{ transition: 'transform 0.3s ease' }} className="group-hover:translate-x-1">&rarr;</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
