import { getCurrentAdmin } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { z } from 'zod';

const settingsSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(120),
  email: z.string().trim().toLowerCase().email('Enter a valid email address.'),
});

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return Response.json({ error: 'You must be signed in as an admin.' }, { status: 401 });
  return Response.json({ admin });
}

export async function PATCH(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return Response.json({ error: 'You must be signed in as an admin.' }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: 'Invalid request body.' }, { status: 400 }); }
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? 'Invalid settings.' }, { status: 400 });
  try {
    const updated = await prisma.admin.update({ where: { id: admin.id }, data: parsed.data, select: { id: true, name: true, email: true } });
    return Response.json({ admin: updated });
  } catch {
    return Response.json({ error: 'That email address is already in use.' }, { status: 409 });
  }
}