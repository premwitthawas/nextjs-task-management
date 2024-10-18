'use client';
import DottedSepeartor from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react'
import { useJoinWorkspace } from '../api/use-join-workspace';
import { Loader2 } from 'lucide-react';
import { useInviteCode } from '../hooks/use-workspce-invite-code';
import { useWorkspaceId } from '../hooks/use-workspace-id';
import { useRouter } from 'next/navigation';

interface Props {
    initialValues: {
        name: string;
    }
}

const JoinWorkspaceForm = ({ initialValues }: Props) => {
    const router = useRouter();
    const inviteCode = useInviteCode();
    const workspaceId = useWorkspaceId();
    const { mutate: joinHandle, isPending: isJoinPending } = useJoinWorkspace();
    const handleJoinWorspace = () => {
        joinHandle({
            param: {
                workspaceId,
            },
            json: {
                code: inviteCode
            }
        }, {
            onSuccess: ({ data }) => {
                router.push(`/workspaces/${data.$id}`)
            }
        })
    }
    return (
        <Card className='w-full h-full'>
            <CardHeader className='p-7'>
                <CardTitle className='text-xl font-bold'>
                    Join workspace
                </CardTitle>
                <CardDescription>
                    You&apos;be been invited to join <strong>{initialValues.name}</strong> workspace
                </CardDescription>
            </CardHeader>
            <div className='p-7'>
                <DottedSepeartor />
            </div>
            <CardContent className='p-7'>
                <div className='flex items-center justify-between'>
                    <Button
                        className='w-full lg:w-fit'
                        variant={'secondary'}
                        type='button'
                        asChild
                        size={'lg'}
                        disabled={isJoinPending}
                    >
                        <Link href={"/"}>
                            Cancle
                        </Link>
                    </Button>
                    <Button
                        className='w-full lg:w-fit'
                        size={'lg'}
                        type='button'
                        disabled={isJoinPending}
                        onClick={handleJoinWorspace}
                    >
                        {isJoinPending ? <Loader2 className="size-4 animate-spin" /> : 'Join Workspace'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default JoinWorkspaceForm