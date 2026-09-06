'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { usePreloader } from './PreloaderContext';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { preloaderFinished } = usePreloader();

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastYRef.current;
    if (y > 100 && diff > 10) {
      setHidden(true);
    } else if (diff < -10 || y <= 50) {
      setHidden(false);
    }
    lastYRef.current = y;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      document.addEventListener('keydown', handleEscape);
      const currentButton = buttonRef.current;
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
        currentButton?.focus();
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Rooms & Suites', href: '/rooms' },
    { label: 'Amenities', href: '/amenities' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ];

  const mobileNavLinks = [
    { label: 'Home', href: '/' },
    ...navLinks,
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: !preloaderFinished || hidden ? -100 : 0, opacity: preloaderFinished ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '1.5rem 0',
          backgroundColor: scrollY.get() > 50 ? 'rgba(245, 235, 213, 0.95)' : 'transparent',
          backdropFilter: scrollY.get() > 50 ? 'blur(10px)' : 'none',
          color: 'var(--hammock-burgundy)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <Link href="/" aria-label="Hammock Home" style={{ display: 'flex', alignItems: 'center' }}>
              <Image 
                src="/logo.png" 
                alt="Hammock" 
                width={140} 
                height={24} 
                style={{ 
                  objectFit: 'contain',
                  height: 'auto'
                }}
                priority
              />
            </Link>
          </div>

          <nav className="desktop-nav" style={{ display: 'none' }}>
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="desktop-nav" style={{ flex: 1, display: 'none', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Link href="/contact" className="btn btn-primary cta-btn">
              Book a Stay
            </Link>
          </div>

          <button 
            ref={buttonRef}
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            style={{ 
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '24px',
              height: '14px',
              position: 'relative',
              zIndex: 1001
            }}
          >
            <span style={{ width: '100%', height: '2px', backgroundColor: 'currentColor', transition: '0.3s' }}></span>
            <span style={{ width: '100%', height: '2px', backgroundColor: 'currentColor', transition: '0.3s' }}></span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'var(--hammock-cream)',
              color: 'var(--hammock-burgundy)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto'
            }}
          >
            <div className="container" style={{ padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '72px' }}>
              <div style={{ flex: 1 }}>
                <Image 
                  src="/logo.png" 
                  alt="Hammock" 
                  width={140} 
                  height={24} 
                  style={{ objectFit: 'contain', height: 'auto' }} 
                />
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                aria-label="Close menu" 
                style={{ 
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  position: 'relative'
                }}
              >
                <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: 'currentColor', transform: 'rotate(45deg)' }}></span>
                <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: 'currentColor', transform: 'rotate(-45deg)' }}></span>
              </button>
            </div>
            
            <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '4rem' }}>
              <nav>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {mobileNavLinks.map((link, i) => (
                    <motion.li 
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (i * 0.05), duration: 0.5 }}
                    >
                      <Link href={link.href} style={{ fontSize: '2.5rem', fontFamily: 'var(--hammock-display)', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.6 }}
                style={{ marginTop: '3rem' }}
              >
                <Link href="/contact" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem' }} onClick={() => setMobileMenuOpen(false)}>
                  Book a Stay
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: opacity 0.2s ease;
        }
        .nav-link:hover {
          opacity: 0.7;
        }
        .cta-btn {
          border: 1px solid var(--hammock-burgundy);
          padding: 0.6rem 1.5rem;
          font-size: 0.875rem;
        }
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
