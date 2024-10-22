import { getCurrent } from '@/features/auth/queries'
import EditProjectForm from '@/features/projects/components/edit-project-form'
import { getProjectById } from '@/features/projects/queries'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
    params: {
        projectId: string
    }
}

const ProjectIdSettingsPage = async ({ params }: Props) => {
    const user = await getCurrent();
    if (!user) redirect('/sign-in')
    const initialValues = await getProjectById({ projectId: params.projectId });
    return (
        <div className='w-full lg:max-w-xl'>
            <EditProjectForm initialValues={initialValues} />
        </div>
    )
}

export default ProjectIdSettingsPage;