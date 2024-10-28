'use client';

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetProjectById } from "@/features/projects/api/use-get-project-by-id";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import TaskSwitcher from "@/features/tasks/components/task-switcher";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const ProjectIdClient = () => {
    const projectId = useProjectId();
    const { data, isLoading } = useGetProjectById({
        projectId
    });
    if(isLoading){
        return <PageLoader />
    }
    if(!data){
        return <PageError message="Project not found"/>
    }
    return <div className='flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
                <ProjectAvatar
                    className='size-8'
                    name={data.name}
                    image={data.imageUrl} />
                <p className='text-lg font-semibold'>{data.name}</p>
            </div>
            <div>
                <Button variant={'secondary'} size={'sm'} asChild>
                    <Link href={`/workspaces/${data.workspaceId}/projects/${data.$id}/settings`}>
                        <PencilIcon className='size-4 mr-2' />
                        Edit Project
                    </Link>
                </Button>
            </div>
        </div>
        {/* TASKVIEW */}
        <TaskSwitcher hideProjectFilter />
    </div>
};