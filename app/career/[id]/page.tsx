import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JobStatus } from '@/src/generated/prisma/enums';
import ApplicationForm from '@/src/components/ApplicationForm';
import { Typography } from '@/src/components/layout';
import prisma from '@/src/lib/prisma';

type JobDetailsPageProps = { params: Promise<{ id: string }> };

async function getJob(id: string) {
    const jobId = Number(id);
    if (!Number.isInteger(jobId) || jobId <= 0) return null;
    return prisma.job_post.findFirst({ where: { id: jobId, status: JobStatus.OPEN } });
}

export async function generateMetadata({ params }: JobDetailsPageProps): Promise<Metadata> {
    const job = await getJob((await params).id);
    return { title: job?.title ?? 'Job details', description: job?.description ?? 'Explore career opportunities at MedocBills.' };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
    const job = await getJob((await params).id);
    if (!job) notFound();

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-16">
            <article className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm sm:p-12">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Open position</p>
                <Typography as="h1" variant="h1" weight="bold" className="mt-3 text-gray-900">{job.title}</Typography>
                <p className="mt-2 text-lg font-medium text-secondary">{job.company_name}</p>
                <div className="mt-8 grid gap-4 border-y border-gray-100 py-6 text-sm text-gray-700 sm:grid-cols-3">
                    <p><span className="block text-xs font-semibold uppercase tracking-wide text-gray-400">Location</span><strong className="mt-1 block">{job.location}</strong></p>
                    <p><span className="block text-xs font-semibold uppercase tracking-wide text-gray-400">Annual salary</span><strong className="mt-1 block">${Number(job.salary).toLocaleString()}</strong></p>
                    <p><span className="block text-xs font-semibold uppercase tracking-wide text-gray-400">Status</span><strong className="mt-1 block">{job.status}</strong></p>
                </div>
                <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-gray-700">{job.description}</div>
                <Link href="/career" className="mt-10 inline-block rounded-md border border-primary px-6 py-3 text-base text-primary transition hover:bg-primary/10">Back to jobs</Link>
            </article>
            <section id="apply" className="mx-auto mt-8 max-w-4xl rounded-2xl bg-white p-8 shadow-sm sm:p-12">
                <Typography as="h2" variant="h3" weight="bold" className="text-gray-900">Apply for {job.title}</Typography>
                <p className="mt-2 text-gray-600">Submit your details and CV to our hiring team.</p>
                <div className="mt-6"><ApplicationForm job={{ id: job.id, title: job.title }} onClose={() => undefined} inline /></div>
            </section>
        </main>
    );
}