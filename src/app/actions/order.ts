
'use server';

import request from 'request';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

const OrderDetailsSchema = z.object({
  orderNumber: z.string(),
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

const ManualOrderDetailsSchema = OrderDetailsSchema.extend({
  paymentMethod: z.string(),
  transactionId: z.string(),
});
type ManualOrderDetails = z.infer<typeof ManualOrderDetailsSchema>;


const OrderSchema = z.object({
  orderNumber: z.string(),
  name: z.string(),
  phone: z.string(),
  date: z.string(),
  status: z.string(), // 'Completed', 'Pending'
  paymentMethod: z.string().optional(),
  transactionId: z.string().optional(),
  totalPrice: z.string().optional(),
});
export type Order = z.infer<typeof OrderSchema>;

const ordersFilePath = path.join(process.cwd(), 'data', 'orders.json');

async function getOrdersFromFile(): Promise<Order[]> {
    try {
        await fs.access(ordersFilePath);
        const data = await fs.readFile(ordersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If the file doesn't exist, return an empty array
        return [];
    }
}

async function saveOrdersToFile(orders: Order[]) {
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), 'utf-8');
}


async function sendSms(details: OrderDetails) {
  const { name, phone, planName, totalPrice } = details;
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

async function appendToLocalFile(details: OrderDetails) {
  try {
    const orders = await getOrdersFromFile();
    const newOrder: Order = {
      orderNumber: details.orderNumber,
      name: details.name,
      phone: details.phone,
      date: new Date().toISOString(),
      status: 'Completed',
      totalPrice: details.totalPrice,
    };
    orders.push(newOrder);
    await saveOrdersToFile(orders);
    console.log('Appended to local file successfully');
  } catch (error) {
    console.error('Error appending to local file:', error);
    // We don't re-throw the error to not fail the whole process if the file write fails
  }
}

export async function processOrder(details: OrderDetails) {
  const validation = OrderDetailsSchema.safeParse(details);
  if (!validation.success) {
    throw new Error('Invalid order details');
  }

  const validatedDetails = validation.data;

  // Run both in parallel
  await Promise.all([
    sendSms(validatedDetails),
    appendToLocalFile(validatedDetails),
  ]);
}

export async function createManualOrder(details: ManualOrderDetails) {
  const validation = ManualOrderDetailsSchema.safeParse(details);
  if (!validation.success) {
    throw new Error('Invalid manual order details');
  }
  const validatedDetails = validation.data;
  const orders = await getOrdersFromFile();
  const newOrder: Order = {
      orderNumber: validatedDetails.orderNumber,
      name: validatedDetails.name,
      phone: validatedDetails.phone,
      date: new Date().toISOString(),
      status: 'Pending',
      paymentMethod: validatedDetails.paymentMethod,
      transactionId: validatedDetails.transactionId,
      totalPrice: validatedDetails.totalPrice,
  };
  orders.push(newOrder);
  await saveOrdersToFile(orders);
  return { success: true, order: newOrder };
}

export async function getOrders(): Promise<{orders: Order[], error?: string}> {
  try {
    const orders = await getOrdersFromFile();
    return { orders: orders.reverse() }; // Show most recent first
  } catch (error) {
    console.error('Error fetching from local file:', error);
    return { orders: [], error: 'Failed to fetch orders.' };
  }
}

export async function updateOrderStatus(orderNumber: string, status: 'Completed' | 'Pending'): Promise<{success: boolean, error?: string}> {
    try {
        const orders = await getOrdersFromFile();
        const orderIndex = orders.findIndex(o => o.orderNumber === orderNumber);

        if (orderIndex === -1) {
            return { success: false, error: 'Order not found' };
        }

        orders[orderIndex].status = status;
        await saveOrdersToFile(orders);
        return { success: true };
    } catch (error) {
        console.error('Error updating order status:', error);
        return { success: false, error: 'Failed to update order status.' };
    }
}
