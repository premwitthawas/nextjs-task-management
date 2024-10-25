import React, { useState } from 'react'
import { Task, TaskStatus } from '@/features/tasks/types';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { KanbanHeaderColumn } from '@/features/tasks/components/kanban-header-column';

const boards: TaskStatus[] = [
    TaskStatus.BACKLOG,
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.DONE,
]

type TaskState = {
    [Key in TaskStatus]: Task[]
}

interface Props {
    data: Task[]
}

export const DndKanban = ({ data }: Props) => {
    const [tasks, setTasks] = useState<TaskState>(() => {
        const initialTasks: TaskState = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: [],
        }
        data.forEach((task) => {
            initialTasks[task.status as TaskStatus].push(task)
        });
        Object.keys(initialTasks).forEach((status) => {
            initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position)
        })
        return initialTasks;
    })
    return (
        <DragDropContext onDragEnd={() => { }}>
            <div className='flex overflow-x-auto'>
                {
                    boards.map((board) => {
                        return <div
                            className='flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]'
                            key={board}>
                            <KanbanHeaderColumn board={board} taskCount={tasks[board].length} />
                        </div>
                    })
                }
            </div>
        </DragDropContext>
    )
}

