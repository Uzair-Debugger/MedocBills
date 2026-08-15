'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Logo from '../assets/logo.webp';
import { navItems } from '../constants/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CustomButton } from './layout/CustomButton';
import { Icon } from '../utils/lazy-icons';
import { mergeClass } from '../utils/classUtils';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on Esc
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <nav aria-label="top navigation" className="flex bg-blue-500 text-white justify-between text-sm px-5 py-1">
        <div className="flex gap-7">
          <a href="mailto:info@medocbills.com" className="flex items-center gap-1 text-[11px]">
            <Icon name="Mail" width={20} /> info@medocbills.com
          </a>
          <a href="tel:5715202235" className="flex items-center gap-1 text-[11px]">
            <Icon name="Phone" width={20} /> 571-520-2235
          </a>
        </div>

        <div className="hidden sm:flex gap-3">
          <a href="#" aria-label="Instagram"><Icon name="Instagram" width={20} /></a>
          <a href="#" aria-label="Facebook"><Icon name="Facebook" width={20} /></a>
          <a href="#" aria-label="Twitter"><Icon name="Twitter" width={20} /></a>
        </div>
      </nav>

      {/* Main navigation */}
      <nav aria-label="Main navigation" className="flex px-3 items-center justify-between bg-white shadow-sm relative">
        <Link href="/" className="flex items-center p-2 text-xl">
          <Image
            src={Logo}
            alt="MedocBills Logo"
            className="h-12 w-auto"
            loading="eager"
            fetchPriority="high"
            width={182}
            height={48}
            priority
            sizes="182px"
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden min-[1150px]:flex items-center gap-10">
          <ul className="flex gap-5">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={mergeClass(
                    'font-light transition-colors duration-300 hover:text-primary',
                    pathname === item.path ? 'text-primary' : ''
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/contactus">
            <CustomButton variant="primary" className="flex items-center gap-2 px-4 py-2">
              Free Consultation <Icon name="ArrowRight" />
            </CustomButton>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="min-[1150px]:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <Icon name="X" size={32} /> : <Icon name="MenuIcon" size={32} />}
        </button>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={mergeClass(
            'min-[1150px]:hidden absolute top-full left-0 w-full bg-white shadow-md transition-transform duration-300 ease-in-out',
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0 pointer-events-none'
          )}
        >
          <ul className="flex flex-col p-4 gap-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={mergeClass(
                    'font-light hover:text-primary',
                    pathname === item.path ? 'text-primary' : ''
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/contactus">
            <CustomButton variant="primary" className="w-full flex justify-center items-center gap-2 px-4 py-2">
              Free Consultation <Icon name="ArrowRight" />
            </CustomButton>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

