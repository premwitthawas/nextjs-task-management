'use client';


import DottedSepeartor from '@/components/dotted-separator';
import { PageError } from '@/components/page-error';
import { PageLoader } from '@/components/page-loader';
import { useGetTaskById } from '@/features/tasks/api/use-get-task';
import { TaskBreadCrumbs } from '@/features/tasks/components/task-breadcrumbs';
import { TaskDescription } from '@/features/tasks/components/task-description';
import { TaskOverView } from '@/features/tasks/components/task-overview';
import { useTaskId } from '@/features/tasks/hooks/use-task-id';
import React from 'react'

const TaskByIdClientPage = () => {
    const taskId = useTaskId();
    const { data: task, isLoading: isTaskLoading, isError: isTaskError } = useGetTaskById({ taskId });
    if (isTaskLoading) {
        return <PageLoader />
    }
    if (isTaskError || !task) {
        return <PageError message='task not found' />
    }
    return (
        <div className='flex flex-col'>
            <TaskBreadCrumbs project={task.project} task={task} />
            <DottedSepeartor className='my-6' />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <TaskOverView task={task} />
                <TaskDescription task={task}/>
            </div>

        </div>
    )
}

export default TaskByIdClientPage