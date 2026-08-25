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

export async function sendEmail(input: SendEmailInput) {
  const { html, ...history } = input;
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    return prisma.email_history.create({
      data: { ...history, status: EmailStatus.SKIPPED, error_message: 'Email provider is not configured.' },
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
      data: { ...history, status: EmailStatus.SENT, sent_at: new Date() },
    });
  } catch (error) {
    return prisma.email_history.create({
      data: {
        ...history,
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