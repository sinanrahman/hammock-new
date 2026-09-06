import Link from 'next/link';
import Image from 'next/image';

export const SITE_CONFIG = {
  socials: [], // Empty as none were provided
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--hammock-burgundy)', color: 'var(--hammock-cream)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Image src="/brand/h-mark-cream.svg" alt="Hammock" width={48} height={48} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontFamily: 'var(--font-inter)' }}>Stay</h4>
            <Link href="/rooms" style={{ opacity: 0.8, transition: 'opacity 0.3s' }}>Rooms & Suites</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontFamily: 'var(--font-inter)' }}>About</h4>
            <Link href="/about" style={{ opacity: 0.8, transition: 'opacity 0.3s' }}>Our Story</Link>
            <Link href="/faq" style={{ opacity: 0.8, transition: 'opacity 0.3s' }}>FAQ</Link>
            <Link href="/contact" style={{ opacity: 0.8, transition: 'opacity 0.3s' }}>Contact</Link>
          </div>
          
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '1rem',
          borderTop: '1px solid rgba(245, 235, 213, 0.2)', 
          paddingTop: '2rem',
          fontSize: '0.875rem',
          opacity: 0.7
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' }}>
            <p>&copy; {currentYear} Hammock Suites and Rooms. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
