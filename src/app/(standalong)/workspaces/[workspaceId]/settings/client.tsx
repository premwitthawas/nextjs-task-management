'use client';

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspaceById } from "@/features/workspaces/api/use-get-workspace-by-id";
import EditWorkSpaceForm from "@/features/workspaces/components/edit-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const WorkspacIdSettingsClient = () => {
    const workspaceId = useWorkspaceId();
    const { data, isLoading } = useGetWorkspaceById({ workspaceId })
    if(isLoading){
        return <PageLoader />
    }
    if(!data){
        return <PageError message="Workspace Not found"/>
    }
    return <div className='w-full lg:max-w-xl'>
        <EditWorkSpaceForm initialValues={data} />
    </div>
}