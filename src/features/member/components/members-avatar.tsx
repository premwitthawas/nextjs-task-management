'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import React from 'react'

interface Props {
    fallbackClassName?: string;
    name: string;
    className?: string;
}

const MemberAvatar = ({ className, name, fallbackClassName }: Props) => {
    return (
        <Avatar className={cn('size-10 rounded-md', className)}>
            <AvatarFallback className={cn('bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center',
                fallbackClassName)}>
                {name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}

export default MemberAvatar