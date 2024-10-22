'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useGetMembers } from '@/features/member/api/use-get-member';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { Loader2Icon } from 'lucide-react';
import React from 'react'
import CreateTaskForm from '@/features/tasks/components/create-task-form';

interface Props {
    onCanCel: () => void
};

const CreateTaskFormWrapper = ({ onCanCel }: Props) => {
    const workspaceId = useWorkspaceId();
    const { data: projects, isLoading: isLoadingProject } = useGetProjects({
        workspaceId
    })
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({
        workspaceId
    })
    const projectOptions = projects?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl
    }));
    const memberOptions = members?.documents.map((member) => ({
        id: member.$id,
        name: member.name,
    }));
    const isLoading = isLoadingMembers || isLoadingProject;
    if (isLoading) {
        return (
            <Card className='w-full h-[714px] border-none shadow-none'>
                <CardContent className='flex items-center justify-center h-full'>
                    <Loader2Icon className='size-5 animate-spin text-muted-foreground' />
                </CardContent>
            </Card>
        )
    }
    return (
        <>
            <CreateTaskForm onCancle={onCanCel} memberOptions={memberOptions ?? []} projectOptions={projectOptions ?? []} />
        </>
    )
}

export default CreateTaskFormWrapper