import { z } from "zod";

const locationSchema = z.object({
    lat: z.number().optional(),
    long: z.number().optional(),
    address: z.string().optional(),
    tolerance: z.number().optional(),
});

export { locationSchema };
