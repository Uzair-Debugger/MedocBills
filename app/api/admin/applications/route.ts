import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';

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