import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const resourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  active_start: z.string(),
  active_end: z.string(),
  description: z.string(),
  web_url: z.string(),
  email: z.string(),
})

export type Resource = z.infer<typeof resourceSchema>
