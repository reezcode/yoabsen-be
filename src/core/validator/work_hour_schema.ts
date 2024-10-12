import { z } from "zod";

const workHourSchema = z.object({
    start_hour: z.string({
        invalid_type_error: "Start hour must be a string",
    }),
    end_hour: z.string({
        invalid_type_error: "End hour must be a string",
    }),
    tolerance: z.number({
        invalid_type_error: "Tolerance must be a number",
    }),
});

export { workHourSchema };
