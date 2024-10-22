'use client';
import ResponsiveMoal from '@/components/responsive-modal'
import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal';
import CreateTaskFormWrapper from './create-task-form-wrapper';

const CreateTaskModal = () => {
    const { isOpen, setIsOpen, close } = useCreateTaskModal();
    return (
        <ResponsiveMoal open={isOpen} onOpenChange={setIsOpen}>
            <CreateTaskFormWrapper onCanCel={close} />
        </ResponsiveMoal>
    )
}

export default CreateTaskModal