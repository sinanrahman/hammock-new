'use client';

import Link from 'next/link';
import Image from 'next/image';

const WHATSAPP_LINK = "https://wa.me/918547731887?text=Hello%20HAMMOCK%20Suites%20%26%20Rooms%2C%20I%20would%20like%20to%20enquire%20about%20booking%20a%20stay.%20Please%20share%20room%20availability%20and%20booking%20details.";
const CALL_LINK = "tel:+918547731887";
const MAPS_LINK = "https://maps.app.goo.gl/drJBcrAJQxoBUNR67";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--hammock-cream)', color: 'var(--hammock-burgundy)', paddingTop: '6rem', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Top Section */}
        <div className="footer-top">
          
          {/* Brand Intro */}
          <div className="footer-brand">
            <div className="small-logo-wrapper">
              <Image 
                src="/logo.png" 
                alt="Hammock Suites & Rooms" 
                width={140} 
                height={40} 
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
              />
            </div>
            <p className="brand-desc text-body-lg">
              A place to pause. A place to stay.<br />
              Considered rooms, thoughtful comfort and warm hospitality.
            </p>
            <p className="copyright">
              &copy; {currentYear} HAMMOCK Suites & Rooms.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="footer-nav">
            <div className="nav-column">
              <h4 className="nav-heading">Explore</h4>
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/rooms" className="nav-link">Rooms &amp; Suites</Link>
              <Link href="/about" className="nav-link">About</Link>
            </div>
            
            <div className="nav-column">
              <h4 className="nav-heading">Get in touch</h4>
              <Link href="/contact" className="nav-link">Contact</Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="nav-link">WhatsApp</a>
              <a href={CALL_LINK} className="nav-link">Call us</a>
            </div>

            <div className="nav-column">
              <h4 className="nav-heading">Visit</h4>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="nav-link">Get directions</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="nav-link">Book a stay</a>
            </div>
          </div>
          
        </div>
      </div>

      {/* Oversized Logo at Bottom */}
      <div className="oversized-logo-container">
        <Image 
          src="/logo.png" 
          alt="Hammock" 
          fill
          style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
          sizes="100vw"
          priority
        />
      </div>

      <style jsx>{`
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .footer-brand {
          flex: 0 0 40%;
          display: flex;
          flex-direction: column;
        }

        .small-logo-wrapper {
          margin-bottom: 2rem;
          height: 40px;
          display: flex;
          align-items: center;
        }

        .brand-desc {
          opacity: 0.9;
          margin-bottom: 3rem;
          line-height: 1.6;
          max-width: 420px;
        }

        .copyright {
          opacity: 0.6;
          font-size: 0.875rem;
        }

        .footer-nav {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          gap: 6rem;
        }

        .nav-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .nav-heading {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          font-family: var(--font-inter);
          opacity: 0.6;
          /* Align perfectly with the 40px tall logo area */
          height: 40px;
          display: flex;
          align-items: center;
        }

        .nav-link {
          font-size: 1rem;
          color: var(--hammock-burgundy);
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .nav-link:hover, .nav-link:focus-visible {
          opacity: 1;
        }

        .oversized-logo-container {
          position: relative;
          width: 92%;
          margin: 0 auto;
          /* The logo image has significant top/bottom padding. 
             By using a negative bottom margin and an aspect-ratio driven height, 
             we pull it flush to the bottom edge. */
          height: 23vw; /* Approximate height based on typical logo aspect ratios */
          max-height: 400px;
          min-height: 150px;
          margin-bottom: -8.5%; /* Pull down further to hide empty bottom padding */
        }

        @media (max-width: 1024px) {
          .footer-nav {
            gap: 3rem;
          }
        }

        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column;
            gap: 4rem;
          }
          
          .footer-brand {
            flex: 1 1 auto;
          }

          .footer-nav {
            width: 100%;
            justify-content: flex-start;
            flex-wrap: wrap;
            row-gap: 3rem;
            column-gap: 4rem;
          }
          
          .oversized-logo-container {
            width: 95%;
            height: 35vw;
            margin-bottom: -12%;
          }
        }

        @media (max-width: 480px) {
          .footer-nav {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 2rem;
          }
          
          .nav-column:last-child {
            grid-column: 1 / -1;
          }

          .oversized-logo-container {
            width: 95%;
            height: 45vw;
            margin-bottom: -15%;
          }
        }
      `}</style>
    </footer>
  );
}
