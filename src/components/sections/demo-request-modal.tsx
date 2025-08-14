
'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { submitDemoRequest } from '@/ai/flows/demo-request-flow';

const formSchema = z.object({
  name: z.string().min(1, 'নাম প্রয়োজন'),
  pharmacyName: z.string().min(1, 'ফার্মেসির নাম প্রয়োজন'),
  phone: z.string().min(1, 'ফোন নম্বর প্রয়োজন'),
  address: z.string().min(1, 'ঠিকানা প্রয়োজন'),
});

type DemoRequestFormValues = z.infer<typeof formSchema>;

export default function DemoRequestModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<DemoRequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      pharmacyName: '',
      phone: '',
      address: '',
    },
  });

  const onSubmit = async (data: DemoRequestFormValues) => {
    try {
      await submitDemoRequest(data);
      toast({
        title: ' অনুরোধ সফল হয়েছে',
        description:
          'আপনার ডেমো অনুরোধ সফলভাবে জমা দেওয়া হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'একটি ত্রুটি ঘটেছে।',
        description:
          'আপনার ডেমো অনুরোধ জমা দেওয়ার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bangla text-2xl">
            ডেমোর জন্য অনুরোধ করুন
          </DialogTitle>
          <DialogDescription className="font-bangla">
            অনুগ্রহ করে নিচের ফর্মটি পূরণ করুন এবং আমরা শীঘ্রই আপনার সাথে যোগাযোগ
            করব।
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bangla">আপনার নাম</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="এখানে আপনার নাম লিখুন"
                      {...field}
                      className="font-bangla"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pharmacyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bangla">ফার্মেসির নাম</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="এখানে ফার্মেসির নাম লিখুন"
                      {...field}
                      className="font-bangla"
                    />
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
                    <Input
                      placeholder="এখানে আপনার ফোন নম্বর লিখুন"
                      {...field}
                      className="font-bangla"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bangla">ঠিকানা</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="এখানে আপনার ঠিকানা লিখুন"
                      {...field}
                      className="font-bangla"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full font-bangla"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? 'জমা হচ্ছে...'
                : 'অনুরোধ জমা দিন'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
