import { z } from 'zod';

const loginSchema = z.object({
    phone_number: z.string({
        invalid_type_error: 'Phone Number must be a string',
      }),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(6)
      .max(255),
  });

  const adminLoginSchema = z.object({
    email: z.string({
        invalid_type_error: 'Email must be a string',
      }),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(6)
      .max(255),
  })

  export  {loginSchema, adminLoginSchema};