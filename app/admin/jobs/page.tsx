'use client'
import JobPost from "@/src/components/dashboard/JobPost";
import { CustomButton } from "@/src/components/layout";
import { useState } from "react";

export default function JobsPage() {
  const [postNewJob, setPostNewJob] = useState<boolean>(false)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Job Posts
            </h1>
            <p className="mt-1 text-gray-600">
              Create and manage your job listings.
            </p>
          </div>

          <CustomButton
            onClick={() => setPostNewJob(true)}
            className="bg-secondary-accent">
            + Add New Job
          </CustomButton>
        </div>

        {postNewJob && (
          <JobPost
            onClose={() => setPostNewJob(false)}
            onCreated={() => setPostNewJob(false)}
          />
        )}

        {/* Empty State */}
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V14.15m16.5 0a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25m16.5 0v-1.5a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25v1.5m6-5.25h4.5"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            No jobs posted yet
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
            You haven&apos;t created any job listings yet. Add your first job
            posting to start attracting candidates.
          </p>

        </div>
      </div>
    </div>
  );
}