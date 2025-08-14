'use server';
import { z } from 'zod';
import { createManualOrder, processOrder } from './order';
import { randomUUID } from 'crypto';

const uddoktaPayApiKey = process.env.UDDOKTAPAY_API_KEY;
const uddoktaPayBaseUrl = process.env.UDDOKTAPAY_BASE_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const PaymentDetailsSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  amount: z.number(),
  metadata: z.object({
    planName: z.string(),
    totalPrice: z.string(),
    addons: z.array(z.string()),
    planPrice: z.string(),
    period: z.string(),
    phone: z.string(),
    address: z.string().optional(),
  }),
});

type PaymentDetails = z.infer<typeof PaymentDetailsSchema>;

const ManualPaymentDetailsSchema = PaymentDetailsSchema.extend({
  metadata: PaymentDetailsSchema.shape.metadata.extend({
    paymentMethod: z.string(),
    transactionId: z.string(),
  })
});

type ManualPaymentDetails = z.infer<typeof ManualPaymentDetailsSchema>;


export async function initiatePayment(details: PaymentDetails) {
  const validation = PaymentDetailsSchema.safeParse(details);
  if (!validation.success) {
    throw new Error('Invalid payment details');
  }

  const payload = {
    ...validation.data,
    redirect_url: `${appUrl}/order-confirmation`,
    cancel_url: `${appUrl}/checkout`,
    return_type: 'GET',
  };

  try {
    const response = await fetch(`${uddoktaPayBaseUrl}/checkout-v2`, {
      method: 'POST',
      headers: {
        'RT-UDDOKTAPAY-API-KEY': uddoktaPayApiKey || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    
    if (response.ok && data.status === true && data.payment_url) {
      return { payment_url: data.payment_url };
    } else {
      console.error('UddoktaPay Error:', data);
      throw new Error(data.message || 'Payment initiation failed');
    }
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw new Error('Failed to initiate payment');
  }
}

export async function processManualPayment(details: ManualPaymentDetails) {
  const validation = ManualPaymentDetailsSchema.safeParse(details);
  if (!validation.success) {
    throw new Error('Invalid manual payment details');
  }
  const { full_name, email, metadata } = validation.data;
  const { planName, totalPrice, addons, planPrice, period, phone, address, paymentMethod, transactionId } = metadata;
  
  const orderDetails = {
      orderNumber: `manual-${randomUUID()}`,
      name: full_name,
      email,
      phone,
      address,
      planName,
      totalPrice,
      addons,
      planPrice,
      period,
      paymentMethod,
      transactionId,
  };

  const result = await createManualOrder(orderDetails);
  if (result.success) {
      return { success: true, order: result.order };
  } else {
      throw new Error('Failed to create manual order');
  }
}


export async function verifyPayment(invoiceId: string) {
    try {
        const response = await fetch(`${uddoktaPayBaseUrl}/verify-payment`, {
            method: 'POST',
            headers: {
                'RT-UDDOKTAPAY-API-KEY': uddoktaPayApiKey || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ invoice_id: invoiceId }),
        });

        const data = await response.json();
        
        if (response.ok && data.status === 'COMPLETED') {
             // Payment is successful, send SMS and update local file
            const metadata = data.metadata;
            const customer = data.customer;
            
            await processOrder({
                orderNumber: data.invoice_id,
                name: customer.full_name,
                email: customer.email,
                phone: metadata.phone,
                address: metadata.address,
                planName: metadata.planName,
                totalPrice: data.amount,
                addons: metadata.addons,
                planPrice: metadata.planPrice,
                period: metadata.period,
            });

            return { success: true, message: 'Payment verified successfully.', data };
        } else {
            return { success: false, message: data.message || 'Payment verification failed.' };
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        throw new Error('Failed to verify payment.');
    }
}
