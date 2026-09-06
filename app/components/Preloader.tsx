'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hammock_visited');
    if (!hasVisited) {
      setTimeout(() => setIsFirstVisit(true), 0);
      sessionStorage.setItem('hammock_visited', 'true');
      
      const timer = setTimeout(() => {
        setShow(false);
      }, 1800);
      
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, []);

  if (!show && !isFirstVisit) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: show ? 0 : '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream"
      style={{ 
        backgroundColor: 'var(--hammock-cream)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 1.1 }}
        transition={{ 
          duration: 1.2, 
          ease: "easeOut",
        }}
      >
        <Image 
          src="/brand/h-mark-exact.png" 
          alt="Hammock" 
          width={120} 
          height={120}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
