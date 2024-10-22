import { Button } from '@/components/ui/button'
import { getCurrent } from '@/features/auth/queries'
import ProjectAvatar from '@/features/projects/components/project-avatar'
import { getProjectById } from '@/features/projects/queries'
import TaskSwitcher from '@/features/tasks/components/task-switcher'
import { PencilIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
    params: {
        projectId: string
    }
}
const ProjectIdPage = async ({ params }: Props) => {
    const user = await getCurrent();
    if (!user) redirect('/sign-in');
    const intialValues = await getProjectById({ projectId: params.projectId });
    if(!intialValues) throw new Error('Project Not found');
    return (
        <div className='flex flex-col gap-y-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-2'>
                    <ProjectAvatar 
                    className='size-8'
                    name={intialValues.name} 
                    image={intialValues.imageUrl}/>
                    <p className='text-lg font-semibold'>{intialValues.name}</p>
                </div>
                <div>
                    <Button variant={'secondary'} size={'sm'} asChild>
                        <Link href={`/workspaces/${intialValues.workspaceId}/projects/${intialValues.$id}/settings`}>
                            <PencilIcon className='size-4 mr-2' />
                            Edit Project
                        </Link>
                    </Button>
                </div>
            </div>
            {/* TASKVIEW */}
            <TaskSwitcher />
        </div>
    )
}

export default ProjectIdPage