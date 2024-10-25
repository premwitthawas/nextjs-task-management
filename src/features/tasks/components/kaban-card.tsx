import React from 'react'
import { Task } from '@/features/tasks/types';
import TaskActions from '@/features/tasks/components/task-action';
import { MoreVerticalIcon } from 'lucide-react';
import DottedSepeartor from '@/components/dotted-separator';
import MemberAvatar from '@/features/member/components/members-avatar';
import TaskDate from '@/features/tasks/components/task-date';
import ProjectAvatar from '@/features/projects/components/project-avatar';

interface Props {
    task: Task
}

export const KabanCard = ({ task }: Props) => {
    return (
        <div className='bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3'>
            <div className='flex items-center justify-between gap-x-2'>
                <p className='text-xs tracking-tighter font-bold'>{task.name}</p>
                <TaskActions id={task.$id} projectId={task.projectId}>
                    <MoreVerticalIcon className='size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75' />
                </TaskActions>
            </div>
            <DottedSepeartor />
            <div className='flex items-center gap-x-1.5'>
                <MemberAvatar name={task.assignee.name} className='size-6' fallbackClassName='text-[10px]' />
                <div className='size-1 rounded-full bg-neutral-300' />
                <TaskDate value={task.dueDate} className='text-xs'/>
            </div>
            <div className='flex items-center gap-x-1.5'>
                <ProjectAvatar 
                name={task.project.name}
                image={task.project.imageUrl}
                />
                <span className='text-xs font-bold'>{task.project.name}</span>
            </div>
        </div>
    )
}

