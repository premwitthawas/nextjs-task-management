import { Button } from "@/components/ui/button"
import ProjectAvatar from "@/features/projects/components/project-avatar"
import { Project } from "@/features/projects/types"
import { Task } from "@/features/tasks/types"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { ChevronRightIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useDeleteTask } from "@/features/tasks/api/use-delete-task"
import UseConfirm from "@/hooks/use-confrim"
import { useRouter } from "next/navigation"



interface Props {
  project: Project
  task: Task
}

export const TaskBreadCrumbs = ({ project, task }: Props) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { mutate: deleteTaskHandler, isPending: isTaskDeletePending } = useDeleteTask();
  const [ConfirmDialog, confirm] = UseConfirm("Delete Task", "This action cannot be undone.", "destructive");
  const handleDeleteTask = async () => {
    const ok = await confirm();
    if (!ok) return;
    deleteTaskHandler({
      param: {
        taskId: task.$id
      },
    }, {
      onSuccess: () => {
        router.push(`/workspaces/${workspaceId}/tasks`);
      }
    })
  }
  return (
    <div className="flex items-center gap-x-2">
      <ConfirmDialog />
      <ProjectAvatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-8"
      />
      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
          {project.name}
        </p>
      </Link>
      <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
      <p className="text-sm lg:text-lg font-semibold">
        {task.$id}
      </p>
      <Button onClick={() => handleDeleteTask()} disabled={isTaskDeletePending} className="ml-auto" size={'sm'} variant={'destructive'}>
        <TrashIcon className="size-4 lg:mr-2" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  )
}