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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-6 w-6" fill="white"><path d="M389.6 298.3L168.9 77L449.7 238.2L389.6 298.3zM111.3 64C98.3 70.8 89.6 83.2 89.6 99.3L89.6 540.6C89.6 556.7 98.3 569.1 111.3 575.9L367.9 319.9L111.3 64zM536.5 289.6L477.6 255.5L411.9 320L477.6 384.5L537.7 350.4C555.7 336.1 555.7 303.9 536.5 289.6zM168.9 563L449.7 401.8L389.6 341.7L168.9 563z"/></svg>
                    <span className="font-bangla">Google Play</span>
                 </Link>
               </Button>
               <Button size="lg" asChild className="bg-black hover:bg-black/80">
                  <Link href="#" className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-6 w-6" fill="white"><path d="M319.9 184.9L329 169.2C334.6 159.4 347.1 156.1 356.9 161.7C366.7 167.3 370 179.8 364.4 189.6L276.9 341.1L340.2 341.1C360.7 341.1 372.2 365.2 363.3 381.9L177.8 381.9C166.5 381.9 157.4 372.8 157.4 361.5C157.4 350.2 166.5 341.1 177.8 341.1L229.8 341.1L296.4 225.7L275.6 189.6C270 179.8 273.3 167.4 283.1 161.7C292.9 156.1 305.3 159.4 311 169.2L319.9 184.9zM241.2 402.9L221.6 436.9C216 446.7 203.5 450 193.7 444.4C183.9 438.8 180.6 426.3 186.2 416.5L200.8 391.3C217.2 386.2 230.6 390.1 241.2 402.9zM410.1 341.2L463.2 341.2C474.5 341.2 483.6 350.3 483.6 361.6C483.6 372.9 474.5 382 463.2 382L433.7 382L453.6 416.5C459.2 426.3 455.9 438.7 446.1 444.4C436.3 450 423.9 446.7 418.2 436.9C384.7 378.8 359.5 335.3 342.8 306.3C325.7 276.8 337.9 247.2 350 237.2C363.4 260.2 383.4 294.9 410.1 341.2zM320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM104 320C104 200.7 200.7 104 320 104C439.3 104 536 200.7 536 320C536 439.3 439.3 536 320 536C200.7 536 104 439.3 104 320z"/></svg>
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
