'use client';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from '@/components/sections/checkout-form';
import { Suspense } from 'react';
import FloatingHelpButton from '@/components/ui/floating-help-button';

function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutForm />
      </Suspense>
      <FloatingHelpButton />
    </div>
  );
}

export default function CheckoutPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPage />
    </Suspense>
  )
}
