import { z } from "zod";
import { TaskStatus } from "@/features/tasks/types";

export const createTaskSchema = z.object({
  name: z.string(),
  status: z.nativeEnum(TaskStatus, { required_error: "Required" }),
  workspaceId: z.string().trim().min(1, "Required"),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
});

export const updateTaskSchema = z.object({
  name: z.string().optional(),
  status: z.nativeEnum(TaskStatus, { required_error: "Required" }).optional(),
  workspaceId: z.string().trim().min(1, "Required").optional(),
  projectId: z.string().trim().min(1, "Required").optional(),
  dueDate: z.coerce.date().optional(),
  assigneeId: z.string().trim().min(1, "Required").optional(),
  description: z.string().optional(),
});
