import React from 'react'
import { TaskStatus } from '@/features/tasks/types'
import { snakeCaseToTitleCase } from '@/lib/utils'
import { CircleDashedIcon, CircleIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal'

interface Props {
    board: TaskStatus
    taskCount: number
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
    [TaskStatus.BACKLOG]: (<CircleDashedIcon className='size-[18px] text-pink-400' />),
    [TaskStatus.TODO]: (<CircleIcon className='size-[18px] text-red-400' />),
    [TaskStatus.IN_PROGRESS]: (<CircleIcon className='size-[18px] text-yellow-400' />),
    [TaskStatus.IN_REVIEW]: (<CircleIcon className='size-[18px] text-blue-400' />),
    [TaskStatus.DONE]: (<CircleIcon className='size-[18px] text-emerald-400' />),
}

export const KanbanHeaderColumn = ({ board, taskCount }: Props) => {
    const icon = statusIconMap[board];
    const { open } = useCreateTaskModal();
    return (
        <div className='px-2 py-1.5 flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
                {icon}
                <h2 className='text-sm font-medium'>{snakeCaseToTitleCase(board)}</h2>
                <div className='size-5 flex items-center justify-center rounded-e-sm bg-neutral-200 text-xs text-neutral-700'>
                    {taskCount}
                </div>
            </div>
            <Button onClick={() => open()} variant={'ghost'} size={'icon'} className='size-5'>
                <PlusIcon className='size-4 text-neutral-500' />
            </Button>
        </div>
    )
}

