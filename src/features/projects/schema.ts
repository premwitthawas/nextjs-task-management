import { z } from "zod";

export const createProjectSchema = z.object({
  workspaceId: z.string(),
  name: z.string().trim().min(1, "Name Workspace is Required."),
  image:
    typeof window === "undefined"
      ? z.any().optional()
      : z.instanceof(File).optional(),
  filename: z.string().optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().trim().min(1, "Name Workspace is Required.").optional(),
  image:
    typeof window === "undefined"
      ? z.any().optional()
      : z.instanceof(File).optional(),
  filename: z.string().optional(),
});
