'use client';
import ResponsiveMoal from '@/components/responsive-modal'
import CreateWorkSpaceForm from '@/features/workspaces/components/create-workspace-form'
import { useCreateWorkspaceModal } from '@/features/workspaces/hooks/use-workspace-create-modal';

const CreateWorkspaceModal = () => {
    const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
    return (
        <ResponsiveMoal open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkSpaceForm onCancle={close} />
        </ResponsiveMoal>
    )
}

export default CreateWorkspaceModal