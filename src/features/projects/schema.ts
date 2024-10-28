import { z } from "zod";

export const createProjectSchema = z.object({
  workspaceId: z.string(),
  name: z.string().trim().min(1, "Name Project is Required."),
  image: z.any().optional(),
  filename: z.string().optional()
});

export const updateProjectSchema = z.object({
  name: z.string().trim().min(1, "Name Project is Required.").optional(),
  image: z.any().optional(),
  filename: z.string().optional()
});
