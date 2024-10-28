import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation';
import React from 'react'
import { JoinWorkspaceClientByInviteCode } from './client';

const WorkspaceByIdJoinPage = async () => {
    const user = await getCurrent();
    if (!user) redirect('/sign-in')
    return (
        <JoinWorkspaceClientByInviteCode />
    )
}

export default WorkspaceByIdJoinPage