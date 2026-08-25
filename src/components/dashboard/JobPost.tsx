'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { CustomButton } from '@/src/components/layout';

interface JobPostProps {
  onClose: () => void;
  onCreated: () => void;
  job?: import('@/src/types/types').jobSchema;
}

const inputClassName =
  'mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20';

export default function JobPost({ onClose, onCreated, job }: JobPostProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(job ? `/api/admin/jobs/${job.id}` : '/api/admin/jobs', {
        method: job ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Unable to create this job post.');
      }

      toast.success(job ? 'Job post updated successfully.' : 'Job post created successfully.', {
        className: 'bg-green-50 text-green-700 border-green-200',
      });
      onCreated();
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Unable to create this job post.';
      toast.error(message, {
        className: 'bg-red-50 text-red-700 border-red-200',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4 backdrop-blur-sm">
      <div className="max-h-[min(760px,calc(100vh-2rem))] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              {job ? 'Edit listing' : 'New listing'}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {job ? 'Edit job post' : 'Create a job post'}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Add the details candidates need to decide if this role is right for them.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close job post form"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2 text-sm font-semibold text-gray-700">
              Job title
              <input name="title" defaultValue={job?.title} required maxLength={120} className={inputClassName} placeholder="e.g. Senior Registered Nurse" />
            </label>

            <label className="text-sm font-semibold text-gray-700">
              Company name
              <input name="companyName" defaultValue="Medocbills Healthcare Solution" readOnly maxLength={120} className={inputClassName} />
            </label>

            <label className="text-sm font-semibold text-gray-700">
              Location
              <input name="location" defaultValue={job?.location} required maxLength={120} className={inputClassName} placeholder="e.g. Lahore, Pakistan" />
            </label>

            <label className="text-sm font-semibold text-gray-700">
              Annual salary
              <input name="salary" defaultValue={job?.salary} required type="number" min="0.01" step="0.01" className={inputClassName} placeholder="e.g. 85000" />
            </label>

            <label className="text-sm font-semibold text-gray-700">
              Publishing status
              <select name="status" defaultValue={job?.status ?? 'OPEN'} className={inputClassName}>
                <option value="DRAFT">Draft</option>
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
              </select>
            </label>
          </div>

          <label className="block text-sm font-semibold text-gray-700">
            Application deadline
            <input name="lastDate" defaultValue={job?.last_date ? new Date(job.last_date).toISOString().slice(0, 16) : ''} type="datetime-local" className={inputClassName} />
          </label>

          <label className="block text-sm font-semibold text-gray-700">
            Job description
            <textarea
              name="description" defaultValue={job?.description}
              required
              minLength={20}
              rows={6}
              className={`${inputClassName} resize-y`}
              placeholder="Describe the responsibilities, requirements, and what makes this opportunity worthwhile."
            />
          </label>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <CustomButton type="button" variant="outline" onClick={onClose}>
              Cancel
            </CustomButton>
            <CustomButton type="submit" disabled={isSubmitting} className="min-w-36">
              {isSubmitting ? 'Saving...' : job ? 'Save changes' : 'Publish job'}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}