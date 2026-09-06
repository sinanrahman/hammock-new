'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    const hasVisited = sessionStorage.getItem('hammock_visited');
    if (!hasVisited) {
      setTimeout(() => setIsFirstVisit(true), 0);
      sessionStorage.setItem('hammock_visited', 'true');
      
      const timer = setTimeout(() => {
        setShow(false);
      }, 1500); // ~1.5s duration
      
      // Prevent scrolling while preloader is active
      document.body.style.overflow = 'hidden';
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      setTimeout(() => setShow(false), 0);
    }
  }, []);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = '';
    }
  }, [show]);

  if (mounted && !isFirstVisit) return null;

  return (
    <motion.div
      aria-hidden="true"
      initial={{ clipPath: 'inset(0 0 0 0)' }}
      animate={{ clipPath: show ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (!show) {
          document.body.style.overflow = '';
        }
      }}
      style={{ 
        backgroundColor: 'var(--hammock-cream)',
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: show || isFirstVisit ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: show ? 'auto' : 'none',
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
  );
}
