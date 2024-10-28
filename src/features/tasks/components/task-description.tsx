import React, { useState } from 'react'
import { Task } from '@/features/tasks/types'
import { Button } from '@/components/ui/button'
import { Loader2Icon, PenBoxIcon, XIcon } from 'lucide-react'
import DottedSepeartor from '@/components/dotted-separator'
import { useUpdateTask } from '@/features/tasks/api/use-update-task'
import { Textarea } from '@/components/ui/textarea'
interface Props {
    task: Task
}
export const TaskDescription = ({ task }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(task.description);
    const { mutate, isPending } = useUpdateTask();
    const handleUpdateDescription = () => {
        mutate({
            param: {
                taskId: task.$id
            },
            json: {
                description: value
            }
        })
    }
    return (
        <div className='p-4 border rounded-lg'>
            <div className='flex items-center justify-between'>
                <p className='text-lg font-semibold'>Overview</p>
                {
                    isEditing ? (
                        <Button onClick={() => setIsEditing((prev) => !prev)} size={'sm'} variant={'destructive'}>
                            <XIcon className='size-4 mr-2' />
                            Cancle
                        </Button>) : (
                        <Button onClick={() => setIsEditing((prev) => !prev)} size={'sm'} variant={'secondary'}>
                            <PenBoxIcon className='size-4 mr-2' />
                            Edit
                        </Button>
                    )
                }
            </div>
            <DottedSepeartor className='my-4' />
            <div className='flex flex-col gap-y-4'>
                {
                    isEditing ? (<div className='flex flex-col gap-y-4'>
                        <Textarea
                            placeholder='Add a description ....'
                            value={value}
                            rows={4}
                            onChange={(e) => setValue(e.target.value)}
                            disabled={isPending}
                        />
                        <Button size={'sm'}
                        className='w-fit ml-auto'
                        onClick={()=>handleUpdateDescription()}
                        disabled={isPending}
                        >
                            {isPending ? <Loader2Icon className='animate-spin size-4' /> : "Save Changes"}
                        </Button>
                    </div>)
                        : (
                            <div>
                                {task.description || (
                                    <span className='text-muted-foreground'>
                                        No description set
                                    </span>
                                )}
                            </div>
                        )
                }
            </div>
        </div>
    )
}

