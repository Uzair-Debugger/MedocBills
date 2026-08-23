'use client';

import { useCallback, useEffect, useState } from 'react';
import { RefreshCcwIcon } from 'lucide-react';
import type { ApplicationRecord } from '@/src/types/types';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadApplications = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/applications');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to load applications.');
      setApplications(data.applications ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load applications.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    async function loadInitialApplications() {
      await loadApplications();
    }

    void loadInitialApplications();
  }, [loadApplications]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl bg-primary px-6 py-8 text-white shadow-lg sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Recruitment workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Applications</h1>
          <p className="mt-2 text-sm leading-6 text-white/80">Review candidates who applied to your job listings.</p>
        </section>

        <div className="mt-8 flex items-center justify-between">
          <div><h2 className="text-xl font-bold text-gray-900">Candidate submissions</h2><p className="mt-1 text-sm text-gray-500">{applications.length} {applications.length === 1 ? 'application' : 'applications'}</p></div>
          <button type="button" onClick={() => void loadApplications()} aria-label="Refresh applications" className="text-secondary transition hover:text-primary"><RefreshCcwIcon size={20} /></button>
        </div>

        {isLoading ? <div className="mt-5 h-64 animate-pulse rounded-xl bg-white shadow-sm" aria-label="Loading applications" /> : error ? <div role="alert" className="mt-5 rounded-xl border border-red-100 bg-red-50 p-6 text-sm text-red-700">{error}</div> : applications.length === 0 ? <div className="mt-5 rounded-xl border border-dashed border-secondary/30 bg-white p-12 text-center text-sm text-gray-500">No applications have been submitted yet.</div> : (
          <div className="mt-5 overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-195 text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-5 py-4">Candidate</th><th className="px-5 py-4">Position</th><th className="px-5 py-4">Contact</th><th className="px-5 py-4">Documents</th><th className="px-5 py-4">Status</th></tr></thead>
              <tbody className="divide-y divide-gray-100">{applications.map(application => <tr key={application.id} className="align-top hover:bg-gray-50/70">
                <td className="px-5 py-5"><p className="font-semibold text-gray-900">{application.applicant_name}</p><p className="mt-1 text-xs text-gray-500">Applied {new Date(application.created_at).toLocaleDateString()}</p></td>
                <td className="px-5 py-5 text-gray-700">{application.job_post.title}</td>
                <td className="px-5 py-5"><a href={`mailto:${application.applicant_email}`} className="text-secondary hover:underline">{application.applicant_email}</a><p className="mt-1 text-gray-600">{application.applicant_phone}</p></td>
                <td className="space-y-2 px-5 py-5"><a href={application.resume_url} target="_blank" rel="noreferrer" className="block font-semibold text-secondary hover:underline">View resume</a>{application.coverletter_url && <a href={application.coverletter_url} target="_blank" rel="noreferrer" className="block font-semibold text-secondary hover:underline">View cover letter</a>}</td>
                <td className="px-5 py-5"><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{application.status}</span></td>
              </tr>)}</tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}