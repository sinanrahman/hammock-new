'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Footer from './components/Footer';
import { usePreloader } from './components/PreloaderContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const { preloaderFinished } = usePreloader();
  const container = useRef<HTMLDivElement>(null);
  
  // Ref hooks for sections
  const featuresSectionRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const finalCtaRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Only run scroll animations if reduced motion is not preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Feature Section Desktop Pinning
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      // Features Pinning
      const features = gsap.utils.toArray('.feature-item') as HTMLElement[];
      if (features.length > 0 && featuresSectionRef.current) {
        ScrollTrigger.create({
          trigger: featuresSectionRef.current,
          start: "top top+=100", // Start pinning slightly below header
          end: "+=2000", // Scroll duration for 3 items
          pin: true,
          scrub: 1,
        });

        // Animate feature items inside the pinned container
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: featuresSectionRef.current,
            start: "top top+=100",
            end: "+=2000",
            scrub: 1,
          }
        });

        // Start with first item visible, others hidden
        gsap.set(features.slice(1), { autoAlpha: 0, scale: 0.95 });
        
        features.forEach((feature, i) => {
          if (i > 0) {
            // Fade out previous
            tl.to(features[i - 1], { autoAlpha: 0, scale: 0.95, duration: 1, ease: "power2.inOut" }, `step${i}`)
              // Fade in current
              .to(feature, { autoAlpha: 1, scale: 1, duration: 1, ease: "power2.inOut" }, `step${i}`);
          }
        });
      }

      // How it Works Parallax/Step progression
      const steps = gsap.utils.toArray('.how-it-works-step') as HTMLElement[];
      if (steps.length > 0 && howItWorksRef.current) {
        ScrollTrigger.create({
          trigger: howItWorksRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            steps.forEach((step: HTMLElement, i) => {
              const startTarget = i / steps.length;
              const endTarget = (i + 1) / steps.length;
              const isActive = progress >= startTarget && progress < endTarget;
              gsap.to(step, { 
                opacity: isActive ? 1 : 0.4, 
                y: isActive ? 0 : 20, 
                duration: 0.5, 
                overwrite: "auto" 
              });
            });
          }
        });
      }

      // Story Reveal Parallax
      if (storyRef.current) {
        const storyImage = storyRef.current.querySelector('.story-image');
        gsap.to(storyImage, {
          y: "8%",
          ease: "none",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Final CTA Transition
      if (finalCtaRef.current) {
        gsap.fromTo(finalCtaRef.current, 
          { clipPath: "inset(20% 10% 0% 10% round var(--radius-xl))" },
          { 
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: finalCtaRef.current,
              start: "top bottom",
              end: "top center",
              scrub: 1
            }
          }
        );
      }
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile animations (simple fade ups, no pinning)
      const mobileItems = gsap.utils.toArray('.feature-item-mobile') as HTMLElement[];
      mobileItems.forEach((item) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        });
      });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <div ref={container}>
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
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={preloaderFinished ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
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
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={preloaderFinished ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h1 className="hero-headline" style={{ 
                      fontFamily: 'var(--hammock-display)',
                      color: 'var(--hammock-burgundy)',
                      marginBottom: '1.5rem',
                      lineHeight: 1
                    }}>
                      Stay<br/>beautifully.
                    </h1>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={preloaderFinished ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-body-lg" style={{ 
                      color: 'var(--hammock-burgundy)',
                      marginBottom: '2.5rem', 
                      opacity: 0.85,
                      maxWidth: '480px'
                    }}>
                      A calm, contemporary stay with considered rooms, thoughtful comfort, a private gym, and space to meet.
                    </p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={preloaderFinished ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link href="/contact" className="btn btn-primary" style={{ 
                      padding: '1.25rem 2.5rem',
                      fontSize: '1rem',
                      borderRadius: '999px',
                      display: 'inline-flex'
                    }}>
                      Book a stay
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Image Column */}
              <div className="hero-image-col">
                <motion.div 
                  initial={{ clipPath: "inset(100% 0 0 0 round var(--radius-xl))" }}
                  animate={preloaderFinished ? { clipPath: "inset(0% 0 0 0 round var(--radius-xl))" } : {}}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  className="hero-image-wrapper"
                >
                  <Image 
                    src="/images/01-hammock-facade-hero.jpg" 
                    alt="Hammock Facade"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    fetchPriority="high"
                    style={{ 
                      objectFit: 'cover', 
                      objectPosition: '50% 30%', 
                      borderRadius: 'var(--radius-xl)'
                    }}
                  />
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* Features Section Desktop (Pinned) */}
        <section ref={featuresSectionRef} className="desktop-features" style={{ padding: 'var(--spacing-24) 0', height: '100vh', overflow: 'hidden', position: 'relative' }}>
          <div className="container" style={{ height: '100%' }}>
            
            {/* Base item */}
            <div className="feature-item" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 var(--spacing-16)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', width: '100%' }}>
                <div style={{ flex: '1 1 500px', position: 'relative', height: '60vh', minHeight: '400px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/02-luxury-suite.jpg" alt="Luxury Suite" fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: '1 1 300px' }}>
                  <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>Stay</span>
                  <h2 className="text-h3" style={{ marginTop: '1rem' }}>Rooms made for real rest</h2>
                </div>
              </div>
            </div>

            <div className="feature-item" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 var(--spacing-16)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', width: '100%' }}>
                <div style={{ flex: '1 1 500px', position: 'relative', height: '60vh', minHeight: '400px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/03-hotel-gym.jpg" alt="Hotel Gym" fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: '1 1 300px' }}>
                  <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>Move</span>
                  <h2 className="text-h3" style={{ marginTop: '1rem' }}>A private gym, ready when you are</h2>
                </div>
              </div>
            </div>

            <div className="feature-item" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 var(--spacing-16)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', width: '100%' }}>
                <div style={{ flex: '1 1 500px', position: 'relative', height: '60vh', minHeight: '400px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/04-conference-hall.jpg" alt="Conference Hall" fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: '1 1 300px' }}>
                  <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>Meet</span>
                  <h2 className="text-h3" style={{ marginTop: '1rem' }}>A conference room that means business</h2>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Features Section Mobile (Standard Scroll) */}
        <section className="mobile-features" style={{ padding: 'var(--spacing-16) 0' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
              <div className="feature-item-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ position: 'relative', height: '60vh', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/02-luxury-suite.jpg" alt="Luxury Suite" fill sizes="100vw" style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>Stay</span>
                  <h2 className="text-h3" style={{ marginTop: '0.5rem' }}>Rooms made for real rest</h2>
                </div>
              </div>
              <div className="feature-item-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ position: 'relative', height: '60vh', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/03-hotel-gym.jpg" alt="Hotel Gym" fill sizes="100vw" style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>Move</span>
                  <h2 className="text-h3" style={{ marginTop: '0.5rem' }}>A private gym, ready when you are</h2>
                </div>
              </div>
              <div className="feature-item-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ position: 'relative', height: '60vh', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <Image src="/images/04-conference-hall.jpg" alt="Conference Hall" fill sizes="100vw" style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>Meet</span>
                  <h2 className="text-h3" style={{ marginTop: '0.5rem' }}>A conference room that means business</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section ref={howItWorksRef} className="bg-burgundy text-cream" style={{ padding: 'var(--spacing-24) 0' }}>
          <div className="container">
            <div style={{ maxWidth: '600px', marginBottom: 'var(--spacing-16)' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', opacity: 0.8 }}>Your stay, simply arranged</span>
              <h2 className="text-h2" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>From booking to unwinding</h2>
              <p className="text-body-lg" style={{ opacity: 0.9 }}>
                A considered experience from the moment you choose your room to the moment you settle in.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
              
              <div className="how-it-works-step" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Image src="/h-mark-cream.svg" alt="" width={32} height={32} style={{ opacity: 0.5 }} />
                <h3 className="text-h3" style={{ fontSize: '1.75rem' }}>Choose your room</h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>Find the stay that fits your plans, pace, and preferred level of space.</p>
              </div>

              <div className="how-it-works-step" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', opacity: 0.4 }}>
                <Image src="/h-mark-cream.svg" alt="" width={32} height={32} style={{ opacity: 0.5 }} />
                <h3 className="text-h3" style={{ fontSize: '1.75rem' }}>Confirm your stay</h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>Share your dates and details through a clear, effortless booking experience.</p>
              </div>

              <div className="how-it-works-step" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', opacity: 0.4 }}>
                <Image src="/h-mark-cream.svg" alt="" width={32} height={32} style={{ opacity: 0.5 }} />
                <h3 className="text-h3" style={{ fontSize: '1.75rem' }}>Arrive and unwind</h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>Step into warm hospitality, thoughtful comfort, and everything you need under one roof.</p>
              </div>

            </div>
          </div>
        </section>

        {/* Brand story teaser */}
        <section ref={storyRef} style={{ padding: 'var(--spacing-24) 0', backgroundColor: 'var(--hammock-cream)', overflow: 'hidden' }}>
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
                {/* 4-8% larger height for parallax scrub */}
                <div style={{ position: 'absolute', top: '-8%', left: 0, right: 0, bottom: '-8%' }}>
                  <Image className="story-image" src="/images/05-reception-lounge.jpg" alt="Reception Lounge" fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section ref={finalCtaRef} className="bg-burgundy text-cream" style={{ padding: 'var(--spacing-32) 0', textAlign: 'center', position: 'relative', overflow: 'hidden', clipPath: 'inset(0 0 0 0)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.05, pointerEvents: 'none' }}>
            <Image src="/h-mark-cream.svg" alt="" width={600} height={600} />
          </div>
          <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image src="/h-mark-cream.svg" alt="" width={48} height={48} style={{ marginBottom: '2rem' }} />
            <h2 className="text-display" style={{ marginBottom: '3rem' }}>Stay. Unwind. Repeat.</h2>
            <Link href="/rooms" className="btn" style={{ backgroundColor: 'var(--hammock-cream)', color: 'var(--hammock-burgundy)', padding: '1rem 3rem', fontSize: '1rem' }}>
              Book your stay
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <style jsx global>{`
        .desktop-features { display: none; }
        .mobile-features { display: block; }
        @media (min-width: 1024px) {
          .desktop-features { display: block; }
          .mobile-features { display: none; }
        }
      `}</style>
    </div>
  );
}
