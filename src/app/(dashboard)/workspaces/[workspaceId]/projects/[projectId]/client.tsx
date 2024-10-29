'use client';

import { Analytics } from "@/components/analytics";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetProjectById } from "@/features/projects/api/use-get-project-by-id";
import { useGetProjectAnalyticById } from "@/features/projects/api/use-get-project-by-id-analyze";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import TaskSwitcher from "@/features/tasks/components/task-switcher";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const ProjectIdClient = () => {
    const projectId = useProjectId();
    const { data: project, isLoading: isProjectLoading } = useGetProjectById({
        projectId
    });
    const { data: analyticData, isLoading: isAnalyticLoading } = useGetProjectAnalyticById({ projectId })
    const isLoading = isProjectLoading || isAnalyticLoading;
    if (isLoading) {
        return <PageLoader />
    }
    if (!project || !analyticData) {
        return <PageError message="Project not found" />
    }
    return <div className='flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
                <ProjectAvatar
                    className='size-8'
                    name={project.name}
                    image={project.imageUrl} />
                <p className='text-lg font-semibold'>{project.name}</p>
            </div>
            <div>
                <Button variant={'secondary'} size={'sm'} asChild>
                    <Link href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}>
                        <PencilIcon className='size-4 mr-2' />
                        Edit Project
                    </Link>
                </Button>
            </div>
        </div>
        {/* TASKVIEW */}
        {
            analyticData ? <Analytics data={analyticData} /> : null
        }
        <TaskSwitcher hideProjectFilter />
    </div>
};