import { randomUUID } from 'node:crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import prisma from '@/src/lib/prisma';
import { env } from '@/src/lib/env';
import { ApplicationStatus, JobStatus } from '@/src/generated/prisma/enums';
import { applicationReceivedEmail, sendEmail } from '@/src/lib/email';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

function getStorageClient() {
  const endpoint = env.S3_ENDPOINT
  const accessKeyId = env.S3_ACCESS_KEY_ID
  const secretAccessKey = env.S3_SECRET_ACCESS_KEY
  const bucket = env.S3_BUCKET

  if (!endpoint || !accessKeyId || !secretAccessKey || !bucket) {
    throw new Error('S3 bucket environment variables are not configured.');
  }

  return {
    bucket,
    client: new S3Client({
      endpoint,
      region: 'auto',
      forcePathStyle: true,
      credentials: { accessKeyId, secretAccessKey },
    }),
  };
}

async function uploadToBucket(file: File, folder: string) {
  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    throw new Error('Uploaded files must be between 1 byte and 5 MB.');
  }
  if (!ALLOWED_FILE_TYPES.has(file.type)) {
    throw new Error('Only PDF, DOC, and DOCX files are allowed.');
  }

  const extension = file.name.toLowerCase().match(/\.(pdf|docx?)$/)?.[1];
  if (!extension) {
    throw new Error('The uploaded file must have a PDF, DOC, or DOCX extension.');
  }

  const objectKey = `${folder}/${randomUUID()}.${extension}`;
  const { bucket, client } = getStorageClient();
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: objectKey,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
  }));

  const endpoint = env.S3_ENDPOINT!.replace(/\/$/, '');
  return `${endpoint}/${bucket}/${objectKey}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const jobPostId = Number(formData.get('jobPostId'));
    const applicantName = String(formData.get('applicantName') ?? '').trim();
    const applicantEmail = String(formData.get('applicantEmail') ?? '').trim().toLowerCase();
    const applicantPhone = String(formData.get('applicantPhone') ?? '').trim();
    const resume = formData.get('resume');
    const coverLetter = formData.get('coverLetter');

    if (!Number.isInteger(jobPostId) || jobPostId <= 0 || !applicantName || !applicantEmail || !applicantPhone || !(resume instanceof File)) {
      return Response.json({ error: 'Please provide all required application information.' }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(applicantEmail) || applicantName.length > 120 || applicantPhone.length > 30) {
      return Response.json({ error: 'Please provide valid contact information.' }, { status: 400 });
    }
    if (coverLetter !== null && !(coverLetter instanceof File)) {
      return Response.json({ error: 'Invalid cover letter upload.' }, { status: 400 });
    }

    const job = await prisma.job_post.findFirst({ where: { id: jobPostId, status: JobStatus.OPEN }, select: { id: true, title: true, admin_id: true } });
    if (!job) {
      return Response.json({ error: 'This job is no longer accepting applications.' }, { status: 404 });
    }

    const resumeUrl = await uploadToBucket(resume, `applications/${jobPostId}/resumes`);
    const coverLetterUrl = coverLetter instanceof File && coverLetter.size > 0
      ? await uploadToBucket(coverLetter, `applications/${jobPostId}/cover-letters`)
      : null;

    const application = await prisma.application.create({
      data: {
        job_post_id: job.id,
        applicant_name: applicantName,
        applicant_email: applicantEmail,
        applicant_phone: applicantPhone,
        resume_url: resumeUrl,
        coverletter_url: coverLetterUrl,
        status: ApplicationStatus.PENDING,
      },
      select: { id: true },
    });

    const email = applicationReceivedEmail(applicantName, job.title);
    await sendEmail({ adminId: job.admin_id, applicationId: application.id, recipient: applicantEmail, ...email, template: 'application_received' });

    return Response.json({ applicationId: application.id }, { status: 201 });
  } catch (error) {
    console.error('Application submission failed:', error);
    const message = error instanceof Error ? error.message : 'Unable to submit your application.';
    const status = message.includes('S3 bucket environment variables') ? 503 : 400;
    return Response.json({ error: message }, { status });
  }
}
