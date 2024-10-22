'use client';
import React from 'react'
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from "@/components/ui/calendar"
interface Props {
    value: Date | undefined;
    onChange: (data: Date) => void;
    className?: string;
    placehoder?: string;
}
const DatePicker = ({ value, onChange, className, placehoder = "Select date" }: Props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size={'lg'}
                    variant={'outline'}
                    className={cn('w-full justify-start text-left font-normal px-3', className)}
                >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {value ? format(value, 'PPP') : <span>{placehoder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar
                    mode='single'
                    selected={value}
                    onSelect={(date) => onChange(date as Date)}
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker