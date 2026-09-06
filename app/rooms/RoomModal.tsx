'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Room } from './data';
import Link from 'next/link';

export default function RoomModal({ room, isIntercepted }: { room: Room, isIntercepted?: boolean }) {
  const router = useRouter();

  // Handle escape to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'var(--hammock-cream)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${room.name}`}
    >
      <div style={{ position: 'relative', width: '100%', height: '60vh', minHeight: '400px' }}>
        <motion.div 
          layoutId={isIntercepted ? `room-image-${room.id}` : undefined}
          style={{ width: '100%', height: '100%', position: 'relative' }}
        >
          <Image 
            src={room.image} 
            alt={`Interior view of ${room.name}`}
            fill 
            sizes="100vw"
            priority
            style={{ objectFit: 'cover' }} 
          />
        </motion.div>
        
        {/* Header Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <button 
            onClick={() => router.back()} 
            style={{ 
              backgroundColor: 'rgba(245, 235, 213, 0.9)', 
              backdropFilter: 'blur(8px)',
              padding: '0.75rem 1.25rem',
              borderRadius: '999px',
              fontFamily: 'inherit',
              fontSize: '0.875rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--hammock-burgundy)',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label="Back to rooms"
          >
            Close
          </button>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 0', flex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>
              HAMMOCK SUITES AND ROOMS
            </span>
            <h1 className="text-display" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              {room.name}
            </h1>
            <p className="text-body-lg" style={{ opacity: 0.8, marginBottom: '3rem' }}>
              {room.description}
            </p>

            {room.amenities.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 className="text-h3" style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Amenities</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {room.amenities.map((amenity: string) => (
                    <li key={amenity} style={{ opacity: 0.8 }}>&bull; {amenity}</li>
                  ))}
                </ul>
              </div>
            )}

            <Link href={`/contact?room=${room.id}`} className="btn btn-primary" style={{ padding: '1.25rem 3rem', display: 'inline-flex' }}>
              Book this room
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
