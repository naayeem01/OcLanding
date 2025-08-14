
'use client';

import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { setupDatabase } from '@/app/actions/db-setup';
import { useToast } from '@/hooks/use-toast';
import { Database } from 'lucide-react';

export default function DbSetupButton() {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleSetup = () => {
        startTransition(async () => {
            const result = await setupDatabase();
            if (result.success) {
                toast({
                    title: 'ডাটাবেস সেটআপ সফল',
                    description: 'প্রয়োজনীয় টেবিল সফলভাবে তৈরি করা হয়েছে।',
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'ডাটাবেস সেটআপ ব্যর্থ হয়েছে',
                    description: result.error || 'একটি অজানা ত্রুটি ঘটেছে।',
                });
            }
        });
    };

    return (
        <Button onClick={handleSetup} disabled={isPending} variant="outline">
            <Database className="mr-2 h-4 w-4" />
            {isPending ? 'সেটআপ চলছে...' : 'ডাটাবেস টেবিল তৈরি করুন'}
        </Button>
    );
}
