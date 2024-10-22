'use client';
import DottedSepeartor from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusIcon } from 'lucide-react';
import React from 'react'
import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal';

const TaskSwitcher = () => {
    const { open } = useCreateTaskModal();
    return (
        <Tabs className='flex-1 w-full border rounded-lg' defaultValue='table'>
            <div className='h-full flex flex-col overflow-auto p-4'>
                <div className='flex flex-col gap-y-2 lg:flex-row justify-between'>
                    <TabsList className='w-full lg:w-auto'>
                        <TabsTrigger value='table' className='h-8 w-full lg:w-auto'>
                            Tables
                        </TabsTrigger>
                        <TabsTrigger value='kanban' className='h-8 w-full lg:w-auto'>
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger value='carlendar' className='h-8 w-full lg:w-auto'>
                            Carlendar
                        </TabsTrigger>
                    </TabsList>
                    {/* BUTTON */}
                    <Button onClick={open} className='w-full lg:w-auto' size={'sm'}><PlusIcon className='size-4 mr-2' />New</Button>
                </div>
                <DottedSepeartor className='my-4' />
                {/* FILLTER */}
                Filters
                <DottedSepeartor className='my-4' />
                <>
                    <TabsContent value='table' className='mt-0'>
                        DataTable
                    </TabsContent>
                    <TabsContent value='kanban' className='mt-0'>
                        DataTable
                    </TabsContent>
                    <TabsContent value='carlendar' className='mt-0'>
                        DataTable
                    </TabsContent>
                </>
            </div>
        </Tabs>
    )
}

export default TaskSwitcher