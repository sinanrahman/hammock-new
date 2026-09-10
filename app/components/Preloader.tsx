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
  const assetsLoadedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    
    const urlParams = new URLSearchParams(window.location.search);
    const forceReplay = process.env.NODE_ENV === 'development' && urlParams.get('replay_intro') === 'true';
    const hasVisited = sessionStorage.getItem('hammock_visited');
    
    if (!hasVisited || forceReplay) {
      setIsFirstVisit(true);
      sessionStorage.setItem('hammock_visited', 'true');
      
      // Calculate scrollbar width to prevent horizontal layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
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
        assetsLoadedRef.current = true;
        
        // If the timeline hit the minimum logo display time and paused, resume it
        if (tlRef.current && tlRef.current.paused()) {
          tlRef.current.play();
        }
      });
      
    } else {
      setShow(false);
      setPreloaderFinished(true);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [setPreloaderFinished]);

  useGSAP(() => {
    if (!isFirstVisit) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tl = gsap.timeline({
      onComplete: () => {
        setShow(false);
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        ScrollTrigger.refresh(); // Refresh scroll measurements once overlay is removed
      }
    });

    tlRef.current = tl;

    if (prefersReducedMotion) {
      tl.add(() => {
        if (!assetsLoadedRef.current) tl.pause();
      });
      tl.add(() => setPreloaderFinished(true), 0);
      tl.to('.preloader-overlay', { opacity: 0, duration: 0.5, ease: 'power2.inOut' });
    } else {
      // 1. Show cream H mark with 250ms fade
      tl.fromTo('.preloader-logo', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.25, ease: 'none' }
      );
      
      // 2. Keep clearly visible for 650ms after entrance
      tl.to({}, { duration: 0.65 });
      
      // 3. Asset readiness check before proceeding
      tl.add(() => {
        if (!assetsLoadedRef.current) {
          tl.pause();
        }
      });
      
      // 4. Fade logo out over 250ms
      tl.to('.preloader-logo', { opacity: 0, duration: 0.25, ease: 'power2.inOut' });
      
      // Trigger hero animation underneath slightly before panels retract
      tl.add(() => setPreloaderFinished(true), "-=0.1");
      
      // Right before panels move, clear the overlay's safety background color
      tl.set('.preloader-overlay', { backgroundColor: 'transparent' }, ">");

      // 5. Stagger panels up
      const isMobile = window.innerWidth < 768;
      const allPanels = gsap.utils.toArray('.preloader-panel');
      const visiblePanels = isMobile ? allPanels.slice(0, 5) : allPanels;
      
      tl.to(visiblePanels, {
        yPercent: -101, // Over-extend slightly to ensure no 1px subpixel bleeding at the top edge
        duration: 0.95,
        ease: 'power2.inOut',
        stagger: 0.1
      }, "<"); // "<" means start immediately at the same time as the transparent set
    }
  }, { scope: container, dependencies: [isFirstVisit] });

  // Safety cleanup
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
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
        // Solid background initially to prevent any layout flashes before panels are ready
        backgroundColor: 'var(--hammock-burgundy)'
      }}
    >
      {/* Background panels */}
      <div className="panels-container">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i} 
            className={`preloader-panel panel-${i} bg-burgundy`} 
            style={{ backgroundColor: 'var(--hammock-burgundy)' }}
          />
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
