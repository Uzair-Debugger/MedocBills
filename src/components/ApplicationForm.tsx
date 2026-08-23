'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import type { ApplicationJob } from '@/src/types/types';

interface ApplicationFormProps {
    job: ApplicationJob;
    onClose: () => void;
}

const inputClassName =
    'mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20';

export default function ApplicationForm({ job, onClose }: ApplicationFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/applications', {
                method: 'POST',
                body: new FormData(form),
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Unable to submit your application.');
            }

            toast.success('Your application was submitted successfully.', {
              className: 'bg-green-50 text-green-700 border-green-200',
            });
            form.reset();
            onClose();
        } catch (submitError) {
            const message = submitError instanceof Error ? submitError.message : 'Unable to submit your application.';
            toast.error(message, {
              className: 'bg-red-50 text-red-700 border-red-200',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4 backdrop-blur-sm">
            <div className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Job application</p>
                        <h2 className="mt-1 text-2xl font-bold text-gray-900">{job.title}</h2>
                        <p className="mt-1 text-sm text-gray-500">Share your details and CV with our hiring team.</p>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close application form" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-gray-400 transition hover:bg-gray-100 hover:text-gray-700">
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-8">
                    <input type="hidden" name="jobPostId" value={job.id} />
                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="text-sm font-semibold text-gray-700">
                            Full name
                            <input name="applicantName" required maxLength={120} className={inputClassName} autoComplete="name" />
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                            Email address
                            <input name="applicantEmail" required type="email" maxLength={254} className={inputClassName} autoComplete="email" />
                        </label>
                        <label className="text-sm font-semibold text-gray-700 sm:col-span-2">
                            Phone number
                            <input name="applicantPhone" required type="tel" maxLength={30} className={inputClassName} autoComplete="tel" />
                        </label>
                    </div>

                    <label className="block text-sm font-semibold text-gray-700">
                        CV / Resume (PDF, DOC, or DOCX; max 5 MB)
                        <input name="resume" required type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className={`${inputClassName} file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white`} />
                    </label>

                    <label className="block text-sm font-semibold text-gray-700">
                        Cover letter (optional, max 5 MB)
                        <input name="coverLetter" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className={`${inputClassName} file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white`} />
                    </label>

                    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                        <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60">
                            {isSubmitting ? 'Submitting...' : 'Submit application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
