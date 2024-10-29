'use client';
import { AnalyticsProjectResponseType } from '@/features/projects/api/use-get-project-by-id-analyze';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AnalyticsCard } from '@/components/analytice-card';
import DottedSepeartor from './dotted-separator';
export const Analytics = ({ data }: AnalyticsProjectResponseType) => {
    return <ScrollArea className='border rouded-lg w-full whitespace-nowrap shrink-0'>
        <div className='w-full flex flex-row'>
            <div className='flex items-center flex-1'>
                <AnalyticsCard
                    title='Total Tasks'
                    increaseValue={data.taskDiff}
                    value={data.taskCount}
                    variant={data.taskDiff > 0 ? 'up' : 'down'} />
                <DottedSepeartor direction='vertical' />
            </div>
            <div className='flex items-center flex-1'>
                <AnalyticsCard
                    title='Assigned Tasks'
                    increaseValue={data.assignedTaskCountDiff}
                    value={data.assignedTaskCount}
                    variant={data.assignedTaskCountDiff > 0 ? 'up' : 'down'} />
                <DottedSepeartor direction='vertical' />
            </div>
            <div className='flex items-center flex-1'>
                <AnalyticsCard
                    title='Completed Tasks'
                    increaseValue={data.completeTaskCountDiff}
                    value={data.completeTaskCount}
                    variant={data.completeTaskCountDiff > 0 ? 'up' : 'down'} />
                <DottedSepeartor direction='vertical' />
            </div>
            <div className='flex items-center flex-1'>
                <AnalyticsCard
                    title='Overdue Tasks'
                    increaseValue={data.overDueDateTasksCountDiff}
                    value={data.overDueDateTasksCount}
                    variant={data.overDueDateTasksCountDiff > 0 ? 'up' : 'down'} />
                <DottedSepeartor direction='vertical' />
            </div>
            <div className='flex items-center flex-1'>
                <AnalyticsCard
                    title='Incomplete Tasks'
                    increaseValue={data.incompleteTasksCountDiff}
                    value={data.incompleteTasksCount}
                    variant={data.incompleteTasksCountDiff > 0 ? 'up' : 'down'} />
                <DottedSepeartor direction='vertical' />
            </div>
        </div>
        <ScrollBar orientation='horizontal'/>
    </ScrollArea>
}