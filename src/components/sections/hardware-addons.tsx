import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';

const hardware = [
  {
    name: 'বারকোড স্ক্যানার',
    price: '৳১,৪৯৯',
    image: 'https://www.startech.com.bd/image/cache/catalog/scanner/winson/wnl-1051/wnl-1051-02-500x500.jpg',
    dataAiHint: 'barcode scanner',
    description: 'দ্রুত এবং নির্ভুলভাবে পণ্য স্ক্যান করে আপনার বিলিং প্রক্রিয়াটিকে আরও দ্রুত করুন।',
  },
  {
    name: 'পস প্রিন্টার',
    price: 'আলোচনা সাপেক্ষ',
    image: 'https://www.startech.com.bd/image/cache/catalog/printer/rongta/rp58e-u/rp58e-u-1-500x500.jpg',
    dataAiHint: 'pos printer',
    description: 'সহজেই পাঠযোগ্য এবং প্রফেশনাল মানের রশিদ প্রিন্ট করুন।',
  },
];

const HardwareAddons = () => {
  return (
    <section id="hardware-addons" className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-bangla">
            হার্ডওয়্যার অ্যাড-অনস
          </h2>
          <p className="mt-4 text-xl text-muted-foreground font-bangla">
            আপনার ফার্মেসির কার্যকারিতা বাড়াতে প্রয়োজনীয় হার্ডওয়্যার।
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {hardware.map((item, index) => (
            <Card key={index} className="flex flex-col md:flex-row items-center overflow-hidden glow-card">
              <div className="md:w-1/3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={600}
                  height={400}
                  data-ai-hint={item.dataAiHint}
                  className="object-cover w-full h-48 md:h-full"
                />
              </div>
              <div className="md:w-2/3">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-bangla">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-bangla mb-4">{item.description}</p>
                  <p className="text-3xl font-bold text-primary mb-4">{item.price}</p>
                  <Button>
                    <ShoppingCart className="mr-2" />
                    <span className="font-bangla">অর্ডার করুন</span>
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HardwareAddons;
