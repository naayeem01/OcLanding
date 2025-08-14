import { cn } from '@/lib/utils';
import React from 'react';

const AboutSection = () => {
  return (
    <section
      id="about"
      className={cn('py-16 sm:py-24 bg-card', 'medical-pattern')}
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-bangla">
          <span className="text-primary">ঔষধক্লাউড</span> সম্পর্কে
        </h2>
        <p className="mt-4 text-xl font-medium text-muted-foreground font-bangla">
          <span className="text-primary font-semibold">ঔষধক্লাউড</span> কি এবং
          এটি কাদের জন্য?
        </p>
        <div className="mt-8 text-lg text-foreground space-y-4 font-bangla">
          <p>
            <span className="font-bold text-primary">ঔষধক্লাউড</span> একটি
            অত্যাধুনিক, ক্লাউড-ভিত্তিক ফার্মাসি ম্যানেজমেন্ট এবং পয়েন্ট-অফ-সেল
            (পিওএস) সফ্টওয়্যার যা বিশেষভাবে বাংলাদেশের ফার্মাসি মালিক, ক্লিনিক
            অপারেটর এবং ওষুধ পরিবেশকদের চাহিদা মেটাতে ডিজাইন করা হয়েছে।
          </p>
          <p className="text-muted-foreground">
            আমাদের লক্ষ্য হলো আপনার ফার্মেসির দৈনন্দিন কাজগুলোকে সহজ করে তোলা,
            যাতে আপনি আপনার ব্যবসার প্রসারে আরও বেশি মনোযোগ দিতে পারেন। স্টক
            ম্যানেজমেন্ট থেকে শুরু করে দ্রুত বিলিং এবং সঠিক রিপোর্টিং পর্যন্ত,{' '}
            <span className="font-bold text-primary">ঔষধক্লাউড</span> আপনার
            বিশ্বস্ত সহযোগী।
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
