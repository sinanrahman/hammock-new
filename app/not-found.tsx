import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <div style={{ height: 'var(--nav-height)', backgroundColor: 'var(--hammock-cream)' }} />
        <section style={{ 
          minHeight: '60vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'var(--hammock-cream)',
          padding: 'var(--spacing-16) 0'
        }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 className="text-display" style={{ marginBottom: '1.5rem', color: 'var(--hammock-burgundy)' }}>404</h1>
            <h2 className="text-h3" style={{ marginBottom: '2rem', color: 'var(--hammock-burgundy)' }}>Page Not Found</h2>
            <p className="text-body-lg" style={{ maxWidth: '500px', margin: '0 auto 3rem', opacity: 0.8 }}>
              The page you are looking for does not exist or has been moved. Let&apos;s guide you back to our refined comfort.
            </p>
            <Link href="/" className="btn btn-primary">
              Return Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
