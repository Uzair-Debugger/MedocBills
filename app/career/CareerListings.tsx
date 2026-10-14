'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/src/constants/seo';
import { CustomButton, Typography } from '@/src/components/layout';
import { IconFromData } from '@/src/helper/IconFromData';
import { jobSchema } from '@/src/types/types';
import ApplicationForm from '@/src/components/ApplicationForm';

function isJob(value: unknown): value is jobSchema {
  if (typeof value !== 'object' || value === null) return false;

  return (
    'id' in value &&
    typeof value.id === 'number' &&
    'title' in value &&
    typeof value.title === 'string' &&
    'description' in value &&
    typeof value.description === 'string' &&
    'location' in value &&
    typeof value.location === 'string' &&
    'company_name' in value &&
    typeof value.company_name === 'string' &&
    'salary' in value &&
    (typeof value.salary === 'number' || typeof value.salary === 'string') &&
    'last_date' in value &&
    (typeof value.last_date === 'string' || value.last_date === null) &&
    'created_at' in value &&
    typeof value.created_at === 'string' &&
    'status' in value &&
    (value.status === 'OPEN' || value.status === 'CLOSED' || value.status === 'DRAFT')
  );
}

async function getJobs(): Promise<jobSchema[]> {
  const response = await fetch('/api/admin/jobs');
  if (!response.ok) throw new Error(`Job listings request failed with status ${response.status}.`);

  const data: unknown = await response.json();
  if (
    typeof data !== 'object' ||
    data === null ||
    !('jobs' in data) ||
    !Array.isArray(data.jobs) ||
    !data.jobs.every(isJob)
  ) {
    throw new Error('The job listings response was invalid.');
  }

  return data.jobs;
}

export default function CareerListings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<jobSchema[]>([]);
  const [selectedJob, setSelectedJob] = useState<jobSchema | null>(null);
  const [jobsState, setJobsState] = useState<'loading' | 'success' | 'error'>('loading');
  const [loadError, setLoadError] = useState('');

  const loadJobs = useCallback(async () => {
    try {
      setJobs(await getJobs());
      setJobsState('success');
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoadError('We couldn’t load job listings right now. Please try again.');
      setJobsState('error');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void getJobs().then(fetchedJobs => {
      if (cancelled) return;
      setJobs(fetchedJobs);
      setJobsState('success');
    }).catch(error => {
      if (cancelled) return;
      console.error('Error fetching jobs:', error);
      setLoadError('We couldn’t load job listings right now. Please try again.');
      setJobsState('error');
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const openJobs = useMemo(() => jobs.filter(job => job.status === 'OPEN'), [jobs]);
  const filteredJobs = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return openJobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.company_name.toLowerCase().includes(query)
    );
  }, [openJobs, searchTerm]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <>
      <div className="mt-6 max-w-xl">
        <label htmlFor="job-search" className="sr-only">Search open positions</label>
        <div className="relative">
          <input
            id="job-search"
            type="search"
            placeholder="Search open positions..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded-lg border-2 border-gray-300 bg-white px-6 py-4 text-gray-900 placeholder:text-gray-500 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <IconFromData
            name="Search"
            className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      {jobsState === 'loading' && (
        <div role="status" aria-live="polite" className="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
          Loading current openings…
        </div>
      )}
      {jobsState === 'error' && (
        <div role="alert" className="mt-8 rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-gray-800">{loadError}</p>
          <button
            type="button"
            onClick={() => {
              setLoadError('');
              setJobsState('loading');
              void loadJobs();
            }}
            className="mt-4 rounded-lg border border-primary px-5 py-3 font-semibold text-primary transition hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Try again
          </button>
        </div>
      )}
      {jobsState === 'success' && filteredJobs.length > 0 && (
        <>
          <p className="mt-2 text-sm text-gray-600" aria-live="polite">
            Showing {filteredJobs.length} of {openJobs.length} open {openJobs.length === 1 ? 'position' : 'positions'}.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Available job positions">
            {filteredJobs.map(job => (
              <article id={`job-${job.id}`} key={job.id} role="listitem" className="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                <Link href={`/career/${job.id}`} className="group block rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <Typography as="h3" variant="h5" weight="bold" color="primary-dark" className="mb-2 group-hover:text-primary">{job.title}</Typography>
                  <Typography as="p" size="sm" className="mb-4 text-secondary">{job.company_name}</Typography>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-start gap-2"><IconFromData name="MapPin" className="mt-0.5 h-4 w-4 shrink-0" size={16} />{job.location}</p>
                    <p className="flex items-center gap-2"><IconFromData name="Calendar" className="h-4 w-4 shrink-0" size={16} />Status: <strong>{job.status}</strong></p>
                  </div>
                </Link>
                <CustomButton type="button" onClick={() => setSelectedJob(job)} className="mt-6 border-t border-gray-100 bg-white pt-4 text-sm font-semibold text-primary hover:bg-white hover:text-primary-dark">
                  Apply Now
                </CustomButton>
              </article>
            ))}
          </div>
        </>
      )}
      {jobsState === 'success' && openJobs.length === 0 && (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">No active openings</p>
            <Typography as="h3" variant="h4" weight="bold" color="primary-dark" className="mt-2">
              Thank you for your interest in MedocBills
            </Typography>
            <p className="mt-4 leading-7 text-gray-700">
              There are no active positions listed right now. Check this page again for openings.
              To ask about possible future opportunities, contact{' '}
              <a href={`mailto:${SITE_CONFIG.contact.email}?subject=Career%20interest`} className="font-semibold text-primary underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-primary">
                {SITE_CONFIG.contact.email}
              </a>.
            </p>
          </div>
        </div>
      )}
      {jobsState === 'success' && openJobs.length > 0 && filteredJobs.length === 0 && (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-700">No open positions match “{searchTerm}”.</p>
          <button type="button" onClick={() => setSearchTerm('')} className="mt-4 rounded-lg border border-primary px-5 py-3 font-semibold text-primary transition hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Clear search
          </button>
        </div>
      )}
      {selectedJob && <ApplicationForm job={{ id: selectedJob.id, title: selectedJob.title }} onClose={() => setSelectedJob(null)} />}
    </>
  );
}
