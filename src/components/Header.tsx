"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/archive', label: 'Archive' },
  ];

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-6">
          <Logo />
          <Link 
            href="/about" 
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/about' ? 'text-primary' : 'text-foreground/80'
            )}
          >
            About
          </Link>
        </div>
        <nav className="ml-auto flex items-center space-x-2 sm:space-x-4">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            </Button>
          ))}
          <Button variant="outline" asChild>
            <Link
              href="https://drjforrest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Main Site
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
