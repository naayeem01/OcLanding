'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
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
import { initiatePayment } from '@/app/actions/payment';

const hardwareAddons: { [key: string]: { name: string; price: number } } = {
  barcodeScanner: { name: 'বারকোড স্ক্যানার', price: 1499 },
  posPrinter: { name: 'পস প্রিন্টার', price: 3999 },
};

const formSchema = z.object({
  name: z.string().min(1, 'নাম প্রয়োজন'),
  email: z.string().email('সঠিক ইমেল ঠিকানা লিখুন'),
  phone: z.string().min(11, 'সঠিক ফোন নম্বর লিখুন'),
  address: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

export default function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

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
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      const paymentDetails = {
        full_name: data.name,
        email: data.email,
        amount: parseFloat(totalPrice),
        metadata: {
          planName,
          totalPrice,
          addons: addons.map(key => hardwareAddons[key].name),
          planPrice,
          period,
          phone: data.phone,
          address: data.address
        },
      };

      const result = await initiatePayment(paymentDetails);

      if (result.payment_url) {
        router.push(result.payment_url);
      } else {
        throw new Error('Failed to get payment URL');
      }

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'একটি ত্রুটি ঘটেছে।',
        description:
          'আপনার পেমেন্ট শুরু করার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন.',
      });
    }
  };


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
                <Button type="submit" className="w-full font-bangla" size="lg" disabled={form.formState.isSubmitting}>
                   {form.formState.isSubmitting ? 'পেমেন্ট করা হচ্ছে...' : 'পেমেন্ট করুন'}
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
      </div>
    </div>
  );
}
