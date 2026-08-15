'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { jobs } from '../../src/constants/data';
import { Container, Typography } from '../../src/components/layout';
import { jobPostingSchema } from '../../src/constants/data';
import { IconFromData } from '../../src/helper/IconFromData';


export default function CareerPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // âœ… memoized filtering (performance)
  const filteredJobs = useMemo(() => {
    return jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);


  return (
    <>
      

      <section className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section 
          aria-labelledby="careers-heading"
          className="bg-gradient-to-br from-primary-deep via-primary-dark to-primary text-white py-24 px-6"
        >
          <Container size="md" className="text-center">
            <Typography
              as="h1"
              id="careers-heading"
              variant="h1"
              weight="bold"
              color="inherit"
              className="mb-4 leading-tight"
            >
              Invest in your career,<br />
              <span className="text-secondary">Grow</span> with tech's top talent.
            </Typography>

            <Typography as="p" className="text-white/90 mt-4 max-w-2xl mx-auto">
              Join our team of healthcare billing experts and help us revolutionize revenue cycle management
            </Typography>

            {/* Search Input */}
            <div className="mt-8 max-w-xl mx-auto">
              <label htmlFor="job-search" className="sr-only">
                Search Jobs
              </label>

              <div className="relative">
                <input
                  id="job-search"
                  type="text"
                  placeholder="Search Job Here..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 text-gray-900"
                  aria-label="Search jobs by title or category"
                  autoComplete="off"
                />

                {/* FIXED: Replaced Search with IconFromData */}
                <IconFromData
                  name="Search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
                  size={20}
                />
              </div>
              
              <Typography as="p" className="text-white/70 text-sm mt-2 text-left">
                Try searching by job title or category (e.g., "Billing", "Management")
              </Typography>
            </div>
          </Container>
        </section>

        {/* Jobs Section */}
        <section 
          aria-labelledby="jobs-heading"
          className="py-12 px-6"
        >
          <Container className="max-w-7xl">
            {/* Jobs Count */}
            <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
              <div>
                <Typography
                  as="span"
                  id="jobs-heading"
                  size="sm"
                  weight="semibold"
                  className="inline-block bg-primary text-white px-6 py-2 rounded"
                  aria-live="polite"
                >
                  Jobs Available: {filteredJobs.length}
                </Typography>
              </div>
              
              {searchTerm && filteredJobs.length > 0 && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-primary hover:text-primary-dark text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-3 py-1"
                  aria-label="Clear search"
                >
                  Clear Search
                </button>
              )}
            </div>

            {/* Jobs Grid */}
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
              aria-label="Available job positions"
            >
              {filteredJobs.map((job) => (
                <article
                  key={job.id}
                  role="listitem"
                  className="group border-2 border-gray-200 rounded-lg p-6 cursor-pointer bg-white hover:scale-105 hover:bg-gradient-to-br hover:from-primary-dark hover:to-primary-deep hover:border-primary hover:shadow-2xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      // Handle job application navigation
                      window.location.href = `/careers/${job.id}`;
                    }
                  }}
                  onClick={() => {
                    // Navigate to job details
                    window.location.href = `/careers/${job.id}`;
                  }}
                >
                  <Typography
                    as="h2"
                    variant="h5"
                    weight="bold"
                    className="mb-2 text-gray-900 group-hover:text-white transition-colors duration-300"
                  >
                    {job.title}
                  </Typography>

                  <div className="mb-4">
                    <Typography
                      as="span"
                      size="sm"
                      className="inline-block bg-secondary/10 text-secondary group-hover:bg-white/20 group-hover:text-white px-3 py-1 rounded-full transition-colors duration-300"
                    >
                      {job.category}
                    </Typography>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm text-gray-700 group-hover:text-gray-200 transition-colors duration-300">
                      {/* FIXED: Replaced MapPin with IconFromData */}
                      <IconFromData name="MapPin" className="w-4 h-4 mt-0.5 flex-shrink-0" size={16} />
                      <span>{job.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      {/* FIXED: Replaced Calendar with IconFromData */}
                      <IconFromData name="Calendar" className="w-4 h-4 flex-shrink-0" size={16} />
                      
                      <Typography
                        as="span"
                        size="sm"
                        className="text-gray-700 group-hover:text-gray-200"
                      >
                        Last Date:
                      </Typography>

                      <Typography
                        as="span"
                        size="sm"
                        weight="semibold"
                        className="text-red-600 group-hover:text-red-300"
                        aria-label={`Application deadline: ${job.lastDate}`}
                      >
                        {job.lastDate}
                      </Typography>
                    </div>
                  </div>

                  {/* Apply button for better CTA */}
                  <div className="mt-4 pt-4 border-t border-gray-100 group-hover:border-white/20 transition-colors">
                    <Typography
                      as="span"
                      size="sm"
                      weight="semibold"
                      className="text-primary group-hover:text-white transition-colors"
                    >
                      Apply Now â†’
                    </Typography>
                  </div>
                </article>
              ))}
            </div>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <div 
                className="text-center py-12"
                role="status"
                aria-live="polite"
              >
                <Typography as="p" size="lg" className="text-gray-500 mb-2">
                  No jobs found matching your search.
                </Typography>
                <Typography as="p" size="sm" className="text-gray-400">
                  Try adjusting your search terms or browse all available positions.
                </Typography>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-primary hover:text-primary-dark font-semibold focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-4 py-2"
                    aria-label="Clear search to see all jobs"
                  >
                    View all jobs
                  </button>
                )}
              </div>
            )}
          </Container>
        </section>

        {/* Why Join Us Section - Added for better content */}
        <section aria-labelledby="why-join-heading" className="py-16 px-6 bg-white">
          <Container className="max-w-6xl">
            <Typography as="h2" id="why-join-heading" variant="h2" weight="bold" className="text-center mb-12">
              Why Join <span className="text-secondary">MedocBills?</span>
            </Typography>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Growth Opportunities",
                  description: "Continuous learning and career advancement in healthcare technology"
                },
                {
                  title: "Competitive Benefits",
                  description: "Comprehensive health benefits and competitive compensation packages"
                },
                {
                  title: "Innovative Culture",
                  description: "Work with cutting-edge RCM technology and modern practices"
                }
              ].map((benefit, idx) => (
                <div key={idx} className="text-center p-6 bg-gray-50 rounded-lg">
                  <Typography as="h3" variant="h5" weight="bold" className="mb-3">
                    {benefit.title}
                  </Typography>
                  <Typography as="p" size="sm" className="text-gray-600">
                    {benefit.description}
                  </Typography>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </section>
    </>
  );
}


