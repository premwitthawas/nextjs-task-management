"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, Loader2Icon, PencilIcon, Trash2Icon } from "lucide-react";
import React from "react";


import { useDeleteTask } from '@/features/tasks/api/use-delete-task';
import UseConfirm from "@/hooks/use-confrim";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

interface Props {
  id: string;
  projectId: string;
  children: React.ReactNode;
}
const TaskActions = ({ id, children, projectId }: Props) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { open } = useEditTaskModal();
  const [DeleteOnfirmDialog, confirmDeleting] = UseConfirm(
    "Delete task",
    "This action cannot be undone.",
    "destructive"
  );
  const { mutate: deleteHandle, isPending: isDeletePending } = useDeleteTask();
  const onDelete = async () => {
    const ok = await confirmDeleting()
    if (!ok) return;
    deleteHandle({ param: { taskId: id } })
  }
  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  }
  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  }

  return (
    <div className="flex cursor-pointer">
      <DeleteOnfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={onOpenTask}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => open(id)}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            disabled={false}
            className="text-red-600 focus:text-red-600 font-medium p-[10px]"
          >
            {isDeletePending ? <Loader2Icon className="size-4 animate-spin" /> : <><Trash2Icon className="size-4 mr-2 stroke-2" />Delete Task</>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskActions;
