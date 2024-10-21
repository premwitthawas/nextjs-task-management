'use client';
import ResponsiveMoal from '@/components/responsive-modal'
import CreateProjectForm from '@/features/projects/components/create-project-form'
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';

const CreateProjectModal = () => {
    const { isOpen, setIsOpen, close } = useCreateProjectModal();
    return (
        <ResponsiveMoal open={isOpen} onOpenChange={setIsOpen}>
            <CreateProjectForm onCancle={close} />
        </ResponsiveMoal>
    )
}

export default CreateProjectModal