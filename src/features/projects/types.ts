import { Models } from "node-appwrite";

export type Project = Models.Document & {
  name: string;
  imageUrl: string;
  workspaceId: string;
};

export type Analytics = {
  assignedTaskCount: number;
  assignedTaskCountDiff: number;
  completeTaskCount: number;
  completeTaskCountDiff: number;
  incompleteTasksCount?: number;
  incompleteTasksCountDiff?: number;
  overDueDateTasksCount: number;
  overDueDateTasksCountDiff: number;
  taskCount: number;
  taskDiff: number;
  projectCount?: number;
  projectCountDiff?: number;
};
