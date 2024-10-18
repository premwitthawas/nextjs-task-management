'use client';
import ResponsiveMoal from '@/components/responsive-modal'
import CreateWorkSpaceForm from './create-workspace-form'
import { useCreateWorkspaceModal } from '../hooks/use-workspace-create-modal';

const CreateWorkspaceModal = () => {
    const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
    return (
        <ResponsiveMoal open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkSpaceForm onCancle={close} />
        </ResponsiveMoal>
    )
}

export default CreateWorkspaceModal