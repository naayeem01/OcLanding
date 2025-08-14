
'use server';
/**
 * @fileOverview A flow to handle demo requests.
 *
 * - submitDemoRequest - A function that handles the demo request submission.
 * - DemoRequestInput - The input type for the submitDemoRequest function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DemoRequestInputSchema = z.object({
  name: z.string().describe('The name of the person requesting the demo.'),
  pharmacyName: z
    .string()
    .describe('The name of the pharmacy requesting the demo.'),
  phone: z.string().describe('The phone number of the person.'),
  address: z.string().describe('The address of the pharmacy.'),
});

export type DemoRequestInput = z.infer<typeof DemoRequestInputSchema>;

export async function submitDemoRequest(
  input: DemoRequestInput
): Promise<void> {
  return demoRequestFlow(input);
}

const demoRequestFlow = ai.defineFlow(
  {
    name: 'demoRequestFlow',
    inputSchema: DemoRequestInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    // In a real application, you would integrate with an email service
    // like SendGrid, Nodemailer, or Resend to send an email.
    // For now, we will just log the details to the console.
    console.log('New Demo Request Received:');
    console.log(`Name: ${input.name}`);
    console.log(`Pharmacy Name: ${input.pharmacyName}`);
    console.log(`Phone: ${input.phone}`);
    console.log(`Address: ${input.address}`);
    console.log('Email would be sent to: oushodcloud@gmail.com');
  }
);
