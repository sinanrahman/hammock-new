'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const navLinks = [
    { label: 'Rooms & Suites', href: '/rooms' },
    { label: 'Amenities', href: '/amenities' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ];

  const headerStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: 'all 0.3s ease',
    padding: '1.5rem 0',
    backgroundColor: scrolled ? 'var(--hammock-cream)' : 'transparent',
    color: scrolled || !isHome ? 'var(--hammock-burgundy)' : 'var(--hammock-cream)',
    boxShadow: scrolled ? '0 1px 10px rgba(0,0,0,0.05)' : 'none',
  };

  return (
    <>
      <header style={headerStyle}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Hammock Home">
              <Image 
                src={scrolled || !isHome ? "/brand/hammock-wordmark.png" : "/brand/hammock-wordmark.png"} 
                alt="Hammock" 
                width={120} 
                height={28} 
                style={{ 
                  objectFit: 'contain',
                  filter: scrolled || !isHome ? 'none' : 'brightness(0) invert(1) brightness(0.95) sepia(1) hue-rotate(345deg) saturate(2) contrast(0.8)' // Attempting to make it cream-like if needed, but original wordmark is burgundy. Actually, let's use CSS filter for cream if not scrolled on home. Wait, the instructions didn't provide a cream wordmark. Daylight navigation on home uses light text. We can use filter or just stick to the image.
                }}
              />
            </Link>
          </div>

          <nav style={{ display: 'none' }} className="desktop-nav">
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{ flex: 1, display: 'none', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }} className="desktop-nav">
            <Link href="/contact" style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Contact
            </Link>
            <Link href="/rooms" className={`btn ${scrolled || !isHome ? 'btn-primary' : ''}`} style={{
              backgroundColor: scrolled || !isHome ? 'var(--hammock-burgundy)' : 'var(--hammock-cream)',
              color: scrolled || !isHome ? 'var(--hammock-cream)' : 'var(--hammock-burgundy)',
            }}>
              Book a Stay
            </Link>
          </div>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            style={{ color: 'inherit' }}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'var(--hammock-burgundy)',
              color: 'var(--hammock-cream)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="container" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Image src="/brand/h-mark-exact.png" alt="Hammock" width={40} height={40} style={{ filter: 'brightness(0) invert(1)' }} />
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" style={{ color: 'inherit' }}>
                <X size={32} />
              </button>
            </div>
            
            <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2rem' }}>
              <nav>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {navLinks.map((link) => (
                    <motion.li 
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Link href={link.href} style={{ fontSize: '2rem', fontFamily: 'var(--font-cormorant)' }} onClick={() => setMobileMenuOpen(false)}>
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link href="/contact" style={{ fontSize: '2rem', fontFamily: 'var(--font-cormorant)' }} onClick={() => setMobileMenuOpen(false)}>
                      Contact
                    </Link>
                  </motion.li>
                </ul>
              </nav>
              
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5 }}
                style={{ marginTop: '4rem' }}
              >
                <Link href="/rooms" className="btn btn-primary" style={{ backgroundColor: 'var(--hammock-cream)', color: 'var(--hammock-burgundy)', width: '100%' }} onClick={() => setMobileMenuOpen(false)}>
                  Book a Stay
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
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
