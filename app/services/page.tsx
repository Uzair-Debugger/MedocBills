'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, type Variants, animate } from 'framer-motion';
import Image from 'next/image';
import type { CounterProps } from '../../src/constants/types';
import { servicesData, statsData, doctorsData, faqs } from '../../src/constants/data';
import { Container, Typography, CustomButton } from '../../src/components/layout';
import { mergeClass } from '../../src/utils/classUtils';
import { IconFromData } from '../../src/helper/IconFromData';


// â”€â”€â”€ Counter Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Counter = ({ value, duration = 2000, suffix = '' }: CounterProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = count.on('change', (latest) => setDisplay(Math.floor(latest)));
    return unsubscribe;
  }, [count]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(count, value, { duration: duration / 1000, ease: 'easeOut' });
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, count]);

  return (
    <motion.span ref={ref} aria-live="polite" aria-label={`${value}${suffix}`}>
      {display}
      {suffix}
    </motion.span>
  );
};

// â”€â”€â”€ Service Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

const ServiceCard = ({ title, description, index, isVisible }: ServiceCardProps) => (
  <article
    className={mergeClass(
      'group p-4 text-left bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl hover:bg-white/20 hover:border-secondary transition-all duration-700 ease-out transform',
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
    )}
    style={{ transitionDelay: `${index * 0.15}s` }}
  >
    <div className="flex flex-col sm:flex-row items-start gap-3">
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
        {/* FIXED: Replaced Shield with IconFromData */}
        <IconFromData name="Shield" className="w-6 h-6 text-white" size={24} />
      </div>
      <div className="flex-1">
        <Typography as="h3" variant="h3" color="secondary" className="mb-3 group-hover:text-secondary transition-colors">
          {title}
        </Typography>
        <Typography as="p" color="white">
          {description}
        </Typography>
      </div>
    </div>
  </article>
);

// â”€â”€â”€ Stat Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface StatCardProps {
  iconName: string;
  value: number;
  suffix: string;
  label: string;
}

const StatCard = ({ iconName, value, suffix, label }: StatCardProps) => (
  <div className="flex flex-col items-center justify-center transform hover:scale-110 transition-transform">
    <div className="mb-3">
      {/* FIXED: Replaced direct icon with IconFromData */}
      <IconFromData name={iconName} className="w-10 h-10 text-white/80" size={40} />
    </div>
    <Typography as="h3" variant="h1" color="white" className="mb-2 text-5xl font-bold">
      <Counter value={value} suffix={suffix} />
    </Typography>
    <Typography as="p" color="white" className="text-sm uppercase tracking-wider">{label}</Typography>
  </div>
);

// â”€â”€â”€ Doctor Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface DoctorCardProps {
  doctor: {
    name: string;
    specialty: string;
    image: string;
  };
}

const DoctorCard = ({ doctor }: DoctorCardProps) => (
  <article className="w-full flex-shrink-0">
    <div className="bg-white max-sm:max-w-[400px] m-auto rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-200">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 mx-auto">
          <div className="">
            <Image
              src={doctor.image}
              alt={`Dr. ${doctor.name}, ${doctor.specialty}`}
              className="w-full h-full object-cover"
              loading="lazy"
              width={400}
              height={500}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
        <div className="p-4 md:col-span-2 flex flex-col gap-5 justify-center bg-gradient-to-br from-white to-teal-50">
          <div className="mb-4">
            {/* FIXED: Replaced Heart with IconFromData */}
            <IconFromData name="Heart" className="w-12 h-12 text-secondary" size={48} />
          </div>
          <Typography as="h3" variant="h3" color="primary">
            {doctor.name}
          </Typography>
          <Typography as="p" color="secondary" className="text-lg font-semibold">
            {doctor.specialty}
          </Typography>
          <Typography as="p" color="gray" className="leading-relaxed">
            Dedicated to providing exceptional healthcare billing solutions with focus on accuracy, compliance, and maximizing revenue.
          </Typography>
          <CustomButton 
            variant="primary" 
            size="md" 
            roundedFull 
            className="w-max m-auto sm:m-0"
            aria-label={`View ${doctor.name}'s profile`}
          >
            View Profile
          </CustomButton>
        </div>
      </div>
    </div>
  </article>
);

