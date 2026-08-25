'use client';

import { useCallback, useEffect, useState } from 'react';
import JobPost from '@/src/components/dashboard/JobPost';
import { CustomButton } from '@/src/components/layout';
import { RefreshCcwIcon } from 'lucide-react';
import { JobStatus, jobSchema } from '@/src/types/types';

function statusClasses(status: JobStatus) {
    if (status === 'OPEN') return 'bg-teal-50 text-secondary';
    if (status === 'CLOSED') return 'bg-red-50 text-red-700';
    return 'bg-amber-50 text-amber-700';
}

export default function JobsPage() {
    const [postNewJob, setPostNewJob] = useState(false);
    const [editingJob, setEditingJob] = useState<jobSchema | null>(null);
    const [jobs, setJobs] = useState<jobSchema[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    async function deleteJob(job: jobSchema) {
        if (!window.confirm(`Delete ${job.title}?`)) return;
        try {
            const response = await fetch(`/api/admin/jobs/${job.id}`, { method: 'DELETE' });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Unable to delete job post.');
            setJobs(current => current.filter(item => item.id !== job.id));
        } catch (deleteError) {
            setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete job post.');
        }
    }

    const getJobs = useCallback(async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/admin/jobs');
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Unable to load job posts.');
            }

            setJobs(data.jobs ?? []);
        } catch (fetchError) {
            setError(fetchError instanceof Error ? fetchError.message : 'Unable to load job posts.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        async function loadJobs() {
            await getJobs();
        }

        void loadJobs();
    }, [getJobs]);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <section className="relative overflow-hidden rounded-2xl bg-primary px-6 py-8 text-white shadow-lg sm:px-8">
                    <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Recruitment workspace</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Job posts</h1>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">Create, publish, and keep track of your healthcare opportunities.</p>
                        </div>
                        <CustomButton onClick={() => setPostNewJob(true)} className="bg-secondary-accent text-white hover:bg-secondary">
                            + Add New Job
                        </CustomButton>
                    </div>
                    <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border-[24px] border-white/10" aria-hidden="true" />
                </section>

                <div className="mt-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Your listings</h2>
                        <p className="mt-1 text-sm text-gray-500">{jobs.length} {jobs.length === 1 ? 'listing' : 'listings'} in your workspace</p>
                    </div>
                    <button type="button" onClick={() => void getJobs()} className=" text-sm font-semibold text-secondary transition hover:text-primary"><RefreshCcwIcon size={20} /></button>
                </div>

                {isLoading ? (
                    <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading job posts">
                        {[1, 2, 3].map((item) => <div key={item} className="h-56 animate-pulse rounded-xl bg-white shadow-sm" />)}
                    </div>
                ) : error ? (
                    <div role="alert" className="mt-5 rounded-xl border border-red-100 bg-red-50 p-6 text-sm text-red-700">{error}</div>
                ) : jobs.length > 0 ? (
                    <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => (
                            <article key={job.id} className="group flex min-h-56 flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-secondary/30 hover:shadow-lg">
                                <div className="flex items-start justify-between gap-4">
                                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClasses(job.status)}`}>{job.status}</span>
                                    <div className="flex items-center gap-3"><button type="button" onClick={() => setEditingJob(job)} className="text-xs font-semibold text-secondary hover:underline">Edit</button><button type="button" onClick={() => void deleteJob(job)} className="text-xs font-semibold text-red-600 hover:underline">Delete</button><span className="text-xs text-gray-400">#{job.id}</span></div>
                                </div>
                                <h3 className="mt-5 text-xl font-bold text-gray-900 group-hover:text-primary">{job.title}</h3>
                                <p className="mt-1 text-sm font-medium text-secondary">{job.company_name}</p>
                                <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">{job.description}</p>
                                <div className="mt-auto flex items-end justify-between gap-4 border-t border-gray-100 pt-5">
                                    <div><p className="text-xs uppercase tracking-wide text-gray-400">Salary</p><p className="mt-1 font-bold text-gray-900">${Number(job.salary).toLocaleString()}</p></div>
                                    <div className="text-right"><p className="text-xs uppercase tracking-wide text-gray-400">Deadline</p><p className="mt-1 text-sm text-gray-600">{job.last_date ? new Date(job.last_date).toLocaleDateString() : 'No deadline'}</p></div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="mt-5 flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-secondary/30 bg-white px-6 text-center shadow-sm">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-light text-2xl text-secondary">+</div>
                        <h2 className="mt-5 text-xl font-bold text-gray-900">No jobs posted yet</h2>
                        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">Add your first job listing to start attracting qualified candidates.</p>
                        <CustomButton onClick={() => setPostNewJob(true)} size="sm" className="mt-5">Create first job</CustomButton>
                    </div>
                )}
            </div>

            {postNewJob && <JobPost onClose={() => setPostNewJob(false)} onCreated={() => { setPostNewJob(false); void getJobs(); }} />}
            {editingJob && <JobPost job={editingJob} onClose={() => setEditingJob(null)} onCreated={() => { setEditingJob(null); void getJobs(); }} />}
        </main>
    );
}
