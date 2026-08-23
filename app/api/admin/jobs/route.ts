import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { JobStatus } from '@/src/generated/prisma/enums';
import { z } from 'zod';

const jobPostSchema = z.object({
  title: z.string().trim().min(1, 'Job title is required.').max(120),
  description: z.string().trim().min(20, 'Description must be at least 20 characters.'),
  location: z.string().trim().min(1, 'Location is required.').max(120),
  companyName: z.string().trim().min(1, 'Company name is required.').max(120),
  salary: z.preprocess(
    (value) => {
      if (typeof value === 'string' && value.trim() !== '') {
        return Number(value);
      }
      return value;
    },
    z.number().finite().positive('Salary must be greater than zero.')
  ),
  status: z.enum([JobStatus.DRAFT, JobStatus.OPEN, JobStatus.CLOSED]),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const adminId = session?.user?.adminId;

  if (typeof adminId !== 'number' || !Number.isInteger(adminId) || adminId <= 0) {
    return Response.json({ error: 'You must be signed in as an admin.' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsedJob = jobPostSchema.safeParse(body);
  if (!parsedJob.success) {
    return Response.json(
      { error: parsedJob.error.issues[0]?.message ?? 'Invalid job post data.' },
      { status: 400 }
    );
  }

  const { title, description, location, companyName, salary, status } = parsedJob.data;

  const jobPost = await prisma.job_post.create({
    data: {
      admin_id: adminId,
      title,
      description,
      location,
      salary,
      company_name: companyName,
      status,
    },
  });

  return Response.json({ jobPost }, { status: 201 });
}