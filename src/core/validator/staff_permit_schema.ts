import { z } from "zod";

const staffPermitSchema = z.object({
    user_id: z.string(),
    date: z.string(),
    status: z.string(),
})

export { staffPermitSchema };
