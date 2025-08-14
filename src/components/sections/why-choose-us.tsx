import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gauge, Target, ShieldCheck, Cloud, Smartphone } from 'lucide-react';

const benefits = [
  {
    icon: <Gauge className="h-10 w-10 text-primary" />,
    title: 'অতুলনীয় গতি',
    description: 'আমাদের অপ্টিমাইজ করা POS সিস্টেম দ্রুত বিলিং এবং অপারেশন নিশ্চিত করে, গ্রাহকের অপেক্ষার সময় কমিয়ে দেয়।',
  },
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: 'নির্ভুলতার গ্যারান্টি',
    description: 'আমাদের সুনির্দিষ্ট ট্র্যাকিং এবং রিপোর্টিং সরঞ্জামগুলির মাধ্যমে ইনভেন্টরি এবং বিক্রয়ে ভুল হ্রাস করুন।',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'তথ্যের নিরাপত্তা',
    description: 'আপনার ফার্মেসি এবং গ্রাহকের ডেটা সুরক্ষিত রাখতে আমরা ইন্ডাস্ট্রি-স্ট্যান্ডার্ড এনক্রিপশন ব্যবহার করি।',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: 'মোবাইল অ্যাক্সেস',
    description: 'আমাদের মোবাইল অ্যাপের মাধ্যমে যেকোনো সময়, যেকোনো জায়গা থেকে আপনার ফার্মেসি পরিচালনা করুন।',
  },
];

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-bangla">
            কেন <span className="text-primary">ঔষধক্লাউড</span> বেছে নেবেন?
          </h2>
          <p className="mt-4 text-xl text-muted-foreground font-bangla">
            আমরা এমন একটি সমাধান প্রদান করি যা কেবল একটি সফ্টওয়্যার নয়, আপনার ফার্মেসির বৃদ্ধিতে একজন অংশীদার।
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mx-auto mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground font-bangla">{benefit.title}</h3>
              <p className="mt-2 text-base text-muted-foreground font-bangla">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
