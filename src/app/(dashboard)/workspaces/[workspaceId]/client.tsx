"use client";

import { Analytics } from "@/components/analytics";
import DottedSepeartor from "@/components/dotted-separator";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/member/api/use-get-member";
import MemberAvatar from "@/features/member/components/members-avatar";
import { Member } from "@/features/member/types";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { Project } from "@/features/projects/types";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { Task } from "@/features/tasks/types";
import { useGetWorkspaceByIdAnalytics } from "@/features/workspaces/api/use-get-workspace-by-id-analytics";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, PlusIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

export const WorkspaceIdClient = () => {
    const workspaceId = useWorkspaceId();
    const { data: analytics, isLoading: isAnalyticsLoading } =
        useGetWorkspaceByIdAnalytics({ workspaceId });
    const { data: tasks, isLoading: isTasksLoading } = useGetTasks({
        workspaceId,
    });
    const { data: projects, isLoading: isProjectsLoading } = useGetProjects({
        workspaceId,
    });
    const { data: members, isLoading: isMemberLoading } = useGetMembers({
        workspaceId,
    });
    const { open: createProject } = useCreateProjectModal();
    const { open: createTask } = useCreateTaskModal();
    const isLoading =
        isAnalyticsLoading ||
        isTasksLoading ||
        isProjectsLoading ||
        isMemberLoading;
    if (isLoading) {
        return <PageLoader />;
    }
    if (!analytics || !tasks || !projects || !members) {
        return <PageError message="Data Missing" />;
    }
    return <div className="h-full flex flex-col space-y-4">
        <Analytics data={analytics} />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" >
            <TaskList worksapceId={workspaceId} createTask={createTask} tasks={tasks.documents} total={tasks.total} />
            <ProjectList worksapceId={workspaceId} createProject={createProject} projects={projects.documents} total={projects.total} />
            <MemberList workspaceId={workspaceId} total={members.total} members={members.documents} />
        </div>
    </div>;
}

interface TaskListsProps {
    tasks: Task[];
    total: number;
    createTask: () => void;
    worksapceId: string;
}

const TaskList = ({ tasks, total, createTask, worksapceId }: TaskListsProps) => {
    return <div className="flex flex-col gap-y-4 col-span-1">
        <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                    Tasks ({total})
                </p>
                <Button onClick={() => createTask()} variant={'muted'} size={'icon'}>
                    <PlusIcon className="size-4 text-neutral-400" />
                </Button>
            </div>
            <DottedSepeartor className="my-4" />
            <ul className="flex flex-col gap-y-4">
                {
                    tasks.map((task) => {
                        return <li key={task.$id}>
                            <Link href={`/workspaces/${task.workspaceId}/tasks/${task.$id}`}>
                                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                                    <CardContent className="p-4">
                                        <p className="text-lg font-medium truncate">{task.name}</p>
                                        <div className="flex items-center gap-x-2">
                                            <p>{task.project.name}</p>
                                            <div className="size-1 rounded-full bg-neutral-300" />
                                            <div className="text-sm text-muted-foreground flex items-center">
                                                <CalendarIcon className="size-3 mr-1" />
                                                <span className="truncate">
                                                    {formatDistanceToNow(new Date(task.dueDate))}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    })}
                <li className="text-sm text-muted-foreground text-center">
                    No tasks found
                </li>
            </ul>
            <Button variant={'muted'} className="mt-4 w-full" asChild>
                <Link href={`/workspaces/${worksapceId}/tasks`}>
                    SHOW ALL
                </Link>
            </Button>
        </div>
    </div>
}

interface ProjectListsProps {
    projects: Project[];
    total: number;
    createProject: () => void;
    worksapceId: string;
}
const ProjectList = ({ projects, total, createProject, worksapceId }: ProjectListsProps) => {
    return <div className="flex flex-col gap-y-4 col-span-1">
        <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                    Projects ({total})
                </p>
                <Button onClick={() => createProject()} variant={'muted'} size={'icon'}>
                    <PlusIcon className="size-4 text-neutral-400" />
                </Button>
            </div>
            <DottedSepeartor className="my-4" />
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {
                    projects.map((project) => {
                        return <li key={project.$id}>
                            <Link href={`/workspaces/${worksapceId}/projects/${project.$id}`}>
                                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                                    <CardContent className="p-4 flex items-center gap-x-2.5">
                                        <ProjectAvatar className="size-12" fallbackClassName="text-lg" name={project.name} image={project.imageUrl} />
                                        <p className="truncate text-lg font-medium">{project.name}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    })}
            </ul>
        </div>
    </div>
}

interface MemberListsProps {
    members: Member[];
    total: number;
    workspaceId: string;
}
const MemberList = ({ members, total, workspaceId }: MemberListsProps) => {
    return <div className="flex flex-col gap-y-4 col-span-1">
        <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                    Members ({total})
                </p>
                <Button variant={'secondary'} size='icon' asChild>
                    <Link href={`/workspaces/${workspaceId}/members`}>
                        <SettingsIcon className="size-4 text-neutral-400" />
                    </Link>
                </Button>
            </div>
            <DottedSepeartor className="my-4" />
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    members.map((member) => {
                        return <li key={member.$id}>
                            <Card className="shadow-none rounded-lg overflow-hidden">
                                <CardContent className="p-3 flex flex-col items-center gap-x-2">
                                    <MemberAvatar className="size-12" name={member.name} />
                                    <div className="flex flex-col items-center overflow-hidden">
                                        <p className="text-lg font-medium line-clamp-1">{member.name}</p>
                                        <p className="tracking-tighter text-xs text-muted-foreground line-clamp-1">{member.email}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </li>
                    })}
            </ul>
        </div>
    </div>
}

