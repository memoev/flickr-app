import { type } from "os";
import { z } from "zod";

export const feedItemSchema = z.object({
  title: z.string(),
  tags: z.array(z.string() || z.undefined()),
  link: z.string(),
});

export const feedRequestSchema = z.object({
  tags: z.string().optional(),
});

export const feedSchema = z.array(feedItemSchema);

export type FeedItem = z.infer<typeof feedItemSchema>;
export type FeedItems = FeedItem[];
export type FeedRequest = z.infer<typeof feedRequestSchema>;
