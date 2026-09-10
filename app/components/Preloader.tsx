'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { usePreloader } from './PreloaderContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setPreloaderFinished } = usePreloader();
  const container = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setMounted(true);
    const hasVisited = sessionStorage.getItem('hammock_visited');
    
    if (!hasVisited) {
      setIsFirstVisit(true);
      sessionStorage.setItem('hammock_visited', 'true');
      
      // Prevent scrolling while preloader is active
      document.body.style.overflow = 'hidden';
      
      const startTime = Date.now();
      const minDuration = 400; // Hold briefly (200ms logo fade in + 200ms hold)
      const maxDuration = 4000;

      const loadPromise = Promise.all([
        new Promise((resolve) => {
          const img = new window.Image();
          img.src = '/images/01-hammock-facade-hero.jpg';
          img.onload = resolve;
          img.onerror = resolve;
        }),
        document.fonts ? document.fonts.ready : Promise.resolve(),
      ]);

      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, maxDuration));

      Promise.race([loadPromise, timeoutPromise]).then(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDuration - elapsed);
        
        setTimeout(() => {
          // Trigger the exit animation
          if (tlRef.current) {
            tlRef.current.play();
          } else {
            // Fallback if GSAP is not ready
            setShow(false);
            setPreloaderFinished(true);
            document.body.style.overflow = '';
          }
        }, remaining);
      });
      
    } else {
      setShow(false);
      setPreloaderFinished(true);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [setPreloaderFinished]);

  useGSAP(() => {
    if (!isFirstVisit) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        // Start the hero animations underneath when panels begin to retract
        setPreloaderFinished(true);
      },
      onComplete: () => {
        setShow(false);
        document.body.style.overflow = '';
        ScrollTrigger.refresh(); // Refresh scroll measurements once overlay is removed
      }
    });

    tlRef.current = tl;

    // Logo entrance
    gsap.fromTo('.preloader-logo', 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.2, ease: 'none' }
    );

    if (prefersReducedMotion) {
      tl.to('.preloader-overlay', { opacity: 0, duration: 0.5, ease: 'power2.inOut' });
    } else {
      // 1. Fade out logo
      tl.to('.preloader-logo', { opacity: 0, duration: 0.18, ease: 'power2.inOut' });
      
      // 2. Stagger panels up
      const visiblePanels = gsap.utils.toArray('.preloader-panel').filter(
        (el) => window.getComputedStyle(el as Element).display !== 'none'
      );
      
      tl.to(visiblePanels, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.085
      }, "-=0.05"); // Start slightly before logo finishes fading
    }
  }, { scope: container, dependencies: [isFirstVisit] });

  // Safety cleanup for overflow
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (mounted && !isFirstVisit) return null;

  if (!show) return null;

  return (
    <div 
      ref={container}
      className="preloader-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'auto',
      }}
    >
      {/* Background panels */}
      <div className="panels-container">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`preloader-panel panel-${i}`} />
        ))}
      </div>

      {/* Foreground logo container */}
      <div className="logo-container">
        <div className="preloader-logo" style={{ opacity: 0 }}>
          <Image 
            src="/h-mark-cream.svg" 
            alt="Hammock" 
            width={64} 
            height={64}
            priority
            className="h-mark-img"
          />
        </div>
      </div>

      <style jsx>{`
        .panels-container {
          position: absolute;
          inset: 0;
          display: flex;
        }
        .preloader-panel {
          flex: 1;
          background-color: var(--hammock-burgundy);
          height: 100%;
          will-change: transform;
          margin-right: -1px; /* Tiny overlap to prevent hairline gaps */
        }
        .preloader-panel:last-child {
          margin-right: 0;
        }
        .logo-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .h-mark-img {
          width: 48px;
          height: auto;
        }
        @media (min-width: 768px) {
          .h-mark-img {
            width: 64px;
          }
        }
        @media (max-width: 767px) {
          /* Render only 5 panels on mobile */
          .panel-5, .panel-6, .panel-7 {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
