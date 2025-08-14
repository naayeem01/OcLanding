'use server';

import request from 'request';
import { z } from 'zod';

const OrderDetailsSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string().optional(),
  planName: z.string(),
  totalPrice: z.string(),
  addons: z.array(z.string()),
  planPrice: z.string(),
  period: z.string(),
});

type OrderDetails = z.infer<typeof OrderDetailsSchema>;

export async function submitOrder(details: OrderDetails) {
  const validation = OrderDetailsSchema.safeParse(details);
  if (!validation.success) {
    throw new Error('Invalid order details');
  }

  const { name, phone, planName, totalPrice } = validation.data;

  const message = `Thanks for your order, ${name}! Your order for OushodCloud ${planName} plan is confirmed. Total amount: BDT ${totalPrice}.`;

  const options = {
    method: 'POST',
    url: 'https://api.sms.net.bd/sendsms',
    formData: {
      api_key: process.env.SMS_NET_BD_API_KEY,
      msg: message,
      to: phone,
    },
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) {
        console.error('SMS API Error:', error);
        return reject(new Error(error.message));
      }
      console.log('SMS API Response:', response.body);
      resolve(response.body);
    });
  });
}
