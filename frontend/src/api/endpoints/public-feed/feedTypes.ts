import { z } from "zod";

export const feedItemSchema = z.array(
  z.object({
    title: z.string(),
    tags: z.array(z.string()),
    link: z.string(),
  })
);
