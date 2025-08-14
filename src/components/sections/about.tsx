
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className={cn('py-16 sm:py-24 bg-card')}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="https://oushodcloud.com/public/uploads/25/07/1752994953-316.png"
              alt="OushodCloud Dashboard"
              width={1200}
              height={900}
              data-ai-hint="pharmacy dashboard"
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-bangla mb-4">
              <span className="text-primary">ঔষধক্লাউড</span> সম্পর্কে জানুন
            </h2>
            <p className="text-xl font-medium text-muted-foreground font-bangla mb-6">
              আপনার ফার্মেসি ব্যবস্থাপনাকে করুন সহজ ও নির্ভুল
            </p>
            <p className="text-lg text-foreground font-bangla mb-6">
              <span className="font-bold text-primary">ঔষধক্লাউড</span> একটি
              অত্যাধুনিক, ক্লাউড-ভিত্তিক ফার্মাসি ম্যানেজমেন্ট এবং
              পয়েন্ট-অফ-সেল (পিওএস) সফ্টওয়্যার যা বিশেষভাবে বাংলাদেশের ফার্মাসি
              মালিক, ক্লিনিক অপারেটর এবং ওষুধ পরিবেশকদের জন্য ডিজাইন করা হয়েছে।
            </p>
            <ul className="space-y-3 font-bangla text-lg">
                <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" />
                    <span>আমাদের লক্ষ্য আপনার ফার্মেসির দৈনন্দিন কাজকে সহজ করে আপনার ব্যবসার প্রসারে সহায়তা করা।</span>
                </li>
                 <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" />
                    <span>স্টক ম্যানেজমেন্ট থেকে বিলিং এবং রিপোর্টিং পর্যন্ত, ঔষধক্লাউড আপনার বিশ্বস্ত সহযোগী।</span>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
