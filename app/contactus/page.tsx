'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import ContactUsPic from '../../src/assets/Hero/contactus.webp';
import { Container, Typography, CustomButton } from '../../src/components/layout';
import { SITE_CONFIG, localBusinessSchema } from '../../src/constants/seo';
import JsonLd from '../../src/components/JsonLd';

const contactWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Contact Us | MedocBills',
  description:
    'Contact MedocBills for professional medical billing services and healthcare revenue cycle management.',
  url: `${SITE_CONFIG.url}/contactus`,
  inLanguage: 'en-US',
};

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        countryCode: 'USA',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const validateForm = useCallback(() => {
        const { firstName, lastName, email, phoneNo, message } = formData;
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !phoneNo.trim() || !message.trim()) {
            toast.error('Please fill in all required fields.', {
              className: 'bg-red-50 text-red-700 border-red-200',
            });
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.', {
              className: 'bg-red-50 text-red-700 border-red-200',
            });
            return false;
        }
        const phoneRegex = /^[\d\s\-()+]{10,}$/;
        if (!phoneRegex.test(phoneNo)) {
            toast.error('Please enter a valid phone number.', {
              className: 'bg-red-50 text-red-700 border-red-200',
            });
            return false;
        }
        return true;
    }, [formData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: `${formData.countryCode} ${formData.phoneNo}`,
                    message: formData.message,
                }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Unable to send your message.');
            toast.success('Thank you! We will contact you shortly.', {
              className: 'bg-green-50 text-green-700 border-green-200',
            });
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNo: '',
                countryCode: 'USA',
                message: ''
            });
        } catch (submitError) {
            toast.error(submitError instanceof Error ? submitError.message : 'Network error! Please try again.', {
              className: 'bg-red-50 text-red-700 border-red-200',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = useMemo(() => [
        {
            icon: 'phone',
            label: 'Call Us',
            value: SITE_CONFIG.contact.phoneDisplay,
            href: SITE_CONFIG.contact.phoneE164,
            ariaLabel: 'Call our support team'
        },
        {
            icon: 'mail',
            label: 'Email Us',
            value: SITE_CONFIG.contact.email,
            href: `mailto:${SITE_CONFIG.contact.email}`,
            ariaLabel: 'Send us an email'
        },
        {
            icon: 'location',
            label: 'Visit Us',
            value: SITE_CONFIG.contact.address.full,
            href: null,
            ariaLabel: 'Our office location'
        },
    ], []);

    return (
        <>
            <section
                aria-labelledby="contact-heading"
                className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
                style={{ backgroundImage: `url(${ContactUsPic.src})` }}
            >

                <div className="absolute inset-0 bg-linear-to-br from-primary/90 to-secondary/90" aria-hidden="true"></div>

                <Container className="relative z-10 flex flex-col items-center justify-center py-16 text-center w-full">
                    <div className="mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <Typography as="h1" id="contact-heading" size="4xl" color="white" weight="bold" className="mb-2 text-center">
                            Get in Touch
                        </Typography>
                        <Typography as="p" size="lg" color="white/90" className="max-w-2xl mx-auto text-center">
                            Ready to optimize your medical billing? Contact our team of healthcare IT experts today.
                        </Typography>
                    </div>

                    <Container className="w-full md:w-[600px] py-6 px-3">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            noValidate
                            aria-label="Contact form"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: 'firstName', label: 'First name', placeholder: 'John', autoComplete: 'given-name' },
                                    { name: 'lastName', label: 'Last name', placeholder: 'Doe', autoComplete: 'family-name' },
                                ].map((field) => (
                                    <div key={field.name}>
                                        <Typography
                                            as="label"
                                            htmlFor={field.name}
                                            size="sm"
                                            weight="semibold"
                                            color="white"
                                            className="block mb-2"
                                        >
                                            {field.label} <span aria-hidden="true">*</span>
                                            <span className="sr-only">required</span>
                                        </Typography>
                                        <input
                                            required
                                            aria-required="true"
                                            onChange={handleChange}
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name as keyof typeof formData]}
                                            placeholder={field.placeholder}
                                            autoComplete={field.autoComplete}
                                            className="w-full px-4 py-3 rounded-md bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div>
                                <Typography as="label" htmlFor="email" size="sm" weight="semibold" color="white" className="block mb-2 rounded-md">
                                    Email Address <span aria-hidden="true">*</span>
                                    <span className="sr-only">required</span>
                                </Typography>
                                <input
                                    required
                                    aria-required="true"
                                    onChange={handleChange}
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="john.doe@example.com"
                                    autoComplete="email"
                                    className="w-full px-4 py-3 rounded-md bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                                />
                            </div>

                            <div>
                                <Typography as="label" htmlFor="phoneNo" size="sm" weight="semibold" color="white" className="block mb-2">
                                    Phone Number <span aria-hidden="true">*</span>
                                    <span className="sr-only">required</span>
                                </Typography>
                                <div className="flex items-center rounded-md bg-white/95 backdrop-blur-sm focus-within:ring-2 focus-within:ring-secondary transition duration-200">
                                    <select
                                        id="countryCode"
                                        name="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                        className="bg-transparent text-sm rounded-l-xl px-4 py-3 focus:outline-none cursor-pointer font-medium"
                                        aria-label="Select Country Code"
                                    >
                                        <option value="USA">USA (+1)</option>
                                        <option value="UK">UK (+44)</option>
                                        <option value="CA">CA (+1)</option>
                                        <option value="PAK">PAK (+92)</option>
                                    </select>
                                    <input
                                        required
                                        aria-required="true"
                                        onChange={handleChange}
                                        type="tel"
                                        id="phoneNo"
                                        name="phoneNo"
                                        value={formData.phoneNo}
                                        placeholder="(555) 123-4567"
                                        autoComplete="tel"
                                        className="w-full px-4 py-3 rounded-r-xl bg-transparent focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <Typography as="label" htmlFor="message" size="sm" weight="semibold" color="white" className="block mb-2">
                                    Your Message <span aria-hidden="true">*</span>
                                    <span className="sr-only">required</span>
                                </Typography>
                                <textarea
                                    required
                                    aria-required="true"
                                    onChange={handleChange}
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    placeholder="Tell us about your practice and how we can help..."
                                    className="w-full px-4 py-3 rounded-md bg-white/95 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                                ></textarea>
                            </div>

                            <CustomButton
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                                aria-label={isSubmitting ? "Sending message..." : "Send message"}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </CustomButton>
                        </form>

                        <Container
                            className="mt-10 pt-8 border-t border-white/30 grid grid-cols-1 md:grid-cols-3 gap-6 text-white text-center"
                            aria-label="Contact information"
                        >
                            {contactInfo.map((info, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-3">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d={
                                                    info.icon === 'phone'
                                                        ? 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                                                        : info.icon === 'mail'
                                                            ? 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z'
                                                            : 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                                                }
                                            />
                                        </svg>
                                    </div>
                                    <Typography as="p" size="base" weight="semibold" className="mb-1">
                                        {info.label}
                                    </Typography>
                                    {info.href ? (
                                        <a
                                            href={info.href}
                                            className="text-white/80 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-2 py-1"
                                            aria-label={info.ariaLabel}
                                        >
                                            {info.value}
                                        </a>
                                    ) : (
                                        <Typography as="p" size="sm" color="white/80">
                                            {info.value}
                                        </Typography>
                                    )}
                                </div>
                            ))}
                        </Container>
                    </Container>
                </Container>
            </section>

            <JsonLd data={localBusinessSchema} />
            <JsonLd data={contactWebPageSchema} />
        </>
    );
};

export default ContactUs;
