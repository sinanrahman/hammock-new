import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Header Spacer */}
        <div style={{ height: 'var(--nav-height)', backgroundColor: 'var(--hammock-cream)' }} />

        <section style={{ padding: 'var(--spacing-16) 0', backgroundColor: 'var(--hammock-cream)' }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h1 className="text-display" style={{ marginBottom: '2rem' }}>Our Story</h1>
              <p className="text-body-lg" style={{ opacity: 0.9, marginBottom: '4rem' }}>
                A signature of comfort.
              </p>
            </div>

            <div style={{ position: 'relative', height: '60vh', minHeight: '500px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 'var(--spacing-24)' }}>
              <Image src="/images/05-reception-lounge.jpg" alt="Reception Lounge" fill style={{ objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
              <div>
                <h2 className="text-h3" style={{ marginBottom: '1.5rem' }}>The Concept</h2>
                <p style={{ opacity: 0.8, lineHeight: 1.8 }}>
                  HAMMOCK was conceived to capture the pure essence of relaxation. We turn the feeling of a suspended hammock into a refined hospitality experience—a place to pause, unwind, and feel completely at ease. Our spaces are designed to foster calm and contemporary comfort.
                </p>
              </div>
              
              <div>
                <h2 className="text-h3" style={{ marginBottom: '1.5rem' }}>The Identity</h2>
                <p style={{ opacity: 0.8, lineHeight: 1.8, marginBottom: '2rem' }}>
                  Our brand identity reflects our philosophy. The custom wordmark is restrained and elegant, while our signature &apos;H&apos; mark reveals a subtle, hidden curve—a nod to the shape of a hammock at rest. It is a quiet promise of the comfort that awaits within our walls.
                </p>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <Image src="/brand/h-mark-exact.png" alt="Hammock Mark" width={60} height={60} style={{ opacity: 0.8 }} />
                  <Image src="/brand/hammock-wordmark.png" alt="Hammock Wordmark" width={140} height={32} style={{ opacity: 0.8, filter: 'brightness(0) saturate(100%) invert(13%) sepia(87%) saturate(3015%) hue-rotate(338deg) brightness(92%) contrast(110%)' }} />
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
