'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import DemoRequestModal from './demo-request-modal';

const HeroSection = () => {
  return (
    <section className="relative bg-card pt-20 pb-10 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-24">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://oushodcloud.com/public/uploads/25/07/1752993401-402.png"
          alt="Illustration of pharmacy POS and cloud software"
          data-ai-hint="pharmacy software illustration"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-bangla">
            আপনার ফার্মেসি পরিচালনার আধুনিক উপায়
            <span className="block text-primary mt-2">
              আপনার ফার্মেসি এখন আপনার হাতের মুঠোয়
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl font-bangla">
            ঔষধক্লাউড আপনার ফার্মেসির কার্যক্রম সহজ করার জন্য শক্তিশালী, সহজে ব্যবহারযোগ্য সফ্টওয়্যার সরবরাহ করে, যা পিওএস বিলিং থেকে ইনভেন্টরি ম্যানেজমেন্ট পর্যন্ত সবকিছু সহজ করে।
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <DemoRequestModal>
              <Button size="lg">
                <span className="font-bangla">ডেমোর জন্য অনুরোধ করুন</span>
              </Button>
            </DemoRequestModal>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features" className="font-bangla">আরও জানুন</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
