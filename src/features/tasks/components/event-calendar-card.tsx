import React from "react";
import { TaskStatus } from "@/features/tasks/types";
import { Project } from "@/features/projects/types";
import { cn } from "@/lib/utils";
import MemberAvatar from "@/features/member/components/members-avatar";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignee: any;
  project: Project;
  status: TaskStatus;
}

const colorMapStatus: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-500",
  [TaskStatus.DONE]: "border-l-emerald-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500",
  [TaskStatus.TODO]: "border-l-red-500",
};

export const EventCard = ({ assignee, id, project, title, status }: Props) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  // HANDLES
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };
  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
          colorMapStatus[status]
        )}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          <MemberAvatar fallbackClassName="size-5" name={assignee?.name} />
          <div className="size-1 rounded-full bg-neutral-300" />
          <ProjectAvatar name={project.name} image={project.imageUrl} />
        </div>
      </div>
    </div>
  );
};
