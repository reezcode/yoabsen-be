import { z } from "zod";

const holidayDateCreateSchema = z.object({
    name: z.string(),
    date: z.string(),
})

const holidayDateUpdateSchema = z.object({
    name: z.string().optional(),
    date: z.string().optional(),
})

export {
    holidayDateCreateSchema,
    holidayDateUpdateSchema
};
