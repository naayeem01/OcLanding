'use client';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, Printer, Barcode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const parsePrice = (priceString: string): number => {
  if (priceString.startsWith('৳')) {
    return parseInt(priceString.replace(/[৳,]/g, ''), 10);
  }
  return 0;
};

const formatPrice = (price: number): string => {
  return `৳${price.toLocaleString('en-IN')}`;
};

const hardwareAddons = [
  {
    id: 'barcodeScanner',
    name: 'বারকোড স্ক্যানার',
    price: 1499,
    icon: <Barcode className="h-4 w-4 mr-2 text-primary" />,
  },
  {
    id: 'posPrinter',
    name: 'পস প্রিন্টার',
    price: 3999,
    icon: <Printer className="h-4 w-4 mr-2 text-primary" />,
  },
];

const pricingPlans = {
  monthly: [
    {
      name: 'স্ট্যান্ডার্ড',
      price: '৳১,৫০০',
      period: '/মাস',
      description: 'একক-শাখা ফার্মেসির জন্য উপযুক্ত।',
      features: [
        'সম্পূর্ণ পিওএস এবং বিলিং অ্যাক্সেস',
        'ইনভেন্টরি ম্যানেজমেন্ট',
        'বিক্রয় বিশ্লেষণ',
        'একাধিক-ব্যবহারকারী অ্যাক্সেস',
        'ওষুধের মেয়াদ উত্তীর্ণের সতর্কতা',
        'ক্লাউড ব্যাকআপ',
        '২৪/৭ সাপোর্ট',
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
  ],
  yearly: [
    {
      name: 'স্ট্যান্ডার্ড',
      price: '৳১৫,০০০',
      period: '/বছর',
      description: 'একক-শাখা ফার্মেসির জন্য উপযুক্ত।',
      features: [
        'সম্পূর্ণ পিওএস এবং বিলিং অ্যাক্সেস',
        'ইনভেন্টরি ম্যানেজমেন্ট',
        'বিক্রয় বিশ্লেষণ',
        'একাধিক-ব্যবহারকারী অ্যাক্সেস',
        'ওষুধের মেয়াদ উত্তীর্ণের সতর্কতা',
        'ক্লাউড ব্যাকআপ',
        '২৪/৭ সাপোর্ট',
      ],
      isPopular: true,
      cta: 'স্ট্যান্ডার্ড বেছে নিন',
    },
    {
      name: 'প্রফেশনাল',
      price: '৳২৫,০০০',
      period: '/বছর',
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
  ],
};

const PricingCard = ({ plan, billingCycle }: { plan: any; billingCycle: 'monthly' | 'yearly' }) => {
  const [checkedAddons, setCheckedAddons] = useState<Record<string, boolean>>({
    barcodeScanner: false,
    posPrinter: false,
  });

  const basePrice = useMemo(() => parsePrice(plan.price), [plan.price]);

  const totalPrice = useMemo(() => {
    const addonsPrice = Object.keys(checkedAddons).reduce((total, addonId) => {
      if (checkedAddons[addonId]) {
        const addon = hardwareAddons.find((a) => a.id === addonId);
        return total + (addon?.price || 0);
      }
      return total;
    }, 0);
    return basePrice + addonsPrice;
  }, [basePrice, checkedAddons]);

  const handleAddonCheck = (addonId: string) => {
    setCheckedAddons((prev) => ({ ...prev, [addonId]: !prev[addonId] }));
  };

  const isTrial = plan.name === 'বিনামূল্যে ট্রায়াল';

  return (
    <Card
      className={cn(
        'flex flex-col rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105',
        plan.isPopular ? 'border-primary border-2 relative' : ''
      )}
    >
      {plan.isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 font-bangla">
          সবচেয়ে জনপ্রিয়
        </Badge>
      )}
      {billingCycle === 'yearly' && !isTrial && (
        <div className="absolute top-2 right-2 rotate-12">
          <span className="inline-block bg-red-500 text-white text-xs font-bold font-bangla px-3 py-1 rounded-full uppercase shadow-md">
            ফ্রি ইনস্টলেশন
          </span>
        </div>
      )}
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-bold font-bangla">{plan.name}</CardTitle>
        <CardDescription className="text-base text-muted-foreground font-bangla h-12">
          {plan.description}
        </CardDescription>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-4xl font-extrabold tracking-tight">
            {plan.price}
          </span>
          <span className="text-sm font-medium text-muted-foreground font-bangla">
            {plan.period}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6 pt-0">
        <ul className="space-y-3 font-bangla">
          {plan.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-3 shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-6 pt-0">
        {!isTrial && (
          <div className="border-t w-full mt-4 pt-4 text-sm text-muted-foreground">
            <p className="font-bangla font-semibold mb-2 text-foreground">
              হার্ডওয়্যার অ্যাড-অনস:
            </p>
            <ul className="space-y-3 font-bangla">
              {hardwareAddons.map((addon) => (
                <li key={addon.id} className="flex items-center">
                  <Checkbox
                    id={`${plan.name}-${addon.id}`}
                    onCheckedChange={() => handleAddonCheck(addon.id)}
                    className="mr-3"
                  />
                  <Label
                    htmlFor={`${plan.name}-${addon.id}`}
                    className="flex items-center cursor-pointer text-sm w-full"
                  >
                    {addon.icon}
                    <span>{addon.name}</span>
                    {addon.price > 0 && (
                      <span className="ml-auto font-semibold text-primary">
                        + {formatPrice(addon.price)}
                      </span>
                    )}
                  </Label>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="w-full mt-6">
           {!isTrial && (
             <div className="text-center mb-4 p-2 rounded-lg bg-muted">
               <span className="font-bangla font-semibold text-foreground">সর্বমোট মূল্য: </span>
               <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</span>
               <span className="text-sm font-medium text-muted-foreground font-bangla">
                  {billingCycle === 'monthly' ? '/মাস' : '/বছর'}
                </span>
             </div>
           )}
          <Button
            className="w-full font-bangla"
            variant={plan.isPopular ? 'default' : 'outline'}
          >
            {plan.cta}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};


const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const plans = pricingPlans[billingCycle];

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
        <div className="flex justify-center items-center gap-4 my-8">
          <Label htmlFor="billing-cycle" className="font-bangla text-lg">মাসিক</Label>
          <Switch
            id="billing-cycle"
            checked={billingCycle === 'yearly'}
            onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
          />
          <Label htmlFor="billing-cycle" className="font-bangla text-lg">বার্ষিক (২ মাস ছাড়!)</Label>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2 justify-center items-stretch">
          {plans.map((plan, index) => (
             <PricingCard key={index} plan={plan} billingCycle={billingCycle} />
          ))}
        </div>
        <div className="text-center mt-12 space-y-4">
            <Button size="lg" variant="outline">
                <span className="font-bangla text-lg">ডেমোর জন্য অনুরোধ করুন</span>
            </Button>
            <p className="text-muted-foreground font-bangla">
            কাস্টম প্ল্যান প্রয়োজন? এন্টারপ্রাইজ সমাধানের জন্য <a href="mailto:contact@oushodcloud.com" className="text-primary hover:underline font-medium">আমাদের সাথে যোগাযোগ করুন</a>।
            </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
