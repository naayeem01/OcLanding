import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CtaSection = () => {
  return (
    <section id="cta" className="bg-background py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-bangla">
          আজই শুরু করুন, আপনার ফার্মেসিকে সহজ করুন
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground font-bangla">
          আর অপেক্ষা কেন? আজই আপনার ফার্মেসিকে আধুনিক করে তুলুন{' '}
          <span className="font-bold text-primary">ঔষধক্লাউড</span> এর সাথে।
          কোনো বাধ্যবাধকতা ছাড়াই বিনামূল্যে ট্রায়াল শুরু করুন।
        </p>
        <div className="mt-10">
          <Button size="lg" asChild>
            <Link href="#pricing" className="font-bangla">বিনামূল্যে শুরু করুন</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
