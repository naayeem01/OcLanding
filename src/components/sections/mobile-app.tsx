import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

const MobileAppSection = () => {
  return (
    <section id="mobile-app" className={cn('py-16 sm:py-24 bg-background')}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative text-center">
            <Image
              src="https://placehold.co/600x600.png"
              alt="OushodCloud Mobile App"
              width={500}
              height={500}
              data-ai-hint="app on phone"
              className="rounded-lg shadow-2xl inline-block"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-bangla mb-4">
              যে কোন জায়গা থেকে আপনার ফার্মেসি পরিচালনা করুন
            </h2>
            <p className="text-xl font-medium text-muted-foreground font-bangla mb-6">
              আমাদের মোবাইল অ্যাপের মাধ্যমে আপনার ব্যবসা সবসময় আপনার সাথে
            </p>
            <p className="text-lg text-foreground font-bangla mb-6">
              <span className="font-bold text-primary">ঔষধক্লাউড</span> মোবাইল অ্যাপ আপনাকে স্টক চেক করতে, বিক্রয় নিরীক্ষণ করতে এবং চলতে চলতে গুরুত্বপূর্ণ ব্যবসায়িক সিদ্ধান্ত নিতে দেয়। আপনার ডেস্কটপে আবদ্ধ থাকার দিন শেষ।
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <Button size="lg" asChild className="bg-[#A4C639] hover:bg-[#A4C639]/90">
                 <Link href="#" className="flex items-center gap-2">
                    <Image src="https://oushodcloud.com/public/uploads/25/07/1753641214-617.svg" alt="Google Play" width={24} height={24} />
                    <span className="font-bangla">Google Play</span>
                 </Link>
               </Button>
               <Button size="lg" asChild className="bg-black hover:bg-black/80">
                  <Link href="#" className="flex items-center gap-2">
                    <Image src="https://oushodcloud.com/public/uploads/25/07/1753641285-80.svg" alt="Apple App Store" width={24} height={24} />
                    <span className="font-bangla">App Store</span>
                 </Link>
               </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
