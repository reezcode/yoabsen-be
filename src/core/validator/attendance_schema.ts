import { z } from 'zod';

const attSchema = z.object({
    lat: z.number(),
    long: z.number(),
})

const permitSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(4).max(255),
    date: z.string(),
})


export {attSchema, permitSchema}