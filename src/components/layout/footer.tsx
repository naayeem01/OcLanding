
import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import OushodCloudLogo from '../icons/oushod-cloud-logo';
import LegalDocumentModal from '../sections/legal-document-modal';

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <OushodCloudLogo className="h-auto" style={{ width: '170px' }} />
            </Link>
            <p className="text-sm text-muted-foreground font-bangla">
              আপনার ফার্মেসি ব্যবস্থাপনাকে সহজ, দ্রুত, এবং নির্ভরযোগ্য করতে আমরা
              আছি আপনার পাশে।
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 font-bangla">
              গুরুত্বপূর্ণ লিংক
            </h3>
            <ul className="space-y-2 text-sm font-bangla">
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ফিচার
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  মূল্য তালিকা
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ব্যবহারকারীদের মতামত
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 font-bangla">
              আইনি
            </h3>
            <ul className="space-y-2 text-sm font-bangla">
               <li>
                <LegalDocumentModal docType="privacy-policy">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    গোপনীয়তা নীতি
                  </span>
                </LegalDocumentModal>
              </li>
              <li>
                 <LegalDocumentModal docType="terms-of-service">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    শর্তাবলী
                  </span>
                </LegalDocumentModal>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 font-bangla">
              যোগাযোগ
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-bangla">
              <li>ইমেল: oushodcloud@gmail.com</li>
              <li>ফোন: +8801577001441</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="#"
                  aria-label="YouTube"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="font-bangla">
            &copy; {new Date().getFullYear()}{' '}
            <span className="font-bold text-primary">ঔষধক্লাউড</span>।
            সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
