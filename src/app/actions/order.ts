
'use server';

import request from 'request';
import { z } from 'zod';
import { google } from 'googleapis';

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

async function appendToSheet(details: OrderDetails) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Sheet1!A:E';

    const newRow = [
      details.orderNumber,
      details.name,
      details.phone,
      new Date().toISOString(),
      'Completed',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [newRow],
      },
    });
    console.log('Appended to Google Sheet successfully');
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    // We don't re-throw the error to not fail the whole process if sheets fails
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
    appendToSheet(validatedDetails),
  ]);
}


const OrderSchema = z.object({
  orderNumber: z.string(),
  name: z.string(),
  phone: z.string(),
  date: z.string(),
  status: z.string(),
});
export type Order = z.infer<typeof OrderSchema>;

export async function getOrders(): Promise<{orders: Order[], error?: string}> {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Sheet1!A2:E'; // Assuming row 1 is headers

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      const orders = rows.map((row) => ({
        orderNumber: row[0] || '',
        name: row[1] || '',
        phone: row[2] || '',
        date: row[3] || '',
        status: row[4] || '',
      })).filter(order => order.orderNumber); // Filter out empty rows
      return { orders: orders.reverse() }; // Show most recent first
    }
    return { orders: [] };
  } catch (error) {
    console.error('Error fetching from Google Sheet:', error);
    return { orders: [], error: 'Failed to fetch orders from Google Sheet.' };
  }
}
