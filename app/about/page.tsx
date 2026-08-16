'use client';

import React from 'react';
import { pillars, stats, solutions } from '../../src/constants/data';
import { SITE_CONFIG, organizationSchema as orgSchema } from '../../src/constants/seo';
import JsonLd from '../../src/components/JsonLd';
import AnimatedSection from '../../src/components/AnimatedSection';
import AnimatedCard from '../../src/components/AnimatedCard';
import { Container, Typography, CustomButton } from '../../src/components/layout';
import { mergeClass } from '../../src/utils/classUtils';
import { sectionBase } from '../../src/theme/classes';
import { IconFromData } from '../../src/helper/IconFromData';

const aboutWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'About Us | MEDOCBILLS LLC',
  description:
    'MEDOCBILLS LLC is a premier provider of comprehensive healthcare revenue cycle management, medical billing, and digital marketing services.',
  url: `${SITE_CONFIG.url}/about`,
  inLanguage: 'en-US',
};

export default function AboutUs() {

  return (
    <>


      <main className="min-h-screen bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section
          aria-labelledby="about-heading"
          className="bg-linear-to-br from-primary-deep via-primary-dark to-primary text-white py-20 px-6"
        >
          <Container className="max-w-4xl text-center">
            <AnimatedSection direction="up">
              <Typography
                as="h1"
                id="about-heading"
                variant="h1"
                weight="bold"
                className="mb-6 text-secondary text-center"
              >
                About MEDOCBILLS LLC: Your Partner in Business Growth
              </Typography>
              <Typography as="p" size="sm" className="leading-relaxed text-white/90">
                MEDOCBILLS LLC is a premier provider of comprehensive business solutions, specializing in Business Process Outsourcing (BPO), expert healthcare revenue cycle management (RCM), and results-driven digital marketing services.
                Established in 2025, MEDOCBILLS LLC was founded on the principle of helping businesses especially in the complex healthcare sector to not just survive, but grow and thrive in the digital age. Our dedicated team of experienced and passionate professionals is committed to delivering the highest level of service and support, ensuring our clients overcome operational challenges and achieve their strategic goals.
              </Typography>
            </AnimatedSection>
          </Container>
        </section>

        {/* Leadership Section */}
        <section
          aria-labelledby="leadership-heading"
          className={mergeClass(sectionBase, 'bg-gray-50')}
        >
          <Container className="max-w-6xl">
            <AnimatedSection direction="left">
              <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-lg shadow-sm">
                <div className="w-48 h-48 bg-linear-to-br from-secondary to-secondary-dark rounded-lg shrink-0 flex items-center justify-center">
                  {/* FIXED: Replaced Users with IconFromData */}
                  <IconFromData name="Users" className="w-24 h-24 text-white" size={96} />
                </div>
                <div className="flex-1">
                  <Typography as="h2" id="leadership-heading" variant="h3" weight="bold" className="mb-4">
                    Leadership <span className="text-secondary">Perspective</span>
                  </Typography>
                  <Typography as="p" size="sm" className="text-gray-600 leading-relaxed mb-4">
                    <strong className="font-semibold">A Message from Our Founder & CEO!</strong><br />
                    At MedocBills LLC, we firmly believe that every organization holds immense potential for success. That&apos;s why we are dedicated to providing the highest quality outsourced business services, backed by a team of skilled and passionate experts. We specialize in solutions ranging from cutting-edge medical billing and RCM to impactful digital marketing and branding. Our core values — Innovation, Efficiency, and Customer Satisfaction — guide everything we do. We are proud that our clients trust us to manage their critical, non-core tasks, enabling them to focus on their core competencies and patient care. Our ultimate goal is to reduce your workload and deliver outstanding outcomes that consistently exceed your expectations.
                  </Typography>
                  <Typography as="p" weight="semibold" className="text-gray-800">
                    Muhammad Younas Khan, Founder & CEO, MEDOCBILLS LLC
                  </Typography>
                </div>
              </div>
            </AnimatedSection>
          </Container>
        </section>

        {/* Three Pillars Section */}
        <section aria-labelledby="pillars-heading" className={sectionBase}>
          <Container className="max-w-6xl">
            <AnimatedSection direction="up">
              <Typography as="h2" id="pillars-heading" variant="h3" weight="bold" align="center" className="mb-4">
                The Three Core Pillars of <span className="text-secondary">MEDOCBILLS</span>
              </Typography>
              <Typography as="p" size="sm" align="center" className="text-gray-600 mb-12 max-w-3xl mx-auto">
                At MEDOCBILLS LLC, our success and the success of our clients are built on three guiding principles:
              </Typography>
            </AnimatedSection>

            <div
              className="grid md:grid-cols-3 gap-8"
              role="list"
              aria-label="Our core pillars"
            >
              {pillars.map((pillar, idx) => (
                <AnimatedCard key={idx} direction="left" delay={idx * 200}>
                  <article className="text-center" role="listitem">
                    <div className={mergeClass('w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center', pillar.gradient)}>
                      {/* FIXED: Using IconFromData for pillar icons (pillar.icon is now a string) */}
                      <IconFromData name={pillar.icon as string} className="w-8 h-8 text-white" size={32} />
                    </div>
                    <Typography as="h3" variant="h5" weight="bold" className="mb-3">{pillar.title}</Typography>
                    <Typography as="p" size="sm" className="text-gray-600 leading-relaxed">{pillar.text}</Typography>
                  </article>
                </AnimatedCard>
              ))}
            </div>
          </Container>
        </section>

        {/* Stats Section */}
        <section
          aria-labelledby="stats-heading"
          className={mergeClass(sectionBase, 'bg-linear-to-br from-primary-deep via-primary-dark to-primary text-white')}
        >
          <Container className="max-w-6xl">
            <AnimatedSection direction="up">
              <Typography as="h2" id="stats-heading" variant="h3" weight="bold" align="center" className="mb-12 text-secondary">
                What Sets Us Apart?
              </Typography>
            </AnimatedSection>

            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
              role="list"
              aria-label="Company statistics"
            >
              {stats.map((stat, idx) => (
                <AnimatedCard key={idx} direction="left" delay={idx * 100}>
                  <div className="text-center" role="listitem">
                    <Typography as="div" variant="h2" weight="bold" className="mb-2">
                      {stat.number}
                    </Typography>
                    <Typography as="div" size="sm" className="opacity-80">
                      {stat.label}
                    </Typography>
                    <span className="sr-only">{stat.description}</span>
                  </div>
                </AnimatedCard>
              ))}
            </div>

            <AnimatedSection direction="up">
              <Typography as="p" size="sm" align="center" className="text-white">
                What works best for you? <a href="/contact" className="underline hover:text-secondary transition-colors">Explore More</a>
              </Typography>
            </AnimatedSection>
          </Container>
        </section>

        {/* Solutions Section */}
        <section aria-labelledby="solutions-heading" className={sectionBase}>
          <Container className="max-w-6xl">
            <AnimatedSection direction="up">
              <Typography as="h2" id="solutions-heading" variant="h3" weight="bold" align="center" className="mb-4">
                Our Customized <span className="text-secondary">Solutions</span>
              </Typography>
              <Typography as="p" size="sm" align="center" className="text-gray-600 mb-12 max-w-4xl mx-auto">
                MEDOCBILLS LLC is your dedicated partner in growth. We specialize in providing top-notch Business Process Outsourcing (BPO) services, including expert medical billing, claims management, and healthcare solutions, alongside effective digital marketing strategies.
              </Typography>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <div
                className="grid md:grid-cols-3 gap-8 mb-12 text-center"
                role="list"
                aria-label="Solution categories"
              >
                {['BPO', 'Health Care', 'Digital Marketing'].map((item, idx) => (
                  <Typography
                    key={idx}
                    as="h3"
                    variant="h5"
                    weight="bold"
                    className={mergeClass(idx === 0 ? 'text-secondary' : '')}
                    role="listitem"
                  >
                    {item}
                  </Typography>
                ))}
              </div>
            </AnimatedSection>

            <div
              className="grid md:grid-cols-2 gap-8"
              role="list"
              aria-label="Our services"
            >
              {solutions.map((solution, idx) => (
                <AnimatedCard key={idx} direction={idx % 2 === 0 ? 'left' : 'right'} delay={0}>
                  <article className="bg-white p-6 rounded-lg shadow-sm" role="listitem">
                    <div className={mergeClass('w-16 h-16 rounded-lg mb-4 flex items-center justify-center bg-linear-to-br', solution.gradient)}>
                      {/* FIXED: Using IconFromData for solution icons (solution.icon is now a string) */}
                      <IconFromData name={solution.icon as string} className="w-8 h-8 text-white" size={32} />
                    </div>
                    <Typography as="h3" variant="h5" weight="bold" className="mb-3">{solution.title}</Typography>
                    <Typography as="p" size="sm" className="text-gray-600 mb-4">{solution.text}</Typography>
                    <a
                      href="/services"
                      className="text-secondary text-sm font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-secondary rounded-lg px-2 py-1 inline-block"
                      aria-label={`Learn more about ${solution.title}`}
                    >
                      Read More →
                    </a>
                  </article>
                </AnimatedCard>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section
          aria-labelledby="cta-heading"
          className={mergeClass(sectionBase, 'bg-gray-900 text-white relative overflow-hidden')}
        >
          <Container className="max-w-4xl text-center relative z-10">
            <AnimatedSection direction="up">
              <Typography as="h2" id="cta-heading" variant="h3" weight="bold" className="mb-8">
                READY TO START YOUR PROJECT
              </Typography>
              <CustomButton
                className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Start your project with MedocBills"
              >
                Let&apos;s Start Together →
              </CustomButton>
            </AnimatedSection>

            {/* Decorative elements */}
            <div className="absolute -z-10 bottom-0 left-0 w-32 h-32 bg-secondary opacity-20 rounded-tr-full" aria-hidden="true"></div>
            <div className="absolute -z-10 bottom-0 right-0 w-32 h-32 bg-secondary opacity-20 rounded-tl-full" aria-hidden="true"></div>
          </Container>
        </section>
      </main>
      <JsonLd data={orgSchema} />
      <JsonLd data={aboutWebPageSchema} />
    </>
  );
}


