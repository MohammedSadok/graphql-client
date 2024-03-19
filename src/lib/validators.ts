import { z } from "zod";

export const messageSchema = z.object({
  name: z.string().min(2).max(50),
  content: z.string().min(2).max(50),
});
