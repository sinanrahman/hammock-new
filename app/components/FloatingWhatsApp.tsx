'use client';

import { MessageCircle } from 'lucide-react';
import { createWhatsAppUrl, getGeneralBookingMessage } from '../../lib/whatsapp';
import { useEffect, useState } from 'react';

export default function FloatingWhatsApp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <a
      href={createWhatsAppUrl(getGeneralBookingMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book your stay on WhatsApp"
      title="Book on WhatsApp"
      className="floating-whatsapp"
    >
      <MessageCircle size={28} />
      <style jsx>{`
        .floating-whatsapp {
          position: fixed;
          right: 16px;
          bottom: calc(16px + env(safe-area-inset-bottom));
          width: 56px;
          height: 56px;
          background-color: #590A17;
          color: #F5EBD5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(89, 10, 23, 0.25);
          z-index: 50;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
          outline: none;
        }
        @media (min-width: 768px) {
          .floating-whatsapp {
            right: 32px;
            bottom: 32px;
            width: 62px;
            height: 62px;
          }
        }
        .floating-whatsapp:hover,
        .floating-whatsapp:focus-visible {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 28px rgba(89, 10, 23, 0.35);
        }
        .floating-whatsapp:focus-visible {
          box-shadow: 0 0 0 3px rgba(245, 235, 213, 0.8), 0 12px 28px rgba(89, 10, 23, 0.35);
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-whatsapp {
            transition: none !important;
          }
          .floating-whatsapp:hover,
          .floating-whatsapp:focus-visible {
            transform: none !important;
          }
        }
      `}</style>
    </a>
  );
}
