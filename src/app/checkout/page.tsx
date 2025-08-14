import CheckoutForm from '@/components/sections/checkout-form';
import { Suspense } from 'react';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutForm />
      </Suspense>
    </div>
  );
}
