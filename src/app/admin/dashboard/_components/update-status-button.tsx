'use client';

import { updateOrderStatus } from '@/app/actions/order';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function UpdateStatusButton({ orderNumber, currentStatus }: { orderNumber: string, currentStatus: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const handleClick = () => {
        startTransition(async () => {
            const result = await updateOrderStatus(orderNumber, 'Completed');
            if(result.success) {
                toast({ title: 'স্ট্যাটাস আপডেট হয়েছে' });
                router.refresh();
            } else {
                toast({ variant: 'destructive', title: 'ত্রুটি', description: result.error });
            }
        });
    };

    if (currentStatus === 'Completed') {
        return null;
    }

    return (
        <Button onClick={handleClick} disabled={isPending} size="sm" className='font-bangla'>
            {isPending ? 'আপডেট হচ্ছে...' : 'সম্পন্ন করুন'}
        </Button>
    );
}
