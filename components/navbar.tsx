'use client';

import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MainNav } from './mainNav';
import StoreSwitcher from './storeSwitcher';
import { ThemeToggle } from './themeToggle';
import { Button } from './ui/button';
import UserProfile from './userProfile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="border-b" ref={navRef}>
      <div className="relative flex h-16 px-4 items-center justify-between">
        <div className="absolute inset-y-0 left-2 flex items-center md:hidden">
          <Button
            onClick={toggleMenu}
            variant={'outline'}
            className="relative px-3 h-9"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        <div className="flex flex-1 items-stretch justify-start ml-10 md:ml-1">
          <div className="flex flex-shrink-0 items-center">
            <StoreSwitcher items={[]} />
          </div>

          <div className="hidden md:block">
            <MainNav onClose={closeMenu} />
          </div>
        </div>

        <div className=" ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserProfile />
        </div>
      </div>

      <div
        className={cn(
          'md:hidden bg-white dark:bg-black ',
          isOpen ? 'block ' : 'hidden',
        )}
      >
        <MainNav onClose={closeMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
