'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePreloader } from './PreloaderContext';

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setPreloaderFinished } = usePreloader();

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    const hasVisited = sessionStorage.getItem('hammock_visited');
    
    if (!hasVisited) {
      setTimeout(() => setIsFirstVisit(true), 0);
      sessionStorage.setItem('hammock_visited', 'true');
      
      const startTime = Date.now();
      const minDuration = 1000;
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
          setShow(false);
        }, remaining);
      });
      
      // Prevent scrolling while preloader is active
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = '';
      };
    } else {
      setTimeout(() => {
        setShow(false);
        setPreloaderFinished(true);
      }, 0);
    }
  }, [setPreloaderFinished]);

  useEffect(() => {
    if (!show && !isFirstVisit) {
      document.body.style.overflow = '';
    }
  }, [show, isFirstVisit]);

  if (mounted && !isFirstVisit) return null;

  return (
    <AnimatePresence onExitComplete={() => {
      document.body.style.overflow = '';
      setPreloaderFinished(true);
    }}>
      {show && (
        <motion.div
          aria-hidden="true"
          exit={{ clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ 
            backgroundColor: 'var(--hammock-cream)',
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
            clipPath: 'inset(0 0 0 0)'
          }}
        >
          <motion.div
            initial={{ opacity: 0.94, scale: 0.94 }}
            animate={{ 
              opacity: 1, 
              scale: 1 
            }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
            }}
            className="preloader-logo"
          >
            <Image 
              src="/h-mark-exact.png" 
              alt="Hammock" 
              width={120} 
              height={120}
              priority
              style={{ width: '100%', height: 'auto', maxWidth: '120px' }}
            />
          </motion.div>
          <style jsx>{`
            .preloader-logo {
              width: 88px;
            }
            @media (min-width: 768px) {
              .preloader-logo {
                width: 120px;
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .preloader-logo {
                transition: none !important;
                animation: none !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
