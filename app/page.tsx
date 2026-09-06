import Image from 'next/image';
import Link from 'next/link';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section style={{ 
          position: 'relative', 
          minHeight: '100svh', 
          width: '100%', 
          display: 'flex',
          alignItems: 'center',
          paddingTop: 'var(--nav-height)',
          backgroundColor: 'var(--hammock-cream)',
          paddingBottom: 'var(--spacing-12)'
        }}>
          <div className="container" style={{ height: '100%' }}>
            <div className="hero-grid">
              
              {/* Text Column */}
              <div className="hero-text-col">
                <div style={{ maxWidth: '600px' }}>
                  <div className="fade-up" style={{ animationDelay: '1.4s' }}>
                    <span style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      letterSpacing: '0.1em', 
                      textTransform: 'uppercase', 
                      marginBottom: '1.5rem', 
                      fontWeight: 600,
                      color: 'var(--hammock-rose)'
                    }}>
                      HAMMOCK SUITES AND ROOMS
                    </span>
                  </div>
                  <div className="fade-up" style={{ animationDelay: '1.5s' }}>
                    <h1 className="hero-headline" style={{ 
                      fontFamily: 'var(--hammock-display)',
                      color: 'var(--hammock-burgundy)',
                      marginBottom: '1.5rem',
                      lineHeight: 1
                    }}>
                      Stay<br/>beautifully.
                    </h1>
                  </div>
                  <div className="fade-up" style={{ animationDelay: '1.6s' }}>
                    <p className="text-body-lg" style={{ 
                      color: 'var(--hammock-burgundy)',
                      marginBottom: '2.5rem', 
                      opacity: 0.85,
                      maxWidth: '480px'
                    }}>
                      A calm, contemporary stay with considered rooms, thoughtful comfort, a private gym, and space to meet.
                    </p>
                  </div>
                  <div className="fade-up" style={{ animationDelay: '1.7s' }}>
                    <Link href="/contact" className="btn btn-primary" style={{ 
                      padding: '1.25rem 2.5rem',
                      fontSize: '1rem',
                      borderRadius: '999px',
                      display: 'inline-flex'
                    }}>
                      Book a stay
                    </Link>
                  </div>
                </div>
              </div>

              {/* Image Column */}
              <div className="hero-image-col">
                <div className="hero-image-wrapper reveal-image" style={{ animationDelay: '1.3s' }}>
                  <Image 
                    src="/images/01-hammock-facade-hero.jpg" 
                    alt="Hammock Facade"
                    fill
                    priority
                    fetchPriority="high"
                    style={{ 
                      objectFit: 'cover', 
                      objectPosition: '50% 30%', 
                      borderRadius: 'var(--radius-xl)'
                    }}
                  />
                  
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: 'var(--spacing-24) 0' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
              
              {/* Feature 1 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
                <div style={{ flex: '1 1 500px', position: 'relative', height: '60vh', minHeight: '400px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/02-luxury-suite.jpg" alt="Luxury Suite" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: '1 1 300px' }}>
                  <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>Stay</span>
                  <h2 className="text-h3" style={{ marginTop: '1rem' }}>Rooms made for real rest</h2>
                </div>
              </div>

              {/* Feature 2 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', flexDirection: 'row-reverse' }}>
                <div style={{ flex: '1 1 500px', position: 'relative', height: '60vh', minHeight: '400px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/03-hotel-gym.jpg" alt="Hotel Gym" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: '1 1 300px' }}>
                  <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>Move</span>
                  <h2 className="text-h3" style={{ marginTop: '1rem' }}>A private gym, ready when you are</h2>
                </div>
              </div>

              {/* Feature 3 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
                <div style={{ flex: '1 1 500px', position: 'relative', height: '60vh', minHeight: '400px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/04-conference-hall.jpg" alt="Conference Hall" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: '1 1 300px' }}>
                  <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>Meet</span>
                  <h2 className="text-h3" style={{ marginTop: '1rem' }}>A conference room that means business</h2>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-burgundy text-cream" style={{ padding: 'var(--spacing-24) 0' }}>
          <div className="container">
            <div style={{ maxWidth: '600px', marginBottom: 'var(--spacing-16)' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', opacity: 0.8 }}>Your stay, simply arranged</span>
              <h2 className="text-h2" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>From booking to unwinding</h2>
              <p className="text-body-lg" style={{ opacity: 0.9 }}>
                A considered experience from the moment you choose your room to the moment you settle in.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Image src="/brand/h-mark-cream.svg" alt="" width={32} height={32} style={{ opacity: 0.5 }} />
                <h3 className="text-h3" style={{ fontSize: '1.75rem' }}>Choose your room</h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>Find the stay that fits your plans, pace, and preferred level of space.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Image src="/brand/h-mark-cream.svg" alt="" width={32} height={32} style={{ opacity: 0.5 }} />
                <h3 className="text-h3" style={{ fontSize: '1.75rem' }}>Confirm your stay</h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>Share your dates and details through a clear, effortless booking experience.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Image src="/brand/h-mark-cream.svg" alt="" width={32} height={32} style={{ opacity: 0.5 }} />
                <h3 className="text-h3" style={{ fontSize: '1.75rem' }}>Arrive and unwind</h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>Step into warm hospitality, thoughtful comfort, and everything you need under one roof.</p>
              </div>

            </div>
          </div>
        </section>

        {/* Brand story teaser */}
        <section style={{ padding: 'var(--spacing-24) 0', backgroundColor: 'var(--hammock-cream)' }}>
          <div className="container">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
              <div style={{ flex: '1 1 400px' }}>
                <span style={{ color: 'var(--hammock-olive)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>Why HAMMOCK</span>
                <h2 className="text-h2" style={{ marginTop: '1rem', marginBottom: '2rem' }}>A signature of comfort.</h2>
                <p className="text-body-lg" style={{ marginBottom: '2.5rem', opacity: 0.9 }}>
                  HAMMOCK turns the feeling of a suspended hammock into a refined hospitality experience—a place to pause, unwind, and feel at ease.
                </p>
                <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', borderBottom: '1px solid var(--hammock-burgundy)', paddingBottom: '0.25rem' }}>
                  Our story <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
              <div style={{ flex: '1 1 500px', position: 'relative', height: '70vh', minHeight: '500px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                <Image src="/images/05-reception-lounge.jpg" alt="Reception Lounge" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-burgundy text-cream" style={{ padding: 'var(--spacing-32) 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.05, pointerEvents: 'none' }}>
            <Image src="/brand/h-mark-cream.svg" alt="" width={600} height={600} />
          </div>
          <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image src="/brand/h-mark-cream.svg" alt="" width={48} height={48} style={{ marginBottom: '2rem' }} />
            <h2 className="text-display" style={{ marginBottom: '3rem' }}>Stay. Unwind. Repeat.</h2>
            <Link href="/rooms" className="btn" style={{ backgroundColor: 'var(--hammock-cream)', color: 'var(--hammock-burgundy)', padding: '1rem 3rem', fontSize: '1rem' }}>
              Book your stay
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
