import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RoomsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section style={{ position: 'relative', height: '80vh', minHeight: '600px', width: '100%', overflow: 'hidden' }}>
          <Image 
            src="/images/02-luxury-suite.jpg" 
            alt="Luxury Suite"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(89, 10, 23, 0.6) 0%, rgba(89, 10, 23, 0) 70%)',
          }} />
          
          <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '6rem' }}>
            <div style={{ color: 'var(--hammock-cream)' }}>
              <h1 className="text-display" style={{ marginBottom: '1.5rem' }}>Rooms & Suites</h1>
              <p className="text-body-lg" style={{ maxWidth: '600px', opacity: 0.9 }}>
                Considered spaces designed for real rest. Warm, minimal, and crafted for your comfort.
              </p>
            </div>
          </div>
        </section>

        {/* Room Overview */}
        <section style={{ padding: 'var(--spacing-24) 0', backgroundColor: 'var(--hammock-cream)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
              {/* Room Card - Data object for editable fields */}
              {[
                {
                  id: 1,
                  name: "Signature Room",
                  desc: "A beautifully appointed space featuring our custom comfort bed, warm olive accents, and expansive windows. The perfect retreat after a day in the city.",
                  image: "/images/02-luxury-suite.jpg"
                }
              ].map(room => (
                <div key={room.id} style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
                  <div style={{ flex: '1 1 500px', position: 'relative', height: '50vh', minHeight: '400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                    <Image src={room.image} alt={room.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: '1 1 400px' }}>
                    <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>{room.name}</h2>
                    <p className="text-body-lg" style={{ marginBottom: '2rem', opacity: 0.8 }}>
                      {room.desc}
                    </p>
                    
                    <div style={{ marginBottom: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid rgba(89,10,23,0.1)', paddingTop: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>Features</span>
                      </div>
                    </div>

                    <button className="btn btn-primary">Book this room</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
