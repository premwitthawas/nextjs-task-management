import React from 'react'
import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import TaskSwitcher from '@/features/tasks/components/task-switcher';
const TasksPage = async () => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in")
    return <div className='h-full flex flex-col'>
        <TaskSwitcher />
    </div>
}

export default TasksPage