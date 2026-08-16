import { memo, ComponentType, SVGProps } from 'react';
import Link from 'next/link';

interface SpecialtyCardProps {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
}

const SpecialtyCard = ({ icon: Icon, title, href }: SpecialtyCardProps) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary transition bg-white min-h-[180px]"
    >
      <div className="mb-4">
        <Icon
          className="w-12 h-12 text-maroon"
          aria-hidden="true"
          focusable="false"
        />
      </div>

      <h3 className="text-lg font-semibold text-c_green text-center">
        {title}
      </h3>
    </Link>
  );
};

export default memo(SpecialtyCard);
