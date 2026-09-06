import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AmenitiesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Header Spacer */}
        <div style={{ height: 'var(--nav-height)', backgroundColor: 'var(--hammock-cream)' }} />

        <section style={{ padding: 'var(--spacing-16) 0 var(--spacing-24)', backgroundColor: 'var(--hammock-cream)' }}>
          <div className="container">
            <h1 className="text-display" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Amenities</h1>
            <p className="text-body-lg" style={{ maxWidth: '600px', margin: '0 auto 4rem', textAlign: 'center', opacity: 0.8 }}>
              Spaces designed to complement your stay, whether you&apos;re here to focus, exercise, or gather.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
              
              {/* Gym */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
                <div style={{ flex: '1 1 500px', position: 'relative', height: '60vh', minHeight: '500px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/03-hotel-gym.jpg" alt="Hotel Gym" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: '1 1 400px' }}>
                  <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>Move</span>
                  <h2 className="text-h2" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>The Private Gym</h2>
                  <p className="text-body-lg" style={{ opacity: 0.9 }}>
                    A dedicated space to maintain your rhythm. Thoughtfully equipped for both strength and conditioning, our private gym offers a quiet environment for your daily practice, ready whenever you are.
                  </p>
                </div>
              </div>

              {/* Conference Hall */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', flexDirection: 'row-reverse' }}>
                <div style={{ flex: '1 1 500px', position: 'relative', height: '60vh', minHeight: '500px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/04-conference-hall.jpg" alt="Conference Hall" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: '1 1 400px' }}>
                  <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>Meet</span>
                  <h2 className="text-h2" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Conference Hall</h2>
                  <p className="text-body-lg" style={{ opacity: 0.9 }}>
                    A sophisticated environment for productive gatherings. Designed with clarity and focus in mind, the space accommodates professional meetings and private events with effortless grace.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
