'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Room } from './data';
import Link from 'next/link';
import { createWhatsAppUrl, getRoomBookingMessage } from '../../lib/whatsapp';

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
      initial={{ backgroundColor: 'rgba(245, 235, 213, 0)' }}
      animate={{ backgroundColor: 'rgba(245, 235, 213, 0.75)' }}
      exit={{ backgroundColor: 'rgba(245, 235, 213, 0)' }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${room.name}`}
    >
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '1200px', 
          display: 'flex', 
          gap: '4rem',
          alignItems: 'center',
          height: '80vh'
        }}
        className="modal-inner"
      >
        <motion.div 
          layoutId={isIntercepted ? `room-image-${room.id}` : undefined}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ 
            flex: '0 0 60%', 
            height: '100%', 
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(89, 10, 23, 0.1)'
          }}
          className="modal-img-wrapper"
        >
          <Image 
            src={room.image} 
            alt={`Interior view of ${room.name}`}
            fill 
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
            style={{ objectFit: 'cover' }} 
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          className="modal-content"
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
            <button 
              onClick={() => router.back()} 
              style={{ 
                backgroundColor: 'transparent', 
                padding: '0.5rem',
                fontFamily: 'inherit',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--hammock-burgundy)',
                border: '1px solid rgba(89, 10, 23, 0.2)',
                borderRadius: '999px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              aria-label="Back to rooms"
            >
              Close &times;
            </button>
          </div>

          <span style={{ color: 'var(--hammock-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 500 }}>
            HAMMOCK SUITES AND ROOMS
          </span>
          <h1 className="text-display" style={{ marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {room.name}
          </h1>
          <p className="text-body-lg" style={{ opacity: 0.8, marginBottom: '3rem' }}>
            {room.description}
          </p>

          <a href={createWhatsAppUrl(getRoomBookingMessage(room.name))} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1.25rem 3rem', display: 'inline-flex', alignSelf: 'flex-start', textDecoration: 'none' }}>
            Book this room
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .modal-inner {
            flex-direction: column !important;
            height: 100% !important;
            overflow-y: auto !important;
            padding: 2rem 0 !important;
            gap: 2rem !important;
          }
          .modal-img-wrapper {
            flex: 0 0 50vh !important;
            width: 100% !important;
          }
          .modal-content {
            flex: 1 1 auto !important;
            width: 100% !important;
            padding-bottom: 2rem !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
