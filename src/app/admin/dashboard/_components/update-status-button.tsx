'use client';

import { OrderStatus, updateOrderStatus } from '@/app/actions/order';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const statuses: OrderStatus[] = [
    'Pending',
    'Processing',
    'On Hold',
    'Confirmed',
    'Device On The Way',
    'Device Delivered',
];

export default function UpdateStatusControl({ orderNumber, currentStatus }: { orderNumber: string, currentStatus: OrderStatus }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { toast } = useToast();
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(currentStatus);

    const handleUpdate = () => {
        startTransition(async () => {
            const result = await updateOrderStatus(orderNumber, selectedStatus);
            if(result.success) {
                toast({ title: 'স্ট্যাটাস আপডেট হয়েছে', description: `অর্ডার #${orderNumber} এখন ${selectedStatus}` });
                router.refresh();
            } else {
                toast({ variant: 'destructive', title: 'ত্রুটি', description: result.error });
            }
        });
    };
    
    return (
        <div className="flex items-center gap-2">
            <Select onValueChange={(value) => setSelectedStatus(value as OrderStatus)} defaultValue={currentStatus}>
                <SelectTrigger className="w-[180px] font-bangla">
                    <SelectValue placeholder="স্ট্যাটাস পরিবর্তন" />
                </SelectTrigger>
                <SelectContent>
                    {statuses.map(status => (
                        <SelectItem key={status} value={status} className='font-bangla'>{status}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button onClick={handleUpdate} disabled={isPending || selectedStatus === currentStatus} size="sm" className='font-bangla'>
                {isPending ? 'আপডেট হচ্ছে...' : 'আপডেট'}
            </Button>
        </div>
    );
}
