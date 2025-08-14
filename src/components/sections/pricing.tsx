import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const pricingPlans = [
  {
    name: 'বিনামূল্যে ট্রায়াল',
    price: '৳০',
    period: '১৪ দিনের জন্য',
    description: 'কোনো প্রতিশ্রুতি ছাড়াই সমস্ত বৈশিষ্ট্য অন্বেষণ করুন।',
    features: [
      'সম্পূর্ণ পিওএস এবং বিলিং অ্যাক্সেস',
      'ইনভেন্টরি ম্যানেজমেন্ট',
      'বিক্রয় বিশ্লেষণ',
      '২৪/৭ সাপোর্ট',
    ],
    isPopular: false,
    cta: 'বিনামূল্যে ট্রায়াল শুরু করুন',
  },
  {
    name: 'স্ট্যান্ডার্ড',
    price: '৳১,৫০০',
    period: '/মাস',
    description: 'একক-শাখা ফার্মেসির জন্য উপযুক্ত।',
    features: [
      'বিনামূল্যে ট্রায়ালের সমস্ত বৈশিষ্ট্য',
      'একাধিক-ব্যবহারকারী অ্যাক্সেস',
      'ওষুধের মেয়াদ উত্তীর্ণের সতর্কতা',
      'ক্লাউড ব্যাকআপ',
    ],
    isPopular: true,
    cta: 'স্ট্যান্ডার্ড বেছে নিন',
  },
  {
    name: 'প্রফেশনাল',
    price: '৳২,৫০০',
    period: '/মাস',
    description: 'একাধিক-শাখা পরিচালনা এবং ক্রমবর্ধমান ব্যবসার জন্য আদর্শ।',
    features: [
      'স্ট্যান্ডার্ডের সমস্ত বৈশিষ্ট্য',
      'একাধিক-শাখা সমর্থন',
      'উন্নত রিপোর্টিং',
      'ZKTeco ডিভাইস ইন্টিগ্রেশন',
    ],
    isPopular: false,
    cta: 'প্রফেশনাল বেছে নিন',
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-bangla">
            প্রতিটি ফার্মেসির জন্য স্বচ্ছ মূল্য
          </h2>
          <p className="mt-4 text-xl text-muted-foreground font-bangla">
            আপনার প্রয়োজন অনুযায়ী সেরা প্ল্যানটি বেছে নিন।
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                'flex flex-col rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105',
                plan.isPopular ? 'border-primary border-2 relative' : ''
              )}
            >
              {plan.isPopular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 font-bangla">সবচেয়ে জনপ্রিয়</Badge>
              )}
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold font-bangla">{plan.name}</CardTitle>
                <CardDescription className="text-base text-muted-foreground font-bangla">{plan.description}</CardDescription>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-sm font-medium text-muted-foreground font-bangla">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6 pt-0">
                <ul className="space-y-3 font-bangla">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6">
                <Button className="w-full font-bangla" variant={plan.isPopular ? 'default' : 'outline'}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12 text-muted-foreground font-bangla">
            <p>কাস্টম প্ল্যান প্রয়োজন? এন্টারপ্রাইজ সমাধানের জন্য <a href="mailto:contact@oushodcloud.com" className="text-primary hover:underline font-medium">আমাদের সাথে যোগাযোগ করুন</a>।</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
