import { getCurrentAdmin } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { JobStatus } from '@/src/generated/prisma/enums';
import { z } from 'zod';

const jobUpdateSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(20),
  location: z.string().trim().min(1).max(120),
  companyName: z.string().trim().min(1).max(120),
  salary: z.coerce.number().finite().positive(),
  lastDate: z.preprocess((value) => value === '' ? null : value, z.coerce.date().nullable()),
  status: z.enum([JobStatus.DRAFT, JobStatus.OPEN, JobStatus.CLOSED]),
});

async function getAdminId() {
  const admin = await getCurrentAdmin();
  return admin?.id ?? null;
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const adminId = await getAdminId();
  if (!adminId) return Response.json({ error: 'You must be signed in as an admin.' }, { status: 401 });
  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id <= 0) return Response.json({ error: 'A valid job id is required.' }, { status: 400 });
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: 'Invalid request body.' }, { status: 400 }); }
  const parsed = jobUpdateSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? 'Invalid job data.' }, { status: 400 });
  const result = await prisma.job_post.updateMany({
    where: { id, admin_id: adminId },
    data: { title: parsed.data.title, description: parsed.data.description, location: parsed.data.location, company_name: parsed.data.companyName, salary: parsed.data.salary, last_date: parsed.data.lastDate, status: parsed.data.status },
  });
  if (result.count === 0) return Response.json({ error: 'Job post not found.' }, { status: 404 });
  return Response.json({ jobId: id });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const adminId = await getAdminId();
  if (!adminId) return Response.json({ error: 'You must be signed in as an admin.' }, { status: 401 });
  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id <= 0) return Response.json({ error: 'A valid job id is required.' }, { status: 400 });
  try {
    const result = await prisma.job_post.deleteMany({ where: { id, admin_id: adminId } });
    if (result.count === 0) return Response.json({ error: 'Job post not found.' }, { status: 404 });
    return Response.json({ jobId: id });
  } catch {
    return Response.json({ error: 'Unable to delete a job with existing applications.' }, { status: 409 });
  }
}