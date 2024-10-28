import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation';
import React from 'react'
import { WorkspacIdSettingsClient } from './client';


const WorkspaceSettingsByIdPage = async () => {
    const user = await getCurrent();
    if (!user) redirect('/sign-in')
    return (
        <WorkspacIdSettingsClient />
    )
}

export default WorkspaceSettingsByIdPage