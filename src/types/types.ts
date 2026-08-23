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