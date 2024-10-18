'use client';
import React, { Fragment } from 'react'
import { useWorkspaceId } from '../hooks/use-workspace-id';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftIcon, Loader2Icon, MoreVerticalIcon } from 'lucide-react';
import DottedSepeartor from '@/components/dotted-separator';
import { useGetMembers } from '@/features/member/api/use-get-member';
import MemberAvatar from '@/features/member/components/members-avatar';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDeleteMember } from '@/features/member/api/use-delete-member';
import { useUpdateMember } from '@/features/member/api/use-update-member';
import { MemberRole } from '@/features/member/types';
import UseConfirm from '@/hooks/use-confrim';

const MemberLists = () => {
    const workspaceId = useWorkspaceId();
    const { data } = useGetMembers({ workspaceId });
    const [RemoveMemberDialog, confirmRemoveMember] = UseConfirm("Remove member", "This member will removed from the workspace", 'destructive');
    const { mutate: RemoveMemberHandle, isPending: isRemoveHandlePending } = useDeleteMember();
    const { mutate: UpdateRoleMemberHandle, isPending: isUpdateRoleHandlePending } = useUpdateMember();
    const handlerUpdateMember = (memberId: string, role: MemberRole) => {
        UpdateRoleMemberHandle({
            param: {
                memberId
            },
            json: {
                role,
            }
        })
    }
    const handlerRemoveMember = async (memberId: string) => {
        const ok = await confirmRemoveMember();
        if (!ok) return;
        RemoveMemberHandle({
            param: {
                memberId
            }
        }, {
            onSuccess: () => {
                window.location.reload();
            }
        })
    }
    return (
        <Card className='w-full h-full border-none shadow-none'>
            <RemoveMemberDialog />
            <CardHeader className='flex flex-row items-center gap-x-4 p-7 space-y-0'>
                <Button variant={'secondary'} size={'sm'} asChild>
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeftIcon className='size-4 mr-2' />
                        Back
                    </Link>
                </Button>
                <CardTitle className='text-xl font-bold'>
                    Member list
                </CardTitle>
            </CardHeader>
            <div className='p-7'>
                <DottedSepeartor />
            </div>
            <CardContent className='p-7'>
                {
                    data?.documents.map((member, idx) => {
                        return <Fragment key={member.$id}>
                            <div className='flex items-center gap-2'>
                                <MemberAvatar
                                    className='size-10'
                                    fallbackClassName=''
                                    name={member.name} />
                                <div className='flex flex-col'>
                                    <p className='text-sm font-medium'>{member.name}</p>
                                    <p className='text-xs text-muted-foreground'>{member.email}</p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className='ml-auto' variant={'secondary'} size={'icon'}>
                                            <MoreVerticalIcon className='size-4 text-muted-foreground' />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side='bottom' align='end'>
                                        <DropdownMenuItem
                                            onClick={() => handlerUpdateMember(member.$id, MemberRole.ADMIN)}
                                            disabled={isUpdateRoleHandlePending}
                                            className='font-medium'
                                        >
                                            {isUpdateRoleHandlePending ? <Loader2Icon className='size-5 animate-spin' /> : 'Set as Administrator'}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handlerUpdateMember(member.$id, MemberRole.MEMBER)}
                                            disabled={isUpdateRoleHandlePending}
                                            className='font-medium'
                                        >
                                            {isUpdateRoleHandlePending ? <Loader2Icon className='size-5 animate-spin' /> : ' Set as Member'}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handlerRemoveMember(member.$id)}
                                            disabled={isRemoveHandlePending}
                                            className='font-medium text-red-600'
                                        >
                                            {isRemoveHandlePending ? <Loader2Icon className='size-5 animate-spin' /> : 'Remove join'}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            {idx < data.documents.length - 1 && (
                                <Separator className='my-2.5 text-neutral-300' />
                            )}
                        </Fragment>
                    })
                }
            </CardContent>
        </Card>
    )
}

export default MemberLists