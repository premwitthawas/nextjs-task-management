import { getCurrent } from '@/features/auth/queries'
import { getWorkspacesById } from '@/features/workspaces/queries';
import EditWorkSpaceForm from '@/features/workspaces/components/edit-workspace-form';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
    params: {
        workspaceId: string;
    }
}

const WorkspaceSettingsByIdPage = async ({ params }: Props) => {
    const user = await getCurrent();
    if (!user) redirect('/sign-in')
    const intialValues = await getWorkspacesById({ workspaceId: params.workspaceId })
    if (!intialValues) {
        redirect(`/workspaces/${params.workspaceId}`)
    }
    return (
        <div className='w-full lg:max-w-xl'>
            <EditWorkSpaceForm initialValues={intialValues} />
        </div>
    )
}

export default WorkspaceSettingsByIdPage