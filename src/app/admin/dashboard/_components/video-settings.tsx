
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { updateVideoSectionConfig, VideoSectionConfig } from '@/app/actions/site-config';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  isEnabled: z.boolean(),
  videoUrl: z.string().url('অনুগ্রহ করে একটি সঠিক ইউটিউব এমবেড URL লিখুন।').or(z.literal('')),
});

type FormValues = z.infer<typeof FormSchema>;

export default function VideoSettings({ initialConfig }: { initialConfig: VideoSectionConfig }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isEnabled: initialConfig.isEnabled || false,
      videoUrl: initialConfig.videoUrl || '',
    },
  });

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      const result = await updateVideoSectionConfig(data);
      if (result.success) {
        toast({ title: 'সেটিংস আপডেট হয়েছে', description: 'ভিডিও বিভাগের সেটিংস সফলভাবে সেভ করা হয়েছে।' });
        router.refresh(); // Refresh the page to reflect changes
      } else {
        toast({ variant: 'destructive', title: 'ত্রুটি', description: result.error });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bangla">ভিডিও বিভাগ সেটিংস</CardTitle>
        <CardDescription className="font-bangla">হোমপেজের ভিডিও বিভাগটি পরিচালনা করুন।</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="isEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-bangla">ভিডিও বিভাগ সক্রিয় করুন</FormLabel>
                    <FormDescription className="font-bangla">
                      এটি চালু করলে হোমপেজে ভিডিও বিভাগটি দেখানো হবে।
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bangla">ইউটিউব ভিডিও এমবেড URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.youtube.com/embed/your-video-id" {...field} className="font-bangla"/>
                  </FormControl>
                  <FormDescription className='font-bangla'>
                    এখানে আপনার ইউটিউব ভিডিওর এমবেড লিংক দিন। যেমন: https://www.youtube.com/embed/VIDEO_ID
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="font-bangla" disabled={isPending}>
              {isPending ? 'সেভ হচ্ছে...' : 'সেটিংস সেভ করুন'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
