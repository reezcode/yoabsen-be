import { z } from 'zod';

const staffSchema = z.object({
    code: z.number(),
    name: z.string(),
    email: z.string().optional(),
    id_position: z.number(),
    rel_position: z.string(),
    password: z.string().min(6).max(255),
    extra_salary: z.number().optional(),
    salary: z.number(),
    phone_number: z.string(),
    qr_link: z.string(),
    role: z.enum(['Admin', 'Staff'])
  });

  const staffUpdateSchema = z.object({
    code: z.number().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    id_position: z.number().optional(),
    rel_position: z.string().optional(),
    password: z.string().min(6).max(255).optional(),
    extra_salary: z.number().optional(),
    salary: z.number().optional(),
    phone_number: z.string().optional(),
    qr_link: z.string().optional(),
    role: z.enum(['Admin', 'Staff']).optional()
  });

  export { staffSchema, staffUpdateSchema };

