
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import OushodCloudLogo from '../icons/oushod-cloud-logo';
import DemoRequestModal from '../sections/demo-request-modal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: 'বৈশিষ্ট্য' },
    { href: '#why-us', label: 'কেন আমরা' },
    { href: '#testimonials', label: 'প্রশংসাপত্র' },
    { href: '#pricing', label: 'মূল্য তালিকা' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <OushodCloudLogo className="h-auto" style={{ width: '170px' }} />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary font-bangla"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="https://oushodcloud.com/public/login" target="_blank" rel="noopener noreferrer" className="font-bangla">লগইন</Link>
          </Button>
          <DemoRequestModal>
            <Button asChild>
              <span className="font-bangla">ডেমোর জন্য অনুরোধ করুন</span>
            </Button>
          </DemoRequestModal>
        </div>

        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] bg-background">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <OushodCloudLogo className="h-auto" style={{ width: '150px' }} />
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close</span>
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-6 p-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="text-lg font-medium text-foreground transition-colors hover:text-primary font-bangla"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto p-4 border-t space-y-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="https://oushodcloud.com/public/login" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="font-bangla">লগইন</Link>
                  </Button>
                  <DemoRequestModal>
                    <Button className="w-full" asChild>
                      <span className="font-bangla">ডেমোর জন্য অনুরোধ করুন</span>
                    </Button>
                  </DemoRequestModal>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
