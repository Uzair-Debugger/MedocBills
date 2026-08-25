'use client';
import Image from 'next/image';
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import logo from '../assets/logo.webp';
import { Container, Typography, CustomButton } from './layout';
import { IconFromData } from '../helper/IconFromData';
import { iconBtnBase } from '../theme/classes';
import { SITE_CONFIG } from '../constants/seo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !message) {
      toast.error('Please fill in all fields', {
        className: 'bg-red-50 text-red-700 border-red-200',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Footer inquiry', email, message }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to send your message.');
      toast.success('Message sent successfully!', { className: 'bg-green-50 text-green-700 border-green-200' });
      setEmail('');
      setMessage('');
    } catch (submitError) {
      toast.error(submitError instanceof Error ? submitError.message : 'Unable to send your message.', { className: 'bg-red-50 text-red-700 border-red-200' });
    } finally {
      setIsSubmitting(false);
    }
  }, [email, message]);

  return (
    <footer className="bg-soft-pink text-black py-12">
      <Container size="lg" className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Logo Section */}
          <div className="border-2 border-secondary rounded-lg p-5 text-center">
            <Image
              src={logo}
              alt="MedocBills company logo"
              className="h-12 w-auto mx-auto mb-4"
              style={{ width: 'auto', height: 'auto' }}
              loading="eager"
              fetchPriority="high"
              width={182}
              height={48}
              priority
              sizes="182px"
            />

            <p className="font-light text-sm mb-5">
              Medocbills helps healthcare providers increase collections,
              reduce expenses, and streamline workflows.
            </p>

            <div className="flex justify-center gap-3">
              <a href={SITE_CONFIG.social.facebook} aria-label="Visit our Facebook page" className={iconBtnBase} target="_blank" rel="noopener noreferrer">
                <IconFromData name="Facebook" size={18} />
              </a>
              <a href={SITE_CONFIG.social.linkedin} aria-label="Visit our LinkedIn page" className={iconBtnBase} target="_blank" rel="noopener noreferrer">
                <IconFromData name="Linkedin" size={18} />
              </a>
              <a href={SITE_CONFIG.social.youtube} aria-label="Visit our YouTube channel" className={iconBtnBase} target="_blank" rel="noopener noreferrer">
                <IconFromData name="Youtube" size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <Typography as="h3" variant="h3" className="mb-4">
              Proudly Serving
            </Typography>

            <ul className="space-y-2 text-primary font-light">
              {[
                'Private Practices',
                'Individual Doctor Office',
                'Clinics & Imaging Centers',
                'Hospitals',
                'Healthcare Systems',
                'Urgent Care Centers',
                'Emergency Rooms',
              ].map((item) => (
                <li key={item}>
                  <Link href="/services" className="hover:text-secondary transition focus:outline-none focus:ring-1 focus:ring-secondary rounded px-1">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Business Hours */}
          <section>
            <h3 className="text-xl font-bold mb-4">Business Hours</h3>

            <p><strong>Monday – Friday:</strong> 8:30 AM – 5:00 PM</p>
            <p><strong>Saturday & Sunday:</strong> Closed</p>
          </section>

          {/* Contact */}
          <section>
            <h3 className="text-xl font-bold mb-4">Quick Contact</h3>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  placeholder="Message"
                  value={message}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                  rows={4}
                  required
                  className="input resize-none"
                />
              </div>

              <CustomButton type="submit" variant="secondary" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </CustomButton>
            </form>

            <div className="border-t my-6" />

            <address className="not-italic space-y-3 text-sm">
              <div className="flex gap-2">
                {/* FIXED: Replaced Phone with IconFromData */}
                <IconFromData name="Phone" size={18} />
                <a href="tel:2013713521">201-371-3521</a>
              </div>

              <div className="flex gap-2">
                {/* FIXED: Replaced Mail with IconFromData */}
                <IconFromData name="Mail" size={18} />
                <a href="mailto:info@medocbills.com">info@medocbills.com</a>
              </div>

              <div className="flex gap-2">
                {/* FIXED: Replaced MapPin with IconFromData */}
                <IconFromData name="MapPin" size={18} />
                <span>
                  835 Wilshire Blvd, Ste 500 #513,
                  Los Angeles, CA 90017
                </span>
              </div>
            </address>
          </section>
        </div>
      </Container>
    </footer>
  );
}
