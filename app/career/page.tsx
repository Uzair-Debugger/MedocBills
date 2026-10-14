import { SITE_CONFIG } from "@/src/constants/seo";
import JsonLd from "@/src/components/JsonLd";
import { Container, Typography } from "@/src/components/layout";
import { sectionBase } from "@/src/theme/classes";
import CareerListings from "./CareerListings";

const careerWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Careers | MedocBills",
  description:
    "Career information, possible areas of work, and current openings at MedocBills, a healthcare billing and revenue cycle management company.",
  url: `${SITE_CONFIG.url}/career`,
  inLanguage: "en-US",
};

const roleAreas = [
  {
    title: "Medical billing and claims",
    description:
      "Work related to billing workflows, claim submission, claim follow-up, and revenue cycle operations.",
  },
  {
    title: "Medical coding",
    description:
      "Coding work connected to healthcare claims, documentation, and reimbursement workflows.",
  },
  {
    title: "Credentialing",
    description:
      "Provider enrollment and insurance credentialing work that supports participation in payer networks.",
  },
  {
    title: "Accounts receivable",
    description:
      "Revenue cycle follow-up, payment tracking, and accounts receivable activities.",
  },
  {
    title: "Operations and support",
    description:
      "Business process operations and customer or patient support related to healthcare services.",
  },
  {
    title: "Technology and digital services",
    description:
      "Technology, IT operations, and digital services that support the company’s business offerings.",
  },
];

export default function CareerPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <section
          aria-labelledby="careers-heading"
          className="bg-linear-to-br from-primary-deep via-primary-dark to-primary px-6 py-24 text-white"
        >
          <Container size="md" className="text-center">
            <Typography
              as="h1"
              id="careers-heading"
              variant="h1"
              weight="bold"
              color="inherit"
              className="mb-4 leading-tight"
            >
              Build your career in
              <br />
              <span className="text-secondary">healthcare billing</span> and
              revenue cycle management.
            </Typography>
            <Typography as="p" className="mx-auto mt-4 max-w-2xl text-white/90">
              Learn about work connected to medical billing, coding,
              credentialing, and healthcare revenue cycle management, and
              explore any current MedocBills openings.
            </Typography>
          </Container>
        </section>

        <section
          aria-labelledby="openings-heading"
          className={`mt-10 ${sectionBase}`}
        >
          <Container className="max-w-5xl">
            <Typography
              as="h2"
              id="openings-heading"
              variant="h3"
              weight="bold"
              color="primary-dark"
            >
              Current MedocBills job openings
            </Typography>
            <p className="mt-3 max-w-3xl leading-7 text-gray-700">
              Search active positions below. If no positions are listed, you can
              still learn about the work and stated company principles above, or
              contact MedocBills about future opportunities.
            </p>
            <CareerListings />
          </Container>
        </section>
        <section aria-labelledby="work-heading" className={sectionBase}>
          <Container className="max-w-5xl">
            <Typography
              as="h2"
              id="work-heading"
              variant="h3"
              weight="bold"
              color="primary-dark"
            >
              Work connected to healthcare revenue cycle management
            </Typography>
            <p className="mt-4 max-w-4xl leading-7 text-gray-700">
              MedocBills describes its business as including healthcare revenue
              cycle management, medical billing, business process outsourcing,
              and digital marketing. The work behind those services can involve
              accurate claims and coding processes, provider credentialing,
              accounts receivable follow-up, business operations, and customer
              or patient support.
            </p>
            <p className="mt-3 max-w-4xl leading-7 text-gray-700">
              The areas below are examples of work that may relate to the
              company’s services. They are not job vacancies. Only positions
              shown in the current openings list are available to apply for.
            </p>
            <ul
              className="mt-7 grid gap-4 sm:grid-cols-2"
              aria-label="Possible career areas"
            >
              {roleAreas.map((area) => (
                <li
                  key={area.title}
                  className="rounded-xl border border-gray-200 border-t-4 border-t-secondary bg-white p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-primary-dark">{area.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-700">
                    {area.description}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section aria-labelledby="culture-heading" className="bg-white py-16">
          <Container className="max-w-5xl">
            <Typography
              as="h2"
              id="culture-heading"
              variant="h3"
              weight="bold"
              color="primary-dark"
            >
              Company principles and work environment
            </Typography>
            <p className="mt-4 max-w-4xl leading-7 text-gray-700">
              MedocBills’ public company information describes a team of
              experienced professionals working across healthcare revenue cycle
              management, business process outsourcing, and digital services.
              The company’s published principles are curiosity, empathy, and
              keeping promises: seeking better solutions, understanding client
              needs, and aiming for transparent and reliable service.
            </p>
            <p className="mt-3 max-w-4xl leading-7 text-gray-700">
              These are the company’s stated service principles, not a
              substitute for details about a specific team or role. Job postings
              are the source for role-specific requirements, reporting
              relationships, work location, schedule, and work arrangement.
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              <li className="rounded-xl border border-cyan-50 bg-cyan-50 p-5">
                <h3 className="font-semibold text-primary-dark">Be curious</h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  The company highlights learning and seeking more effective
                  solutions in changing healthcare coding and reimbursement
                  work.
                </p>
              </li>
              <li className="rounded-xl border border-cyan-50 bg-cyan-50 p-5">
                <h3 className="font-semibold text-primary-dark">Be empathetic</h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  MedocBills says it aims to understand the different needs and
                  challenges of the organizations it serves.
                </p>
              </li>
              <li className="rounded-xl border border-cyan-50 bg-cyan-50 p-5">
                <h3 className="font-semibold text-primary-dark">Keep promises</h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  The company identifies transparency, timely execution, and
                  reliable service as commitments.
                </p>
              </li>
            </ul>
          </Container>
        </section>

        <section
          aria-labelledby="application-process-heading"
          className={sectionBase}
        >
          <Container className="max-w-5xl">
            <Typography
              as="h2"
              id="application-process-heading"
              variant="h3"
              weight="bold"
              color="primary-dark"
            >
              How to apply at MedocBills
            </Typography>
            <ol className="mt-6 space-y-5">
              <li className="rounded-xl border border-gray-200 border-l-4 border-l-primary bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-primary-dark">
                  1. Review an active opening
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  Check the current openings below. Each live listing provides
                  the role details and location available for that position.
                </p>
              </li>
              <li className="rounded-xl border border-gray-200 border-l-4 border-l-secondary bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-primary-dark">
                  2. Submit your application
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  Select Apply Now on a listed role and provide your name, email
                  address, phone number, and resume. The form accepts PDF, DOC,
                  or DOCX resumes; a cover letter is optional.
                </p>
              </li>
              <li className="rounded-xl border border-gray-200 border-l-4 border-l-primary bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-primary-dark">
                  3. Allow time for review
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  Applications are submitted for the selected open position.
                  MedocBills does not publish a standard review or interview
                  timeline, so timing may vary. Any closing date shown on a job
                  listing takes precedence.
                </p>
              </li>
            </ol>
            <p className="mt-5 leading-7 text-gray-700">
              There is no general application form for roles that are not
              listed. To express interest in possible future opportunities,
              email{" "}
              <a
                href={`mailto:${SITE_CONFIG.contact.email}?subject=Career%20interest`}
                className="font-semibold text-primary underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {SITE_CONFIG.contact.email}
              </a>{" "}
              with a brief introduction and the kind of work you are interested
              in. This is an inquiry, not an application to a current vacancy.
            </p>
          </Container>
        </section>
      </main>
      <JsonLd data={careerWebPageSchema} />
    </>
  );
}
