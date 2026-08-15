'use client';
import Image from 'next/image';
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import logo from '../assets/logo.webp';
import { Container, Typography, CustomButton } from './layout';
import { IconFromData } from '../helper/IconFromData';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    if (!email || !message) {
      alert('Please fill in all fields');
      return;
    }

    alert('Message sent successfully!');
    setEmail('');
    setMessage('');
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
              loading="eager"
              fetchPriority="high"
              width={182}
              height={48}
              priority
            />

            <p className="font-light text-sm mb-5">
              Medocbills helps healthcare providers increase collections,
              reduce expenses, and streamline workflows.
            </p>

            <div className="flex justify-center gap-3">
              <a href="#" aria-label="Visit our Facebook page" className="icon-btn">
                {/* FIXED: Replaced Facebook with IconFromData */}
                <IconFromData name="Facebook" size={18} />
              </a>
              <a href="#" aria-label="Visit our LinkedIn page" className="icon-btn">
                {/* FIXED: Replaced Linkedin with IconFromData */}
                <IconFromData name="Linkedin" size={18} />
              </a>
              <a href="#" aria-label="Visit our YouTube channel" className="icon-btn">
                {/* FIXED: Replaced Youtube with IconFromData */}
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
                  <a href="#" className="hover:text-secondary transition">
                    {item}
                  </a>
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

              <CustomButton type="submit" variant="secondary" className="w-full">
                Send Message
              </CustomButton>
            </form>

            <div className="border-t my-6" />

            <address className="not-italic space-y-3 text-sm">
              <div className="flex gap-2">
                {/* FIXED: Replaced Phone with IconFromData */}
                <IconFromData name="Phone" size={18} />
                <a href="tel:5715202235">571-520-2235</a>
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
