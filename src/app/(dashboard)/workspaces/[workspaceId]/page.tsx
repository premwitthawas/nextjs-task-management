import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

interface Props {
    params: {
        workspaceId: string
    }
}

const WorkspaceIdPage = async ({ params }: Props) => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in")
    return (
        <div>WorkspacePage {params.workspaceId}</div>
    )
}

export default WorkspaceIdPage;