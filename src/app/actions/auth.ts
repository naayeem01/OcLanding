
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
    
    // For a production app, use environment variables.
    // For this example, we'll hardcode them for simplicity.
    const adminEmail = "admin@oushodcloud.com";
    const adminPassword = "password";

    if (email === adminEmail && password === adminPassword) {
      cookies().set('auth', 'true', { httpOnly: true, path: '/' });
      return { success: true, message: 'Authentication successful' };
    }
  }

  return { success: false, message: 'Invalid credentials' };
}
