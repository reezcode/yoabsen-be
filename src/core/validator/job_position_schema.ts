import { z } from "zod";

const jobPositionUpdateSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    salary: z.number().optional(),
    });

    const jobPositionCreateSchema = z.object({
        name: z.string(),
        description: z.string().optional(),
        salary: z.number(),
        });

export { jobPositionCreateSchema, jobPositionUpdateSchema };

