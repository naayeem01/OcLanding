'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const hardwareAddons: { [key: string]: { name: string; price: number } } = {
  barcodeScanner: { name: 'বারকোড স্ক্যানার', price: 1499 },
  posPrinter: { name: 'পস প্রিন্টার', price: 3999 },
};

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'N/A';
  const totalPrice = searchParams.get('totalPrice') || '0';
  const addons = searchParams.get('addons')?.split(',') || [];
  const planPrice = searchParams.get('planPrice') || '0';
  const period = searchParams.get('period') || '';

  const hasAddons = addons.length > 0 && addons[0] !== '';

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="text-3xl font-bold mb-6 font-bangla">চেকআউট</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-bangla">অর্ডার তথ্য</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="font-bangla">
                আপনার নাম
              </Label>
              <Input id="name" placeholder="আপনার সম্পূর্ণ নাম" className="font-bangla" />
            </div>
            <div>
              <Label htmlFor="email" className="font-bangla">
                আপনার ইমেল
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="আপনার ইমেল ঠিকানা"
                className="font-bangla"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="font-bangla">
                ফোন নম্বর
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="আপনার ফোন নম্বর"
                className="font-bangla"
              />
            </div>
            {hasAddons && (
              <div>
                <Label htmlFor="address" className="font-bangla">
                  ডেলিভারি ঠিকানা
                </Label>
                <Input
                  id="address"
                  placeholder="আপনার ডেলিভারি ঠিকানা"
                  className="font-bangla"
                />
              </div>
            )}
            <Button className="w-full font-bangla" size="lg">
              অর্ডার সম্পন্ন করুন
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="bg-card p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 font-bangla">আপনার অর্ডার</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-bangla text-muted-foreground">
              প্ল্যান: {planName} ({period})
            </span>
            <span className="font-bangla">৳{planPrice}</span>
          </div>
          {hasAddons && (
            <>
              <Separator />
              <h3 className="font-bold font-bangla">হার্ডওয়্যার অ্যাড-অনস</h3>
              {addons.map((addonKey) => {
                const addon = hardwareAddons[addonKey];
                return (
                  addon && (
                    <div key={addonKey} className="flex justify-between">
                      <span className="font-bangla text-muted-foreground">
                        {addon.name}
                      </span>
                      <span className="font-bangla">৳{addon.price}</span>
                    </div>
                  )
                );
              })}
            </>
          )}
          <Separator />
          <div className="flex justify-between text-xl font-bold">
            <span className="font-bangla">সর্বমোট মূল্য</span>
            <span className="font-bangla">৳{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
