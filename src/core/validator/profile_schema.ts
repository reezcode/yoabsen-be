import { z } from "zod";

const profileSchema = z.object({
    photo_url: z.string(),
})

export {profileSchema}