'use client';

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspaceByIdInfo } from "@/features/workspaces/api/use-get-workspace-by-id-info";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const JoinWorkspaceClientByInviteCode = () => {
    const workspaceId = useWorkspaceId();
    const { data, isLoading } = useGetWorkspaceByIdInfo({ workspaceId });
    if (isLoading) {
        return <PageLoader />
    }
    if (!data) {
        return <PageError message="workspace info not found" />
    }
    return <div className='w-full lg:max-w-xl'>
        <JoinWorkspaceForm initialValues={{
            name: data.name
        }} />
    </div>
} 