import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  const adminId = session?.user?.adminId;
  if (typeof adminId !== 'number' || !Number.isInteger(adminId) || adminId <= 0) {
    return Response.json({ error: 'You must be signed in as an admin.' }, { status: 401 });
  }

  const emails = await prisma.email_history.findMany({
    where: { admin_id: adminId },
    orderBy: { created_at: 'desc' },
    take: 100,
    select: { id: true, recipient: true, subject: true, template: true, status: true, error_message: true, sent_at: true, created_at: true },
  });
  return Response.json({ emails });
}