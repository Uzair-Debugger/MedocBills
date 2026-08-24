export type JobStatus = 'DRAFT' | 'OPEN' | 'CLOSED';

export type jobSchema = {
    id: number;
    title: string;
    description: string;
    location: string;
    company_name: string;
    salary: number | string;
    status: JobStatus;
    created_at: string;
};

export type ApplicationJob = Pick<jobSchema, 'id' | 'title'>;

export type ApplicationStatus = 'PENDING' | 'REVIEWING' | 'INTERVIEW' | 'SELECTED' | 'NOT_SELECTED' | 'WITHDRAWN' | 'ACCEPTED' | 'REJECTED';

export type ApplicationRecord = {
    id: number;
    applicant_name: string;
    applicant_email: string;
    applicant_phone: string;
    resume_url: string;
    coverletter_url: string | null;
    status: ApplicationStatus;
    created_at: string;
    job_post: Pick<jobSchema, 'id' | 'title'>;
};