// â”€â”€â”€ Doctors Slider â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DoctorsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % doctorsData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + doctorsData.length) % doctorsData.length);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, nextSlide]);

  // Pause auto-play on user interaction
  const handleUserInteraction = useCallback(() => {
    setIsAutoPlaying(false);
    const timeout = setTimeout(() => setIsAutoPlaying(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section aria-labelledby="expert-team-heading" className="py-16 px-5 bg-gradient-to-b from-white to-teal-50">
      <Container size="lg" className="text-center">
        <Typography as="h2" id="expert-team-heading" variant="h2" color="primary" className="mb-2">
          OUR EXPERT TEAM
        </Typography>
        <div className="w-16 h-1 bg-secondary mx-auto mb-4" aria-hidden="true"></div>
        <Typography as="p" color="gray" className="max-w-2xl mx-auto">
          Meet our dedicated professionals committed to optimizing your healthcare revenue cycle
        </Typography>

        <div 
          className="relative max-w-4xl mx-auto mt-10 overflow-hidden"
          role="region"
          aria-label="Doctor profiles carousel"
        >
          <div 
            className="flex transition-transform duration-500 ease-out" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {doctorsData.map((doctor, index) => (
              <DoctorCard key={index} doctor={doctor} />
            ))}
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={() => { prevSlide(); handleUserInteraction(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-primary p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Previous doctor"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={() => { nextSlide(); handleUserInteraction(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-primary p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Next doctor"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div 
            className="flex justify-center mt-6 gap-2"
            role="tablist"
            aria-label="Doctor navigation"
          >
            {doctorsData.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentIndex(index); handleUserInteraction(); }}
                className={mergeClass(
                  'h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary',
                  index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                )}
                aria-label={`Go to doctor ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
                role="tab"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

// â”€â”€â”€ FAQ Item â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface FAQItemProps {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ faq, isOpen, onClick }: FAQItemProps) => (
  <div className="border border-gray-200 rounded-lg">
    <button
      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:bg-gray-50"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${faq.question.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <span className="font-semibold text-gray-900">{faq.question}</span>
      {/* FIXED: Replaced ChevronDown with IconFromData */}
      <IconFromData
        name="ChevronDown"
        className={mergeClass('w-5 h-5 text-gray-500 transform transition-transform', isOpen ? 'rotate-180' : '')}
        size={20}
      />
    </button>
    <div
      id={`faq-answer-${faq.question.replace(/\s+/g, '-').toLowerCase()}`}
      className={mergeClass('px-6 overflow-hidden transition-all duration-300', isOpen ? 'pb-4 max-h-96' : 'max-h-0')}
      aria-hidden={!isOpen}
    >
      {isOpen && <Typography as="p" color="gray">{faq.answer}</Typography>}
    </div>
  </div>
);

// â”€â”€â”€ Services Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Services = () => {
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<null | number>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true);
          observer.disconnect();
        }
      }, 
      { threshold: 0.1 }
    );

    if (servicesRef.current) observer.observe(servicesRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleFAQ = useCallback((index: number) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  }, []);

  // Schema markup for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Map stats icons to names
  const statsIconNames = ['Activity', 'Users', 'Clock', 'Award'];

  return (
    <>
      

      {/* Services Section */}
      <section 
        ref={servicesRef}
        aria-labelledby="services-heading"
        className="relative py-20 px-5 text-center bg-gradient-to-br from-primary via-primary-dark to-primary-deep font-sans overflow-x-hidden"
      >
        <div 
          className="absolute inset-0 opacity-10" 
          aria-hidden="true"
          style={{ backgroundImage: `url("data:image/svg+xml,...")` }}
        />
        <Container size="lg" className="relative z-10">
          {/* FIXED: Replaced Stethoscope with IconFromData */}
          <IconFromData 
            name="Stethoscope" 
            className="w-16 h-16 text-secondary mx-auto mb-4" 
            size={64}
          />
          <Typography as="h2" id="services-heading" variant="h2" color="white" className="mb-3 text-center">
            OUR SERVICES
          </Typography>
          <div className="w-20 h-1 bg-secondary mx-auto mb-4" aria-hidden="true" />
          <Typography as="p" color="white" className="max-w-2xl mx-auto mb-12">
            Comprehensive healthcare billing solutions designed to optimize your revenue cycle
          </Typography>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            role="list"
            aria-label="Our medical billing services"
          >
            {servicesData.map((service, i) => (
              <ServiceCard 
                key={i} 
                title={service.title} 
                description={service.description} 
                index={i} 
                isVisible={isServicesVisible}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section 
        aria-labelledby="stats-heading"
        className="bg-gradient-to-r from-secondary to-secondary-hover py-16 px-5 text-white"
      >
        <Container size="lg">
          <Typography as="h2" id="stats-heading" variant="h2" color="white" className="sr-only">
            Company Statistics
          </Typography>
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            role="list"
            aria-label="Key performance indicators"
          >
            {statsData.map((stat, i) => (
              <div key={i} role="listitem">
                <StatCard 
                  iconName={statsIconNames[i]} 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  label={stat.label}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Doctors Slider */}
      <DoctorsSlider />

      {/* FAQ Section */}
      <section aria-labelledby="faq-heading" className="py-16 bg-white">
        <Container size="md" className="space-y-4">
          <Typography as="h2" id="faq-heading" variant="h2" color="primary" className="text-center mb-6">
            Frequently Asked Questions
          </Typography>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem 
                key={i} 
                faq={faq} 
                isOpen={openFAQ === i} 
                onClick={() => toggleFAQ(i)}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Services;


