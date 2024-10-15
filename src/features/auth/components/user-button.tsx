'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLogout } from '../api/use-logout';
import { useCurrent } from '@/features/auth/api/use-current';
import { Loader, LogOut } from 'lucide-react';
import React from 'react'
import DottedSepeartor from '@/components/dotted-separator';

export const UserButton = () => {
    const { data, isLoading } = useCurrent();
    const { mutate: LogoutHandle } = useLogout();
    if (!data || isLoading) {
        return <div className='size-10 bg-neutral-200 border border-neutral-300 rounded-full flex items-center justify-center'>
            <Loader className='size-4 animate-spin text-muted-foreground' />
        </div>
    }
    const { name, email } = data;
    const avatarfallback = name ? name.charAt(0).toUpperCase() :
        email.charAt(0).toUpperCase() ?? "U";
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className='relative outline-none'>
                <Avatar className='size-10 hover:opacity-75 transition text-neutral-500 border border-neutral-500'>
                    <AvatarFallback className='bg-neutral-200 font-medium text-neutral-500 flex items-center'>
                        {avatarfallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' side='bottom' className='w-60' sideOffset={10}>
                <div className='flex flex-col items-center justify-center gap-2 px-2.5 py-4'>
                    <Avatar className='size-[52px] hover:opacity-75 transition text-neutral-500 border border-neutral-500'>
                        <AvatarFallback className='bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center'>
                            {avatarfallback}
                        </AvatarFallback>
                    </Avatar>

                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-sm font-medium text-neutral-900'>
                            {name || "User"}
                        </p>
                        <p className='text-xs text-neutral-500'>
                            {email}
                        </p>
                    </div>
                </div>
                <DottedSepeartor className='mb-1' />
                <DropdownMenuItem onClick={() => LogoutHandle()} className='cursor-pointer flex items-center justify-center font-medium'>
                    <LogOut className='size-4 mr-1' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
