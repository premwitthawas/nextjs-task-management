import { getCurrent } from '@/features/auth/queries'
import JoinWorkspaceForm from '@/features/workspaces/components/join-workspace-form';
import { getWorkspaceInfoById } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
    params: {
        workspaceId: string;
        inviteCode: string;
    }
}

const WorkspaceByIdJoinPage = async ({ params }: Props) => {
    const user = await getCurrent();
    if (!user) redirect('/sign-in')
    const workspace = await getWorkspaceInfoById({ workspaceId: params.workspaceId });
    if (!workspace) redirect('/')
    return (
        <div className='w-full lg:max-w-xl'>
            <JoinWorkspaceForm initialValues={workspace} />
        </div>
    )
}

export default WorkspaceByIdJoinPage