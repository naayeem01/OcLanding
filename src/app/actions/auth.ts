
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authenticate(credentials: z.infer<typeof LoginSchema>) {
  const parsedCredentials = LoginSchema.safeParse(credentials);

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;
    
    // In a real application, you'd look up the user in a database.
    // Here, we're using environment variables for simplicity.
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      cookies().set('auth', 'true', { httpOnly: true, path: '/' });
      return { success: true, message: 'Authentication successful' };
    }
  }

  return { success: false, message: 'Invalid credentials' };
}
