-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('SENT', 'FAILED', 'SKIPPED');

-- CreateTable
CREATE TABLE "email_history" (
    "id" SERIAL NOT NULL,
    "admin_id" INTEGER,
    "application_id" INTEGER,
    "recipient" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "status" "EmailStatus" NOT NULL,
    "error_message" TEXT,
    "sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "job_postId" INTEGER,

    CONSTRAINT "email_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "email_history_admin_id_created_at_idx" ON "email_history"("admin_id", "created_at");

-- CreateIndex
CREATE INDEX "email_history_application_id_created_at_idx" ON "email_history"("application_id", "created_at");

-- AddForeignKey
ALTER TABLE "email_history" ADD CONSTRAINT "email_history_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_history" ADD CONSTRAINT "email_history_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_history" ADD CONSTRAINT "email_history_job_postId_fkey" FOREIGN KEY ("job_postId") REFERENCES "job_post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
