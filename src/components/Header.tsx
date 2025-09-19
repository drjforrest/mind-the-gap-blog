"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();

  const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/archive", label: "Archive" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-gradient-to-r from-background/95 via-muted/95 to-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 shadow-sm">
      <div className="container flex h-18 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-8 flex items-center space-x-3 group">
            <div className="flex items-center justify-center">
              <Image
                src="/images/mind-the-gap-logo.png"
                alt="Mind the Gap Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <span className="font-bold sm:inline-block font-headline text-xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-chart-1 transition-all duration-300">
              Mind the Gap
            </span>
          </Link>
          <nav className="flex items-center gap-8 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative font-medium transition-all duration-300 hover:text-primary hover:scale-105 px-2 py-1 rounded-md",
                  pathname === link.href
                    ? "text-primary bg-primary/10 shadow-sm"
                    : "text-foreground/70 hover:bg-primary/5",
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-chart-1 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex items-center justify-center">
                <Image
                  src="/images/mind-the-gap-logo.png"
                  alt="Mind the Gap Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                  priority
                />
              </div>
              <span className="font-bold font-headline text-base bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Mind the Gap
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild className="hidden sm:inline-flex">
              <Link
                href="https://drjforrest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Main Site
              </Link>
            </Button>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="border border-border bg-muted/50 hover:bg-muted">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-gradient-to-b from-background via-muted/50 to-background">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center border-b border-border pb-4">
                      <Link href="/" className="flex items-center space-x-3 group">
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/mind-the-gap-logo.png"
                            alt="Mind the Gap Logo"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                            priority
                          />
                        </div>
                        <span className="font-bold font-headline text-lg bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                          Mind the Gap
                        </span>
                      </Link>
                    </div>
                    <nav className="flex-1 mt-6 grid gap-2">
                      {NAV_LINKS.map((link) => (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className={cn(
                              "text-lg font-medium transition-all duration-300 px-4 py-3 rounded-lg relative",
                              pathname === link.href
                                ? "text-primary bg-primary/10 shadow-sm"
                                : "text-foreground/70 hover:text-primary hover:bg-primary/5",
                            )}
                          >
                            {link.label}
                            {pathname === link.href && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-chart-1 rounded-r-full"></div>
                            )}
                          </Link>
                        </SheetClose>
                      ))}
                      <SheetClose asChild>
                        <Link
                          href="https://drjforrest.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium transition-all duration-300 px-4 py-3 rounded-lg text-foreground/70 hover:text-primary hover:bg-primary/5 border-t border-border mt-4 pt-6"
                        >
                          Main Site
                        </Link>
                      </SheetClose>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
