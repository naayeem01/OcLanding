
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, Loader2, Clock } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { verifyPayment } from '../actions/payment';
import { useToast } from '@/hooks/use-toast';
import { Order } from '../actions/order';

function OrderConfirmationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const invoiceId = searchParams.get('invoice_id');
    const manualOrderData = searchParams.get('order');
    const { toast } = useToast();

    const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'error' | 'pending'>('loading');
    const [orderDetails, setOrderDetails] = useState<any>(null);

    useEffect(() => {
        if (manualOrderData) {
            try {
                const order: Order = JSON.parse(manualOrderData);
                setOrderDetails({
                    customer: { full_name: order.name },
                    metadata: { planName: 'N/A' }, // Plan name not passed for manual, adjust if needed
                    amount: order.totalPrice,
                });
                setStatus('pending');
            } catch (e) {
                setStatus('error');
            }
            return;
        }


        if (!invoiceId) {
            router.push('/');
            return;
        }

        const checkPaymentStatus = async () => {
            try {
                const result = await verifyPayment(invoiceId);
                if (result.success) {
                    setStatus('success');
                    setOrderDetails(result.data);
                } else {
                    setStatus('failed');
                    toast({
                        variant: 'destructive',
                        title: 'Payment Failed',
                        description: result.message,
                    });
                }
            } catch (error) {
                setStatus('error');
                 toast({
                    variant: 'destructive',
                    title: 'Verification Error',
                    description: 'There was an error verifying your payment. Please contact support.',
                });
            }
        };

        checkPaymentStatus();
    }, [invoiceId, router, toast, manualOrderData]);

    if (status === 'loading') {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center items-center text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="ml-4 text-lg font-bangla">আপনার পেমেন্ট যাচাই করা হচ্ছে...</p>
            </div>
        );
    }
    
    if (status === 'error' || status === 'failed') {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center items-center">
                 <Card className="w-full max-w-lg text-center">
                    <CardHeader>
                    <div className="mx-auto bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                        <AlertTriangle className="h-10 w-10 text-red-600" />
                    </div>
                    <CardTitle className="text-3xl font-bold font-bangla">পেমেন্ট ব্যর্থ হয়েছে</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground font-bangla">
                       আপনার পেমেন্ট সম্পন্ন করা যায়নি।
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="font-bangla text-muted-foreground">
                            অনুগ্রহ করে আবার চেষ্টা করুন অথবা সাপোর্টে যোগাযোগ করুন।
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (status === 'pending') {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center items-center">
                <Card className="w-full max-w-lg text-center">
                    <CardHeader>
                    <div className="mx-auto bg-yellow-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                        <Clock className="h-10 w-10 text-yellow-600" />
                    </div>
                    <CardTitle className="text-3xl font-bold font-bangla">অর্ডার বিচারাধীন!</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground font-bangla">
                        ধন্যবাদ, {orderDetails?.customer?.full_name}! আপনার অর্ডারটি আমরা পেয়েছি।
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <p className="font-bangla text-lg">
                        আপনার পেমেন্ট যাচাই করার পর আমরা আপনার অর্ডারটি সম্পন্ন করব।
                    </p>
                    <p className="font-bangla text-2xl font-bold">
                        সর্বমোট মূল্য: ৳{orderDetails?.totalPrice || orderDetails?.amount}
                    </p>
                    <p className="font-bangla text-muted-foreground">
                        আমাদের একজন প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।
                    </p>
                    </CardContent>
                </Card>
            </div>
        );
    }


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center items-center">
        <Card className="w-full max-w-lg text-center">
            <CardHeader>
            <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold font-bangla">অর্ডার সম্পন্ন হয়েছে!</CardTitle>
            <CardDescription className="text-lg text-muted-foreground font-bangla">
                ধন্যবাদ, {orderDetails?.customer?.full_name}! আপনার অর্ডারটি আমরা গ্রহণ করেছি।
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <p className="font-bangla text-lg">
                আপনি সফলভাবে <strong>{orderDetails?.metadata?.planName}</strong> প্ল্যানটি সাবস্ক্রাইব করেছেন।
            </p>
            <p className="font-bangla text-2xl font-bold">
                সর্বমোট মূল্য: ৳{orderDetails?.amount}
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
