'use client';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Suspense } from 'react';

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const plan = searchParams.get('plan');
    const totalPrice = searchParams.get('totalPrice');

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center items-center">
        <Card className="w-full max-w-lg text-center">
            <CardHeader>
            <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold font-bangla">অর্ডার সম্পন্ন হয়েছে!</CardTitle>
            <CardDescription className="text-lg text-muted-foreground font-bangla">
                ধন্যবাদ, {name}! আপনার অর্ডারটি আমরা গ্রহণ করেছি।
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <p className="font-bangla text-lg">
                আপনি সফলভাবে <strong>{plan}</strong> প্ল্যানটি সাবস্ক্রাইব করেছেন।
            </p>
            <p className="font-bangla text-2xl font-bold">
                সর্বমোট মূল্য: ৳{totalPrice}
            </p>
            <p className="font-bangla text-muted-foreground">
                আপনার প্রদত্ত ফোন নম্বরে একটি কনফার্মেশন বার্তা পাঠানো হয়েছে। আমাদের একজন প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।
            </p>
            </CardContent>
        </Card>
        </div>
    );
}


export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderConfirmationContent />
        </Suspense>
    )
}
