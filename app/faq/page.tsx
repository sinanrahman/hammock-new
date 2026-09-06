'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FAQ_ITEMS = [
  {
    question: "How can I make a booking enquiry?",
    answer: "You can book directly through our website by visiting the Rooms & Suites page, or by contacting our reservations team using the Contact form."
  },
  {
    question: "What information is required for check-in?",
    answer: "To ensure a smooth arrival experience, please have your booking confirmation and a valid government-issued photo ID ready upon check-in. If you need special arrangements, please contact the property in advance."
  },
  {
    question: "What are the gym opening hours and availability?",
    answer: "Our private gym is accessible exclusively to staying guests. For current opening hours and specific equipment availability, please reach out to our team during your stay or via the Contact page prior to arrival."
  },
  {
    question: "How do I enquire about the conference hall?",
    answer: "Our conference hall is available for meetings and private events. To discuss availability, setup requirements, and group arrangements, please submit a detailed request through our Contact page."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellation policies vary based on the specific rate and dates selected at the time of booking. Please refer to your booking confirmation for exact details, or contact our reservations team for assistance."
  },
  {
    question: "How can I contact the property during my stay?",
    answer: "Our reception team is available to assist you. You can reach us directly from your room, stop by the front desk, or use the contact details provided upon check-in for any immediate needs."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <main>
        <div style={{ height: 'var(--nav-height)', backgroundColor: 'var(--hammock-cream)' }} />

        <section style={{ padding: 'var(--spacing-16) 0 var(--spacing-32)', backgroundColor: 'var(--hammock-cream)' }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h1 className="text-display" style={{ marginBottom: '4rem', textAlign: 'center' }}>Frequently Asked Questions</h1>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {FAQ_ITEMS.map((item, index) => {
                  const isOpen = openIndex === index;
                  
                  return (
                    <div 
                      key={index} 
                      style={{ 
                        borderBottom: '1px solid rgba(89, 10, 23, 0.2)',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={isOpen}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1.5rem 0',
                          color: 'var(--hammock-burgundy)',
                          textAlign: 'left'
                        }}
                      >
                        <span className="text-h3" style={{ fontSize: '1.5rem', margin: 0 }}>{item.question}</span>
                        <span 
                          aria-hidden="true" 
                          style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: 300,
                            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          +
                        </span>
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                          >
                            <div style={{ paddingBottom: '1.5rem' }}>
                              <p className="text-body-lg" style={{ opacity: 0.8 }}>
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
