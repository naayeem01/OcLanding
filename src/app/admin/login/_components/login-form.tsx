
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { authenticate } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email('সঠিক ইমেল ঠিকানা লিখুন'),
  password: z.string().min(1, 'পাসওয়ার্ড প্রয়োজন'),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await authenticate(data);
      if (result.success) {
        toast({ title: 'লগইন সফল হয়েছে' });
        router.push('/admin/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'লগইন ব্যর্থ হয়েছে',
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'একটি ত্রুটি ঘটেছে।',
        description: 'লগইন করার সময় একটি ত্রুটি ঘটেছে।',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bangla">ইমেল</FormLabel>
              <FormControl>
                <Input type="email" placeholder="আপনার ইমেল" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bangla">পাসওয়ার্ড</FormLabel>
              <FormControl>
                <Input type="password" placeholder="আপনার পাসওয়ার্ড" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-bangla" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'লগইন করা হচ্ছে...' : 'লগইন করুন'}
        </Button>
      </form>
    </Form>
  );
}
