'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { roomsData } from './data';
import { createWhatsAppUrl, getRoomBookingMessage } from '../../lib/whatsapp';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function RoomsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const router = useRouter();

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = gsap.utils.toArray('.room-card-3d') as HTMLElement[];
    if (cards.length === 0 || !galleryRef.current) return;

    // Mobile fallback check
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      if (prefersReducedMotion) return;
      
      const maxIndex = cards.length - 1;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      // Initialize CSS for 3D
      gsap.set('.gallery-stage', { perspective: 1400, transformStyle: 'preserve-3d' });
      cards.forEach(card => gsap.set(card, { transformOrigin: 'center center' }));

      // Create ScrollTrigger
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: galleryRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 4}`, // 400vh for comfortable scrolling
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndexProgress = progress * maxIndex;
          
          // Update active index state for UI (progress indicator)
          const currentActive = Math.round(activeIndexProgress);
          setActiveRoomIndex((prev) => prev !== currentActive ? currentActive : prev);
          
          // Apply 3D transforms
          cards.forEach((card, index) => {
            const offset = index - activeIndexProgress;
            const absOffset = Math.abs(offset);
            const sign = Math.sign(offset);
            
            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            
            if (absOffset === 0) {
              translateX = 0;
              translateZ = isTablet ? 80 : 140;
              rotateY = 0;
              scale = 1;
              opacity = 1;
            } else {
              // Interpolate
              const firstAdjTranslateX = isTablet ? 45 : 55;
              const firstAdjTranslateZ = isTablet ? -80 : -160;
              const firstAdjRotateY = isTablet ? -12 : -18;
              
              if (absOffset <= 1) {
                translateX = sign * (absOffset * firstAdjTranslateX);
                translateZ = (1 - absOffset) * (isTablet ? 80 : 140) + absOffset * firstAdjTranslateZ;
                rotateY = sign * (absOffset * firstAdjRotateY);
                scale = 1 - (absOffset * 0.18); // 1 to 0.82
                opacity = 1 - (absOffset * 0.25); // 1 to 0.75
              } else {
                const extraOffset = absOffset - 1;
                translateX = sign * (firstAdjTranslateX + (extraOffset * (isTablet ? 25 : 35)));
                translateZ = firstAdjTranslateZ - (extraOffset * 100);
                rotateY = sign * (firstAdjRotateY - (extraOffset * 4)); 
                scale = 0.82 - (extraOffset * 0.15);
                opacity = 0.75 - (extraOffset * 0.3);
              }
            }
            
            scale = Math.max(0.4, scale);
            opacity = Math.max(0, opacity);
            const zIndex = 100 - Math.floor(absOffset * 10);
            
            gsap.set(card, {
              x: `${translateX}vw`,
              z: translateZ,
              rotationY: rotateY,
              scale: scale,
              opacity: opacity,
              zIndex: zIndex,
              pointerEvents: opacity < 0.2 ? 'none' : 'auto'
            });
            
            // Inner content opacity
            const innerContent = card.querySelector('.room-overlay-content');
            if (innerContent) {
              gsap.set(innerContent, {
                opacity: absOffset < 0.5 ? 1 : 0.4
              });
            }
          });
        }
      });
      
      // Force initial render
      scrollTriggerRef.current.scroll(0);

      return () => {
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }
      };
    });

  }, { scope: containerRef });

  useEffect(() => {
    // Mobile Intersection Observer for active room index
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.innerWidth >= 768 && !prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) setActiveRoomIndex(index);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.6 }
    );

    const cards = document.querySelectorAll('.room-card-3d');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    // If desktop and not the active card, scroll to it instead of opening
    if (window.innerWidth >= 768 && Math.abs(activeRoomIndex - index) > 0.1) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return; // allow default link behavior
      
      e.preventDefault(); // Stop navigation
      const st = scrollTriggerRef.current;
      if (st) {
        const start = st.start;
        const end = st.end;
        const maxIndex = roomsData.length - 1;
        const targetScroll = start + (end - start) * (index / maxIndex);
        
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleBookClick = (e: React.MouseEvent, roomName: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(createWhatsAppUrl(getRoomBookingMessage(roomName)), '_blank', 'noopener,noreferrer');
  };

  return (
    <div ref={containerRef}>
      <Header />
      <main>
        {/* Intro Section */}
        <section style={{ paddingTop: 'calc(var(--nav-height) + var(--spacing-24))', paddingBottom: 'var(--spacing-16)', backgroundColor: 'var(--hammock-cream)', textAlign: 'center' }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <span style={{ color: 'var(--hammock-burgundy)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>
                ROOMS & SUITES
              </span>
              <h1 className="text-display" style={{ marginTop: '1.5rem', marginBottom: '1.5rem', color: 'var(--hammock-burgundy)' }}>
                Find your space to unwind.
              </h1>
              <p className="text-body-lg" style={{ opacity: 0.8, color: 'var(--hammock-burgundy)', maxWidth: '600px', margin: '0 auto' }}>
                Explore thoughtfully designed rooms created for comfort, calm and a more considered stay.
              </p>
            </div>
          </div>
        </section>

        {/* 3D Gallery Stage */}
        <section 
          ref={galleryRef}
          className="gallery-stage"
          style={{ 
            height: '100vh', 
            backgroundColor: 'var(--hammock-cream)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Subtle grounding line */}
          <div style={{ position: 'absolute', bottom: '15%', left: '10%', right: '10%', height: '1px', background: 'radial-gradient(circle, rgba(89,10,23,0.15) 0%, rgba(89,10,23,0) 100%)', pointerEvents: 'none' }} />

          <div 
            className="mobile-gallery-wrapper"
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {roomsData.map((room, index) => {
              const isActive = activeRoomIndex === index;
              
              return (
                <div 
                  key={room.id}
                  data-index={index}
                  className="room-card-3d group"
                  style={{ 
                    position: 'absolute',
                    width: '60vw',
                    maxWidth: '900px',
                    height: '65vh',
                    maxHeight: '600px',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity'
                  }}
                >
                  <Link 
                    href={`/rooms/${room.id}`} 
                    onClick={(e) => handleCardClick(e, index)}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', height: '100%', outline: 'none' }}
                    scroll={false}
                    aria-label={`View ${room.name}`}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(89, 10, 23, 0.05)' }}>
                      
                      <motion.div 
                        layoutId={`room-image-${room.id}`}
                        style={{ position: 'absolute', inset: 0, transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                        className="inner-img-wrapper"
                      >
                        <Image 
                          src={room.image} 
                          alt={`Interior view of ${room.name}`}
                          fill 
                          sizes="(max-width: 768px) 90vw, 60vw"
                          priority={index === 0} 
                          style={{ objectFit: 'cover' }} 
                        />
                      </motion.div>
                      
                      {/* Gradient Overlay for Text Readability */}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(89, 10, 23, 0.6) 0%, rgba(89, 10, 23, 0) 50%)', pointerEvents: 'none' }} />

                      {/* Card Content Overlay */}
                      <div 
                        className="room-overlay-content"
                        style={{ 
                          position: 'absolute', 
                          bottom: 0, left: 0, right: 0, 
                          padding: '2rem', 
                          color: 'var(--hammock-cream)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          transition: 'opacity 0.3s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                          <div style={{ flex: '1 1 300px' }}>
                            <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, opacity: 0.9 }}>
                              {room.name}
                            </span>
                            <h2 
                              className="room-active-title"
                              style={{ 
                                fontSize: '1.5rem', 
                                fontFamily: 'var(--hammock-display)', 
                                marginTop: '0.5rem', 
                                opacity: isActive ? 1 : 0, 
                                transition: 'opacity 0.4s ease, transform 0.4s ease', 
                                transform: isActive ? 'translateY(0)' : 'translateY(10px)' 
                              }}
                            >
                              A calm, thoughtfully designed space created for a comfortable stay.
                            </h2>
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', flexShrink: 0 }}>
                            <span 
                              className="view-room-btn"
                              style={{ 
                                opacity: 0,
                                transform: 'translateY(10px)',
                                transition: 'opacity 0.4s ease, transform 0.4s ease',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'var(--hammock-cream)',
                                fontWeight: 500,
                                position: 'absolute',
                                right: '2rem',
                                bottom: isActive ? '5.5rem' : '2rem'
                              }}
                            >
                              View room
                            </span>
                            <button
                              onClick={(e) => handleBookClick(e, room.name)}
                              className="book-room-btn"
                              style={{ 
                                opacity: isActive ? 1 : 0, 
                                transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                                transition: 'opacity 0.4s ease, transform 0.4s ease',
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                backgroundColor: 'var(--hammock-cream)',
                                color: 'var(--hammock-burgundy)',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '999px',
                                fontWeight: 500,
                                border: 'none',
                                cursor: 'pointer',
                                pointerEvents: isActive ? 'auto' : 'none'
                              }}
                            >
                              Book this room
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Progress Indicator */}
          <div style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', pointerEvents: 'none' }}>
            <span style={{ color: 'var(--hammock-burgundy)', fontSize: '0.875rem', fontWeight: 500 }}>
              {String(activeRoomIndex + 1).padStart(2, '0')}
            </span>
            <div style={{ width: '60px', height: '1px', backgroundColor: 'rgba(89,10,23,0.2)', position: 'relative' }}>
              <div 
                style={{ 
                  position: 'absolute', 
                  left: 0, top: 0, bottom: 0, 
                  width: `${((activeRoomIndex + 1) / roomsData.length) * 100}%`,
                  backgroundColor: 'var(--hammock-burgundy)',
                  transition: 'width 0.3s ease'
                }} 
              />
            </div>
            <span style={{ color: 'rgba(89,10,23,0.5)', fontSize: '0.875rem', fontWeight: 500 }}>
              {String(roomsData.length).padStart(2, '0')}
            </span>
          </div>

          {/* Hover CSS & Mobile Fallback */}
          <style jsx>{`
            @media (min-width: 768px) {
              .group:hover .inner-img-wrapper {
                transform: scale(1.03) !important;
              }
              .group:hover .view-room-btn {
                opacity: 1 !important;
                transform: translateY(0) !important;
              }
            }
            @media (max-width: 767px) {
              .mobile-gallery-wrapper {
                position: relative !important;
                display: flex !important;
                flex-direction: row !important;
                align-items: center !important;
                justify-content: flex-start !important;
                overflow-x: auto !important;
                overflow-y: hidden !important;
                scroll-snap-type: x mandatory !important;
                padding: 0 5vw !important;
                gap: 1.5rem !important;
                -webkit-overflow-scrolling: touch;
              }
              .mobile-gallery-wrapper::-webkit-scrollbar {
                display: none;
              }
              .room-card-3d {
                position: relative !important;
                flex: 0 0 85vw !important;
                width: 85vw !important;
                height: 60vh !important;
                transform: none !important;
                opacity: 1 !important;
                z-index: 1 !important;
                scroll-snap-align: center !important;
              }
              .room-overlay-content {
                opacity: 1 !important;
              }
              .room-active-title {
                opacity: 1 !important;
                transform: none !important;
              }
              .book-room-btn {
                opacity: 1 !important;
                transform: none !important;
                pointer-events: auto !important;
              }
              .view-room-btn {
                display: none !important;
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .gallery-stage {
                height: auto !important;
                padding: 4rem 0 !important;
                display: block !important;
              }
              .mobile-gallery-wrapper {
                position: relative !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                gap: 2rem !important;
              }
              .room-card-3d {
                position: relative !important;
                width: 90vw !important;
                height: 60vh !important;
                transform: none !important;
                opacity: 1 !important;
              }
              .room-active-title, .book-room-btn {
                opacity: 1 !important;
                transform: none !important;
                pointer-events: auto !important;
              }
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </div>
  );
}
