'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { initiatePayment, processManualPayment } from '@/app/actions/payment';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const hardwareAddons: { [key: string]: { name: string; price: number } } = {
  barcodeScanner: { name: 'বারকোড স্ক্যানার', price: 1499 },
  posPrinter: { name: 'পস প্রিন্টার', price: 3999 },
};

const formSchema = z.object({
  name: z.string().min(1, 'নাম প্রয়োজন'),
  email: z.string().email('সঠিক ইমেল ঠিকানা লিখুন'),
  phone: z.string().min(11, 'সঠিক ফোন নম্বর লিখুন'),
  address: z.string().optional(),
  paymentGateway: z.enum(['online', 'manual']),
  manualPaymentMethod: z.string().optional(),
  transactionId: z.string().optional(),
}).refine(data => {
    if (data.paymentGateway === 'manual') {
        return !!data.manualPaymentMethod && !!data.transactionId;
    }
    return true;
}, {
    message: "ম্যানুয়াল পেমেন্টের জন্য পেমেন্ট পদ্ধতি এবং ট্রানজেকশন আইডি প্রয়োজন",
    path: ['manualPaymentMethod']
});


type CheckoutFormValues = z.infer<typeof formSchema>;

export default function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [showManualFields, setShowManualFields] = useState(false);

  const planName = searchParams.get('plan') || 'N/A';
  const totalPrice = searchParams.get('totalPrice') || '0';
  const addons = searchParams.get('addons')?.split(',').filter(a => a) || [];
  const planPrice = searchParams.get('planPrice') || '0';
  const period = searchParams.get('period') || '';

  const hasAddons = addons.length > 0;
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      paymentGateway: 'online',
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
        const commonMetadata = {
            planName,
            totalPrice,
            addons: addons.map(key => hardwareAddons[key]?.name).filter(Boolean),
            planPrice,
            period,
            phone: data.phone,
            address: data.address,
        };

        if (data.paymentGateway === 'online') {
            const paymentDetails = {
                full_name: data.name,
                email: data.email,
                amount: parseFloat(totalPrice),
                metadata: commonMetadata,
            };
            const result = await initiatePayment(paymentDetails);
            if (result.payment_url) {
                router.push(result.payment_url);
            } else {
                throw new Error('Failed to get payment URL');
            }
        } else {
            // Manual Payment
            const manualPaymentDetails = {
                 full_name: data.name,
                 email: data.email,
                 amount: parseFloat(totalPrice),
                 metadata: {
                     ...commonMetadata,
                     paymentMethod: data.manualPaymentMethod || '',
                     transactionId: data.transactionId || '',
                 }
            }
            const result = await processManualPayment(manualPaymentDetails);
            if(result.success && result.order) {
                router.push(`/order-confirmation?order=${encodeURIComponent(JSON.stringify(result.order))}`);
            } else {
                 throw new Error('Failed to process manual payment');
            }
        }

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'একটি ত্রুটি ঘটেছে।',
        description:
          'আপনার অর্ডার প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন.',
      });
    }
  };

  const paymentGateway = form.watch('paymentGateway');

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="text-3xl font-bold mb-6 font-bangla">চেকআউট</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-bangla">অর্ডার তথ্য</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bangla">আপনার নাম</FormLabel>
                      <FormControl>
                        <Input placeholder="আপনার সম্পূর্ণ নাম" {...field} className="font-bangla" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bangla">আপনার ইমেল</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="আপনার ইমেল ঠিকানা" {...field} className="font-bangla" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bangla">ফোন নম্বর</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="আপনার ফোন নম্বর" {...field} className="font-bangla" />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                {hasAddons && (
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bangla">ডেলিভারি ঠিকানা</FormLabel>
                        <FormControl>
                          <Input placeholder="আপনার ডেলিভারি ঠিকানা" {...field} className="font-bangla" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="paymentGateway"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-bangla">পেমেন্ট পদ্ধতি</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="online" />
                            </FormControl>
                            <FormLabel className="font-normal font-bangla">
                              অনলাইন পেমেন্ট
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="manual" />
                            </FormControl>
                            <FormLabel className="font-normal font-bangla">
                              ম্যানুয়াল পেমেন্ট (বিকাশ, নগদ)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className={cn("space-y-4 transition-all duration-300", paymentGateway === 'manual' ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden')}>
                    <FormField
                      control={form.control}
                      name="manualPaymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bangla">পেমেন্ট মাধ্যম</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger className="font-bangla">
                                    <SelectValue placeholder="একটি মাধ্যম নির্বাচন করুন" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="bkash" className='font-bangla'>বিকাশ</SelectItem>
                                    <SelectItem value="nagad" className='font-bangla'>নগদ</SelectItem>
                                    <SelectItem value="rocket" className='font-bangla'>রকেট</SelectItem>
                                </SelectContent>
                            </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transactionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bangla">ট্রানজেকশন আইডি</FormLabel>
                          <FormControl>
                            <Input placeholder="ট্রানজেকশন আইডি লিখুন" {...field} className="font-bangla" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>


                <Button type="submit" className="w-full font-bangla" size="lg" disabled={form.formState.isSubmitting}>
                   {form.formState.isSubmitting ? 'প্রসেসিং...' : 'অর্ডার কনফার্ম করুন'}
                </Button>
              </form>
            </Form>
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
         {paymentGateway === 'manual' && (
            <div className="mt-8 bg-muted p-4 rounded-lg">
                <h3 className="font-bold font-bangla text-lg mb-2">ম্যানুয়াল পেমেন্ট নির্দেশনা</h3>
                <p className="font-bangla text-sm">অনুগ্রহ করে নিচের নম্বরে <strong>৳{totalPrice}</strong> টাকা পাঠান এবং ট্রানজেকশন আইডিটি উপরের ফর্মে প্রদান করুন।</p>
                <p className="font-bangla text-sm mt-2"><strong>বিকাশ/নগদ/রকেট নম্বর:</strong> +8801577001441 (পার্সোনাল)</p>
            </div>
        )}
      </div>
    </div>
  );
}
