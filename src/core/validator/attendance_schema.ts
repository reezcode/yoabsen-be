import { z } from 'zod';

const attSchema = z.object({
    lat: z.number(),
    long: z.number(),
})


export {attSchema}