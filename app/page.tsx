'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import AnimatedSection from '../src/components/AnimatedSection';
import MedicalSpecialties from '../src/components/MedicalSpecialties';
import RequestCallBackForm from '../src/components/Reachus';
import { Typography, CustomButton, Container } from '../src/components/layout';
import {

  whatwedo,
  clientBase,
  successRate,
  whyToChoose,
  testimonials,
  testimonialVariants,
  slides,
} from '../src/constants/data';
import { PersonSVG } from '../src/constants/icons';
import { IconFromData } from '../src/helper/IconFromData';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Memoized navigation functions to prevent unnecessary re-renders
  const goToNextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToNextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Hero Slider Interval with cleanup
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [goToNextSlide]);

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4, ease: 'easeInOut' },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4, ease: 'easeInOut' },
      },
    }),
  };

  const navButtonClasses =
    'absolute top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-[2px] bg-primary text-white hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2';

  return (
    <section className="flex flex-col items-center justify-center">
      {/* â”€â”€ Hero Slider â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        aria-label="Hero slideshow"
        className="relative p-3 w-full bg-gradient-to-br from-teal-50 to-white overflow-hidden"
      >
        <Container size="lg" className="relative w-full pt-7 md:pt-0">
          <div
            className="relative w-full min-h-[600px] sm:min-h-[650px] md:min-h-[550px]"
            role="region"
            aria-live="polite"
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Text Content */}
                  <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0 pt-4 md:pt-0">
                    <Typography as="h1" variant="h1" color="primary" className="leading-tight">
                      {slides[currentSlide].title}
                    </Typography>
                    <Typography as="p" variant="p" color="gray" className="py-3 sm:py-4 leading-7 font-light">
                      {slides[currentSlide].description}
                    </Typography>
                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 mt-3 sm:mt-4">
                      <CustomButton
                        variant="secondary"
                        size="md"
                        roundedFull
                        className="w-full sm:w-auto"
                        aria-label={slides[currentSlide].button}
                      >
                        {slides[currentSlide].button}
                      </CustomButton>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="w-full md:w-1/2 flex justify-center items-center">
                    <div className="w-full max-w-md md:max-w-none py-10">
                      <Image
                        src={slides[currentSlide].image}
                        alt={`Healthcare solution illustration: ${slides[currentSlide].title}`}
                        className="shadow-lg w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-lg"
                        width={800}
                        height={500}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20"
            role="tablist"
            aria-label="Slide navigation"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary ${index === currentSlide
                    ? 'bg-primary w-4'
                    : 'bg-primary/50 hover:bg-primary/70'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide ? 'true' : 'false'}
                role="tab"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* â”€â”€ Client Base â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section aria-labelledby="client-base-heading">
        <Container size="lg" className="my-8 flex justify-center px-4 sm:my-12">
          <AnimatedSection direction="up" className="grid w-full grid-cols-1 gap-8 p-4 sm:gap-10 sm:p-5 md:grid-cols-2">
            <div className="flex flex-col gap-4 max-w-lg justify-self-center sm:gap-5 md:justify-self-start">
              <Typography
                as="h2"
                id="client-base-heading"
                variant="h2"
                color="primary"
              >
                {clientBase.heading}
              </Typography>
              <Typography as="p" color="gray">
                {clientBase.paragraph}
              </Typography>
              <CustomButton variant="secondary" size="md" roundedFull>
                {clientBase.buttonText}
              </CustomButton>
            </div>

            <div
              className="grid grid-cols-2 items-center justify-center gap-3 sm:gap-4 md:grid-cols-3 md:justify-end"
              role="list"
              aria-label="Our client base includes"
            >
              {clientBase.icons.map((iconName, index) => (
                <div
                  key={index}
                  className="flex h-max items-center justify-center rounded-lg bg-teal-50 p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
                  role="listitem"
                >
                  <IconFromData 
                    key={index} 
                    name={iconName} 
                    className="text-secondary sm:h-[50px] sm:w-[50px]"
                    size={40}
                  />
                  <span className="sr-only">Client category {index + 1}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* â”€â”€ Services â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        aria-labelledby="services-heading"
        className="relative w-full overflow-hidden bg-secondary py-12"
      >
        <AnimatedSection direction="up" className="mx-auto max-w-7xl px-4 text-center">
          <Typography
            as="h2"
            id="services-heading"
            variant="h2"
            color="white"
            className="mb-2 text-center"
          >
            Our Services
          </Typography>
          <div className="mx-auto mb-8 h-1 w-32 bg-white" aria-hidden="true" />
          <Typography as="p" color="white" className="mx-auto mb-12 max-w-4xl text-lg leading-relaxed">
            MedocBills LLC has a strong grasp of medical billing, credentialing, medical A/R, and practice billing audit services. With extensive experience in the healthcare billing industry, we are confident in our ability to enhance the financial performance of your healthcare practice.
          </Typography>
        </AnimatedSection>

        <Container
          size="lg"
          grid
          className="grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-4"
          role="list"
          aria-label="Our services"
        >
          {whatwedo.map((service, index) => (
            <div key={index} role="listitem">
              <AnimatedSection
                direction="up"
                delay={index * 100}
                className="flex flex-col items-start rounded-2xl bg-white p-8 shadow-lg"
              >
                <div className="mb-6 rounded-lg bg-cyan-light p-4" aria-hidden="true">
                  {/* FIXED: Changed from <service.icon /> to <IconFromData /> */}
                  <IconFromData 
                    name={service.icon} 
                    size={40} 
                    className="text-secondary"
                  />
                </div>
                <Typography as="h3" variant="h3" color="primary" className="mb-4 underline decoration-cyan-accent">
                  {service.title}
                </Typography>
                <Typography as="p" color="gray">{service.description}</Typography>
              </AnimatedSection>
            </div>
          ))}
        </Container>
      </section>

      {/* â”€â”€ Why Choose / Success Rate â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section aria-labelledby="why-choose-heading" className="w-full max-w-7xl mx-auto px-4">
        <AnimatedSection direction="left" className="flex w-full flex-col-reverse rounded-lg shadow-lg sm:p-6 md:flex-row lg:p-8">
          <div
            className="flex flex-1 flex-col justify-center rounded-3xl bg-gradient-to-br from-teal-50 to-cyan-50 p-6 text-center sm:p-8 md:ml-5 md:mt-0 md:items-start"
            aria-label="Success metrics"
          >
            {successRate.map((item, index) => (
              <div key={index} className="flex flex-col items-center md:items-start mb-6">
                <Typography as="span" variant="h2" color="primary">
                  {item.value}
                </Typography>
                <Typography as="span" color="gray">
                  {item.description}
                </Typography>
              </div>
            ))}
          </div>

          <div className="flex flex-1 flex-col justify-center rounded-t-3xl bg-white p-6 text-left sm:p-8 md:rounded-r-3xl md:rounded-tl-none md:p-12 lg:p-16 xl:p-20">
            <Typography as="h2" id="why-choose-heading" variant="h2" color="primary" className="mb-4 sm:mb-6">
              {whyToChoose.heading}
            </Typography>
            <ul className="my-3 space-y-4 sm:my-4 sm:space-y-5" aria-label="Reasons to choose us">
              {whyToChoose.points.map((item, index) => (
                <li key={index} className="relative pl-5 sm:pl-6">
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <Typography as="h3" color="secondary" className="mb-1 sm:text-lg">{item.title}</Typography>
                  <Typography as="p" color="gray">{item.para}</Typography>
                </li>
              ))}
            </ul>
            <CustomButton variant="secondary" roundedFull size="md" className="mt-6 self-start sm:mt-8">
              Schedule a Consultation
            </CustomButton>
          </div>
        </AnimatedSection>
      </section>

      {/* â”€â”€ Medical Specialties â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <MedicalSpecialties />

      {/* â”€â”€ Testimonials â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        aria-labelledby="testimonials-heading"
        className="relative mt-8 flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-primary-deep px-4 py-10 font-sans sm:mt-10 sm:py-12 md:py-16"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center p-4 text-center text-white sm:p-6 md:p-8">
          <Typography as="h2" id="testimonials-heading" variant="h2" color="white" className="mb-8 sm:mb-10">
            What Healthcare Providers Say
          </Typography>

          <div className="relative flex w-full max-w-4xl flex-col items-center">
            <div
              className="mb-8 px-10 text-base italic leading-relaxed sm:mb-10 sm:px-14 sm:text-lg md:px-20 md:text-xl"
              role="region"
              aria-live="polite"
              aria-label={`Testimonial ${currentTestimonial + 1} of ${testimonials.length}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  variants={testimonialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  "{testimonials[currentTestimonial].text}"
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={goToPrevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-secondary/50 p-2 text-white transition hover:bg-secondary/70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:left-2 sm:p-3"
              aria-label="Previous testimonial"
            >
              <svg aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-secondary/50 p-2 text-white transition hover:bg-secondary/70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:right-2 sm:p-3"
              aria-label="Next testimonial"
            >
              <svg aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mt-6 flex flex-col items-center sm:mt-8">
            <PersonSVG aria-hidden="true" />
            <Typography as="span" variant="h5" color="white" className="mt-3 sm:mt-4 sm:text-xl font-bold">
              {testimonials[currentTestimonial].name}
            </Typography>
            {(testimonials[currentTestimonial] as any).role && (
              <Typography as="span" variant="p" color="white" className="mt-1 text-sm opacity-90">
                {(testimonials[currentTestimonial] as any).role}
              </Typography>
            )}
          </div>
        </div>
      </section>

      {/* â”€â”€ Callback Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <RequestCallBackForm />
    </section>
  );
};

export default Hero;




