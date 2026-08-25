import prisma from '@/src/lib/prisma';
import { EmailStatus } from '@/src/generated/prisma/enums';
import { env } from '@/src/lib/env';

type SendEmailInput = {
  adminId?: number;
  applicationId?: number;
  recipient: string;
  subject: string;
  template: string;
  html: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character);
}

export async function sendEmail(input: SendEmailInput) {
  const { html, adminId, applicationId, ...history } = input;
  const historyData = {
    ...history,
    admin_id: adminId,
    application_id: applicationId,
  };
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    return prisma.email_history.create({
      data: { ...historyData, status: EmailStatus.SKIPPED, error_message: 'Email provider is not configured.' },
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: env.EMAIL_FROM, to: [input.recipient], subject: input.subject, html }),
    });

    if (!response.ok) {
      const result = await response.text();
      throw new Error(`Email provider returned ${response.status}: ${result.slice(0, 300)}`);
    }

    return prisma.email_history.create({
      data: { ...historyData, status: EmailStatus.SENT, sent_at: new Date() },
    });
  } catch (error) {
    return prisma.email_history.create({
      data: {
        ...historyData,
        status: EmailStatus.FAILED,
        error_message: error instanceof Error ? error.message : 'Unknown email provider error.',
      },
    });
  }
}

export function applicationReceivedEmail(name: string, jobTitle: string) {
  return {
    subject: `Application received: ${jobTitle}`,
    html: `<p>Hello ${name},</p><p>We received your application for <strong>${jobTitle}</strong>. Our team will review it and contact you with updates.</p><p>Thank you,<br />Medocbills Healthcare Solution</p>`,
  };
}

export function applicationStatusEmail(name: string, jobTitle: string, status: string) {
  return {
    subject: `Application update: ${jobTitle}`,
    html: `<p>Hello ${name},</p><p>Your application for <strong>${jobTitle}</strong> is now <strong>${status.replace('_', ' ')}</strong>.</p><p>Thank you,<br />Medocbills Healthcare Solution</p>`,
  };
}

export function serviceInquiryEmail(input: { name: string; email: string; phone?: string; service?: string; state?: string; preferredDate?: string; message: string }) {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const phone = escapeHtml(input.phone || 'Not provided');
  const service = escapeHtml(input.service || 'Not specified');
  const state = escapeHtml(input.state || 'Not specified');
  const preferredDate = escapeHtml(input.preferredDate || 'Not specified');
  const message = escapeHtml(input.message).replace(/\n/g, '<br />');

  return {
    subject: `New service inquiry from ${input.name}`,
    html: `<h2>New service inquiry</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Service:</strong> ${service}</p><p><strong>State:</strong> ${state}</p><p><strong>Preferred date:</strong> ${preferredDate}</p><p><strong>Message:</strong><br />${message}</p>`,
  };
}

export function serviceInquiryConfirmation(name: string) {
  return {
    subject: 'We received your inquiry',
    html: `<p>Hello ${escapeHtml(name)},</p><p>Thank you for contacting Medocbills Healthcare Solution. We received your inquiry and our team will contact you shortly.</p><p>Thank you,<br />Medocbills Healthcare Solution</p>`,
  };
}