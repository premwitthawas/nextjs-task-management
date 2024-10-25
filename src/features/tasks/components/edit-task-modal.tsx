'use client';
import ResponsiveMoal from '@/components/responsive-modal'
import { useEditTaskModal } from '@/features/tasks/hooks/use-edit-task-modal';
import EditTaskFormWrapper from '@/features/tasks/components/edit-task-form-wrapper';

const EditTaskModal = () => {
    const { taskId, close } = useEditTaskModal();
    return (
        <ResponsiveMoal open={!!taskId} onOpenChange={close}>
            {
                taskId && (
                    <EditTaskFormWrapper id={taskId} onCanCel={close} />)
            }
        </ResponsiveMoal>
    )
}

export default EditTaskModal