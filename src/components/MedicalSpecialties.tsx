import Link from 'next/link';
import SpecialtyCard from './SpecialtyCard';
import { specialties } from '../constants/data';

const MedicalSpecialties = () => {
  return (
    <section
      className="py-16 bg-gray-50"
      aria-labelledby="specialties-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="text-center mb-12">
          <p className="text-sm font-medium text-c_green uppercase tracking-wider">
            We Cover
          </p>

          <h2
            id="specialties-heading"
            className="text-3xl font-extrabold text-maroon mt-2 relative inline-block"
          >
            These Medical Specialties
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 bg-secondary w-3/4"></span>
          </h2>
        </header>

        {/* Grid */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {specialties.map((specialty) => (
            <li key={specialty.title}>
              <SpecialtyCard
                title={specialty.title}
                icon={specialty.icon}
                 href="/services"
              />
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition shadow-lg"
          >
            View All Specialties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MedicalSpecialties;
