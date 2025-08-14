
'use server';

import request from 'request';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, doc, serverTimestamp, Timestamp, orderBy } from 'firebase/firestore';


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

const OrderStatusSchema = z.enum([
    'Pending',
    'Processing',
    'On Hold',
    'Confirmed',
    'Device On The Way',
    'Device Delivered',
]);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;


const OrderSchema = z.object({
  orderNumber: z.string(),
  name: z.string(),
  phone: z.string(),
  date: z.string(),
  status: OrderStatusSchema, 
  paymentMethod: z.string().optional().nullable(),
  transactionId: z.string().optional().nullable(),
  totalPrice: z.string().optional().nullable(),
});
export type Order = z.infer<typeof OrderSchema>;

async function sendSms(phone: string, message: string) {
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

async function sendWelcomeSms(details: OrderDetails) {
  const { name, phone, planName, totalPrice } = details;
  const message = `Thanks for your order, ${name}! Your order for OushodCloud ${planName} plan is confirmed. Total amount: BDT ${totalPrice}.`;
  await sendSms(phone, message);
}

async function sendStatusUpdateSms(phone: string, orderNumber: string, status: OrderStatus) {
    let message = '';
    switch (status) {
        case 'Processing':
            message = `Your OushodCloud order #${orderNumber} is now being processed. We will notify you once it's confirmed.`;
            break;
        case 'On Hold':
            message = `Your OushodCloud order #${orderNumber} is currently on hold. We will contact you shortly with more details.`;
            break;
        case 'Confirmed':
            message = `Great news! Your OushodCloud order #${orderNumber} has been confirmed.`;
            break;
        case 'Device On The Way':
            message = `Your hardware for OushodCloud order #${orderNumber} is on its way to you!`;
            break;
        case 'Device Delivered':
             message = `Your hardware for OushodCloud order #${orderNumber} has been delivered. Welcome to OushodCloud!`;
            break;
        default:
            // No message for 'Pending' or other statuses
            return;
    }
    await sendSms(phone, message);
}


async function saveOrderToDb(details: OrderDetails, status: OrderStatus, paymentMethod?: string, transactionId?: string) {
  try {
    await addDoc(collection(db, 'orders'), {
        orderNumber: details.orderNumber,
        name: details.name,
        phone: details.phone,
        date: serverTimestamp(),
        status: status,
        paymentMethod: paymentMethod || null,
        transactionId: transactionId || null,
        totalPrice: details.totalPrice,
        // Also save other details
        email: details.email,
        address: details.address || null,
        planName: details.planName,
        addons: details.addons,
        planPrice: details.planPrice,
        period: details.period,
    });
    console.log('Order saved to Firestore successfully');
  } catch (error) {
    console.error('Error saving order to Firestore:', error);
    throw new Error('Failed to save order to database.');
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
    sendWelcomeSms(validatedDetails),
    saveOrderToDb(validatedDetails, 'Confirmed'),
  ]);
}

export async function createManualOrder(details: ManualOrderDetails) {
  const validation = ManualOrderDetailsSchema.safeParse(details);
  if (!validation.success) {
    throw new Error('Invalid manual order details');
  }
  const validatedDetails = validation.data;
  await saveOrderToDb(validatedDetails, 'Pending', validatedDetails.paymentMethod, validatedDetails.transactionId);

  // Firestore creates a unique ID, we can't return the new order directly like with SQL.
  // The dashboard will refresh to show the new order.
  // For the confirmation page, we can pass the manually created details.
  const newOrder: Order = {
    ...validatedDetails,
    date: new Date().toISOString(),
    status: 'Pending'
  }

  return { success: true, order: newOrder };
}

export async function getOrders(): Promise<{orders: Order[], error?: string}> {
  try {
    const q = query(collection(db, "orders"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const date = (data.date as Timestamp)?.toDate() || new Date();
        return {
            ...data,
            date: date.toISOString(),
        } as Order;
    });

    return { orders };
  } catch (error) {
    console.error('Error fetching from firestore:', error);
    return { orders: [], error: 'Failed to fetch orders.' };
  }
}

export async function updateOrderStatus(orderNumber: string, status: OrderStatus): Promise<{success: boolean, error?: string}> {
    const validation = OrderStatusSchema.safeParse(status);
    if (!validation.success) {
        return { success: false, error: 'Invalid status provided' };
    }

    try {
        const q = query(collection(db, "orders"), where("orderNumber", "==", orderNumber));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return { success: false, error: "Order not found." };
        }
        
        const orderDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "orders", orderDoc.id), { status });

        const orderData = orderDoc.data();
        if (orderData) {
            await sendStatusUpdateSms(orderData.phone, orderNumber, status);
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating order status:', error);
        return { success: false, error: 'Failed to update order status.' };
    }
}
