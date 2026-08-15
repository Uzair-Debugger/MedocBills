'use client';

import React from 'react';
import { medicalBusinessSchema, heroParagraphs } from '../../src/constants/data';
import { services, rcmSteps, whyChoose, keyPoints } from '../../src/constants/data';
import { AnimatedSection } from '../../src/components/Animation';
import { Typography } from '../../src/components/layout';
import { Container } from '../../src/components/layout/Container';
import { CustomButton } from '../../src/components/layout';
import { IconFromData } from '../../src/helper/IconFromData';


export default function ClientsPage() {

  return (
    <>
      

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section 
          aria-labelledby="hero-heading"
          className="bg-gradient-to-br from-teal-50 to-white py-12 px-3"
        >
          <Container>
            <AnimatedSection direction="up">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                {/* Left Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex gap-3" aria-label="Service tags">
                    <Typography 
                      as="span" 
                      size="sm" 
                      weight="semibold" 
                      className="bg-primary text-white px-4 py-2 rounded-full"
                    >
                      RCMS
                    </Typography>
                    <Typography 
                      as="span" 
                      size="sm" 
                      weight="semibold" 
                      className="bg-secondary text-white px-4 py-2 rounded-full"
                    >
                      Book a Process
                    </Typography>
                  </div>

                  <Typography as="h1" id="hero-heading" variant="h1" className="text-gray-900">
                    Healthcare Systems
                  </Typography>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    {heroParagraphs.map((text, idx) => (
                      <Typography key={idx} as="p" size="sm" className="text-gray-700 leading-relaxed">
                        {text}
                      </Typography>
                    ))}
                  </div>

                  <figure>
                    <img
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop"
                      alt="Healthcare professional reviewing medical records and billing documentation"
                      loading="lazy"
                      className="rounded-lg shadow-lg w-full mt-6"
                    />
                    <figcaption className="sr-only">
                      Healthcare professional managing medical billing and revenue cycle management
                    </figcaption>
                  </figure>
                </div>

                {/* Right Sidebar */}
                <aside className="w-full lg:w-80 space-y-4" aria-label="Client information and appointment">
                  <AnimatedSection direction="right">
                    <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary text-center">
                      {/* FIXED: Replaced Building2 with IconFromData */}
                      <IconFromData name="Building2" className="w-16 h-16 text-primary mx-auto mb-4" size={64} />
                      <Typography as="h2" variant="h5" weight="bold">
                        Our Clients
                      </Typography>
                      <Typography as="p" size="sm" className="text-gray-600 mt-2">
                        Trusted by healthcare systems nationwide
                      </Typography>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection direction="right" delay={100}>
                    <div 
                      className="bg-white rounded-lg shadow-md p-6 border-t-4 border-secondary space-y-3"
                      aria-label="Appointment form"
                    >
                      <Typography as="h3" variant="h5" weight="bold">
                        Make An Appointment
                      </Typography>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          {/* FIXED: Replaced Phone with IconFromData */}
                          <IconFromData name="Phone" className="w-4 h-4 text-secondary" size={16} />
                          <Typography as="span" size="sm">Phone Number</Typography>
                        </div>
                        <Typography as="p" size="sm" className="text-gray-600">
                          How can we help you today?
                        </Typography>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          {/* FIXED: Replaced Calendar with IconFromData */}
                          <IconFromData name="Calendar" className="w-4 h-4 text-secondary" size={16} />
                          <Typography as="span" size="sm">Medical Coding & Billing</Typography>
                        </div>
                        <Typography as="p" size="sm" className="text-gray-600">
                          Leave us a message and we'll get back to you
                        </Typography>
                      </div>

                      <CustomButton 
                        fullWidth
                        aria-label="Schedule an appointment"
                      >
                        Send Message
                      </CustomButton>
                    </div>
                  </AnimatedSection>
                </aside>
              </div>
            </AnimatedSection>
          </Container>
        </section>

        {/* Services Section */}
        <section 
          aria-labelledby="services-heading"
          className="py-16 bg-gray-50 px-3"
        >
          <Container>
            <AnimatedSection direction="up">
              <Typography as="h2" id="services-heading" variant="h3" weight="bold" align="center" className="mb-4">
                Medical Billing Services We Offer to Healthcare Systems
              </Typography>
              <Typography as="p" size="lg" align="center" className="mb-12 max-w-3xl mx-auto text-gray-600">
                We provide comprehensive Medical billing services so you as a healthcare system could focus on your key service - Excellence in Patient Care.
              </Typography>
            </AnimatedSection>

            <div 
              className="space-y-8"
              role="list"
              aria-label="Our medical billing services"
            >
              {services.map((service, index) => (
                <AnimatedSection key={index} direction="left" delay={index * 100}>
                  <article 
                    className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-secondary"
                    role="listitem"
                  >
                    <Typography as="h3" variant="h5" weight="bold" className="mb-3">
                      {service.title}
                    </Typography>
                    <Typography as="p" size="sm" className="text-gray-600 leading-relaxed">
                      {service.description}
                    </Typography>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>

        {/* RCM Steps Section */}
        <section aria-labelledby="rcm-heading" className="py-16 px-3">
          <Container>
            <AnimatedSection direction="up">
              <Typography as="h2" id="rcm-heading" variant="h3" weight="bold" align="center" className="mb-4">
                RCM in Medical Billing Healthcare System Revenue Cycle Management Process
              </Typography>
              <Typography as="p" size="sm" align="center" className="mb-12 max-w-4xl mx-auto text-gray-600">
                Revenue Cycle Management (RCM) is used in healthcare IT and for enhancement and is common processes right from the patient care appointment, when an individual first meets the medical billing services up to the final stage of payment...
              </Typography>
            </AnimatedSection>

            <div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              role="list"
              aria-label="RCM process steps"
            >
              {rcmSteps.map((step, index) => (
                <AnimatedSection key={index} direction="left" delay={index * 50}>
                  <div 
                    className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    role="listitem"
                  >
                    {/* FIXED: Replaced CheckCircle2 with IconFromData */}
                    <IconFromData name="CheckCircle2" className="w-5 h-5 text-secondary flex-shrink-0 mt-1" size={20} />
                    <Typography as="span" size="sm" className="text-gray-700">
                      {step}
                    </Typography>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>

        {/* Why Choose Section */}
        <section 
          aria-labelledby="why-choose-heading"
          className="py-16 bg-primary-deep text-white px-3"
        >
          <Container>
            <AnimatedSection direction="up">
              <Typography as="h2" id="why-choose-heading" variant="h3" weight="bold" align="center" className="mb-4 text-secondary">
                RCM Software's Right Medical Billing Supports
              </Typography>
              <Typography as="p" size="sm" align="center" className="mb-12 max-w-4xl mx-auto text-white/80">
                RCM provides an excellent benefit of Medical Billing Process. Every healthcare system software is designed to allow frameworks with electronic billing, receiving, and efficient coding.
              </Typography>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <div 
                className="rounded-lg p-8 backdrop-blur-sm bg-white/10"
                aria-label="Benefits of RCM software"
              >
                <Typography as="h3" variant="h4" weight="bold" className="mb-6 text-white">
                  Why Choose Right Medical Billing for Healthcare System Billing Services
                </Typography>
                <Typography as="p" size="sm" className="mb-6 text-white/80">
                  RCM allows a comprehensive range of Medical Billing features to keep the workplace sector of your healthcare organization efficient and profitable.
                </Typography>

                <div 
                  className="grid md:grid-cols-2 gap-4 mb-8"
                  role="list"
                  aria-label="Reasons to choose us"
                >
                  {whyChoose.map((item, index) => (
                    <div key={index} className="flex items-center gap-3" role="listitem">
                      {/* FIXED: Replaced CheckCircle2 with IconFromData */}
                      <IconFromData name="CheckCircle2" className="w-5 h-5 text-secondary flex-shrink-0" size={20} />
                      <Typography as="span" size="sm" className="text-white/90">
                        {item}
                      </Typography>
                    </div>
                  ))}
                </div>

                <Typography as="p" size="sm" className="text-white/80">
                  When you collaborate your healthcare system billing services to Right Medical Billing, you gain an organized and standardized set of features for better billing and coding practices.
                </Typography>
              </div>
            </AnimatedSection>
          </Container>
        </section>

        {/* Key Points Section */}
        <section aria-labelledby="key-points-heading" className="py-16 px-3">
          <Container>
            <AnimatedSection direction="up">
              <Typography as="h2" id="key-points-heading" variant="h3" weight="bold" align="center" className="mb-4">
                <span className="text-secondary">Key Points</span> That Makes Us Best Medical Billing Company
              </Typography>
            </AnimatedSection>

            <div 
              className="mt-12 space-y-3"
              role="list"
              aria-label="Key advantages"
            >
              {keyPoints.map((point, index) => (
                <AnimatedSection key={index} direction="left" delay={index * 50}>
                  <div 
                    className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border-l-4 border-secondary"
                    role="listitem"
                  >
                    {/* FIXED: Replaced CheckCircle2 with IconFromData */}
                    <IconFromData name="CheckCircle2" className="w-5 h-5 text-secondary flex-shrink-0 mt-1" size={20} />
                    <Typography as="span" size="sm" className="text-gray-700">
                      {point}
                    </Typography>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>

        {/* Get In Touch Section */}
        <section 
          aria-labelledby="contact-heading"
          className="py-16 px-3 bg-gradient-to-br from-primary-deep via-primary-dark to-primary text-white relative overflow-hidden"
        >
          <AnimatedSection direction="up">
            <Container>
              <div className="text-center relative z-10 space-y-6">
                <Typography as="h2" id="contact-heading" variant="h2" weight="bold" className="text-secondary">
                  Get In Touch
                </Typography>
                <Typography as="p" size="sm" className="opacity-90 text-white max-w-2xl mx-auto">
                  Right Medical Billing experts in United States bring customizable solutions with real experts. Contact us at{' '}
                  <a 
                    href="tel:+923087658325" 
                    className="underline font-semibold hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-1"
                    aria-label="Call us at +92 3087 658 325"
                  >
                    +92 3087 658 325
                  </a>{' '}
                  or{' '}
                  <a 
                    href="mailto:info@rightmedicalbilling.com" 
                    className="underline font-semibold hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-1"
                    aria-label="Email us at info@rightmedicalbilling.com"
                  >
                    info@rightmedicalbilling.com
                  </a>
                </Typography>
                <CustomButton 
                  aria-label="Schedule an appointment with our team"
                >
                  Schedule An Appointment
                </CustomButton>
              </div>
            </Container>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary opacity-10 rounded-tr-full" aria-hidden="true"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary opacity-10 rounded-bl-full" aria-hidden="true"></div>
          </AnimatedSection>
        </section>
      </div>
    </>
  );
}


