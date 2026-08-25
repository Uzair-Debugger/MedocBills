import prisma from '@/src/lib/prisma';
import { env } from '@/src/lib/env';
import { sendEmail, serviceInquiryConfirmation, serviceInquiryEmail } from '@/src/lib/email';
import { EmailStatus } from '@/src/generated/prisma/enums';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().max(40).optional().default(''),
  service: z.string().trim().max(120).optional().default(''),
  state: z.string().trim().max(120).optional().default(''),
  preferredDate: z.string().trim().max(40).optional().default(''),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: 'Invalid request body.' }, { status: 400 }); }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? 'Please provide valid contact information.' }, { status: 400 });

  const admin = await prisma.admin.findFirst({ orderBy: { id: 'asc' }, select: { id: true, email: true } });
  const inquiry = serviceInquiryEmail(parsed.data);
  const delivery = await sendEmail({ adminId: admin?.id, recipient: admin?.email ?? env.ADMIN_EMAIL, ...inquiry, template: 'service_inquiry' });
  const confirmation = serviceInquiryConfirmation(parsed.data.name);
  await sendEmail({ adminId: admin?.id, recipient: parsed.data.email, ...confirmation, template: 'service_inquiry_confirmation' });

  if (delivery.status !== EmailStatus.SENT) {
    return Response.json({ error: 'We could not send your inquiry right now. Please try again or email us directly.' }, { status: 503 });
  }

  return Response.json({ message: 'Your inquiry was sent successfully.' }, { status: 201 });
}