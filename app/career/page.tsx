'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { SITE_CONFIG, jobPostingSchema } from '../../src/constants/seo';
import JsonLd from '../../src/components/JsonLd';
import { Container, CustomButton, Typography } from '../../src/components/layout';
import { IconFromData } from '../../src/helper/IconFromData';
import { sectionBase } from '../../src/theme/classes';
import { jobSchema } from '@/src/types/types';
import ApplicationForm from '@/src/components/ApplicationForm';

const careerWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Careers | MedocBills',
  description:
    'Join MedocBills\' team of healthcare billing experts. Explore career opportunities in medical billing, coding, and healthcare revenue cycle management.',
  url: `${SITE_CONFIG.url}/career`,
  inLanguage: 'en-US',
};

const getJobs = async () => {
  try {
    const response = await fetch('/api/admin/jobs');

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const data = await response.json();

    console.log('API response:', data);
    console.log('Jobs from API:', data.jobs);

    return data.jobs || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export default function CareerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<jobSchema[]>([]);
  const [selectedJob, setSelectedJob] = useState<jobSchema | null>(null);

  useEffect(() => {
    async function loadJobs() {
      setJobs(await getJobs());
    }

    void loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return jobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.company_name.toLowerCase().includes(query)
    );
  }, [jobs, searchTerm]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <section aria-labelledby="careers-heading" className="bg-linear-to-br from-primary-deep via-primary-dark to-primary px-6 py-24 text-white">
          <Container size="md" className="text-center">
            <Typography as="h1" id="careers-heading" variant="h1" weight="bold" color="inherit" className="mb-4 leading-tight">
              Invest in your career,<br /><span className="text-secondary">Grow</span> with tech's top talent.
            </Typography>
            <Typography as="p" className="mx-auto mt-4 max-w-2xl text-white/90">
              Join our team of healthcare billing experts and help us revolutionize revenue cycle management.
            </Typography>
            <div className="mx-auto mt-8 max-w-xl">
              <label htmlFor="job-search" className="sr-only">Search jobs</label>
              <div className="relative">
                <input id="job-search" type="search" placeholder="Search jobs..." value={searchTerm} onChange={handleSearchChange} className="w-full rounded-lg border-2 px-6 py-4 focus:outline-none" />
                <IconFromData name="Search" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </Container>
        </section>

        <section aria-labelledby="jobs-heading" className={sectionBase}>
          <Container className="max-w-7xl">
            <Typography as="span" id="jobs-heading" size="sm" weight="semibold" className="inline-block rounded bg-primary px-6 py-2 text-white" aria-live="polite">
              Jobs Available: {filteredJobs.length}
            </Typography>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Available job positions">
              {filteredJobs.map(job => (
                <article key={job.id} role="listitem" className="group rounded-lg border-2 border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                  <Typography as="h2" variant="h5" weight="bold" className="mb-2 text-gray-900">{job.title}</Typography>
                  <Typography as="p" size="sm" className="mb-4 text-secondary">{job.company_name}</Typography>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-start gap-2"><IconFromData name="MapPin" className="mt-0.5 h-4 w-4 shrink-0" size={16} />{job.location}</p>
                    <p className="flex items-center gap-2"><IconFromData name="Calendar" className="h-4 w-4 shrink-0" size={16} />Status: <strong>{job.status}</strong></p>
                  </div>
                  <CustomButton type="button" onClick={() => setSelectedJob(job)} className="mt-6 bg-white hover:bg-white border-t border-gray-100 pt-4 text-sm font-semibold text-primary hover:text-primary-dark">
                    Apply Now
                  </CustomButton>
                </article>
              ))}
            </div>
            {filteredJobs.length === 0 && <Typography as="p" size="lg" className="py-12 text-center text-gray-500">No jobs found matching your search.</Typography>}
          </Container>
        </section>
      </main>
      <JsonLd data={jobPostingSchema} />
      <JsonLd data={careerWebPageSchema} />
      {selectedJob && <ApplicationForm job={{ id: selectedJob.id, title: selectedJob.title }} onClose={() => setSelectedJob(null)} />}
    </>
  );
}


