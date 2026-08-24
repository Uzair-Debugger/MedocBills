import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { ApplicationStatus } from '@/src/generated/prisma/enums';
import { z } from 'zod';

const statusSchema = z.object({
  status: z.enum([
    ApplicationStatus.PENDING,
    ApplicationStatus.REVIEWING,
    ApplicationStatus.INTERVIEW,
    ApplicationStatus.SELECTED,
    ApplicationStatus.NOT_SELECTED,
    ApplicationStatus.WITHDRAWN,
    ApplicationStatus.ACCEPTED,
    ApplicationStatus.REJECTED,
  ]),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  const adminId = session?.user?.adminId;

  if (typeof adminId !== 'number' || !Number.isInteger(adminId) || adminId <= 0) {
    return Response.json({ error: 'You must be signed in as an admin.' }, { status: 401 });
  }

  const applications = await prisma.application.findMany({
    where: { job_post: { admin_id: adminId } },
    orderBy: { created_at: 'desc' },
    include: {
      job_post: { select: { id: true, title: true } },
    },
  });

  return Response.json({ applications });
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  const adminId = session?.user?.adminId;

  if (typeof adminId !== 'number' || !Number.isInteger(adminId) || adminId <= 0) {
    return Response.json({ error: 'You must be signed in as an admin.' }, { status: 401 });
  }

  const applicationId = Number(request.url && new URL(request.url).searchParams.get('id'));
  if (!Number.isInteger(applicationId) || applicationId <= 0) {
    return Response.json({ error: 'A valid application id is required.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Please choose a valid application status.' }, { status: 400 });
  }

  const result = await prisma.application.updateMany({
    where: { id: applicationId, job_post: { admin_id: adminId } },
    data: { status: parsed.data.status },
  });

  if (result.count === 0) {
    return Response.json({ error: 'Application not found.' }, { status: 404 });
  }

  return Response.json({ applicationId, status: parsed.data.status });
}