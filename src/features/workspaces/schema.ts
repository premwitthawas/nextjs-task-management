import { z } from "zod";

export const createWorkSpacesSchema = z.object({
  name: z.string().trim().min(1, "Name Workspace is Required."),
  image: typeof window === 'undefined' ? z.any().optional() : z.instanceof(File).optional(),
  filename: z.string().optional()
});
