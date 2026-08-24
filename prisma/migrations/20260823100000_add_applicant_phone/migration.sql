ALTER TABLE "application" ADD COLUMN "applicant_phone" TEXT NOT NULL DEFAULT '';

ALTER TABLE "application" ALTER COLUMN "applicant_phone" DROP DEFAULT;
