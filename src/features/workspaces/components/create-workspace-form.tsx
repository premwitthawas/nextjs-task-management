'use client';
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createWorkSpacesSchema } from '@/features/workspaces/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DottedSepeartor from '@/components/dotted-separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateWorkspace } from '@/features/workspaces/api/use-create-workspace';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ImageIcon, Loader2Icon } from 'lucide-react';

type CreateWorkSpaceFormSchema = z.infer<typeof createWorkSpacesSchema>

interface Props {
  onCancle?: () => void;
}

const CreateWorkSpaceForm = ({ onCancle }: Props) => {
  const { mutate: createWorkspaceHandle, isPending } = useCreateWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<CreateWorkSpaceFormSchema>({
    defaultValues: {
      name: ''
    },
    resolver: zodResolver(createWorkSpacesSchema),
  })
  const onSubmitHandle = (values: CreateWorkSpaceFormSchema) => {
    const data = {
      form: {
        name: values.name,
        image: values.image instanceof File ? values.image : ''
      }
    }
    createWorkspaceHandle(data);
  };

  const handleImageChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  }
  return (
    <Card className='w-full h-full border-none shadow-none'>
      <CardHeader className='flex p-7'>
        <CardTitle className='text-xl font-bold'>
          Create a new workspace
        </CardTitle>
      </CardHeader>
      <div className='p-7'>
        <DottedSepeartor />
      </div>
      <CardContent className='p-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandle)}>
            <div className='flex flex-col gap-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter workspace name' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <div className='flex flex-col gap-y-2'>
                    <div className='flex items-center gap-x-5'>
                      {
                        field.value ? (
                          <div className='size-[72px] relative rounded-md overflow-hidden'>
                            <Image
                              src={
                                field.value instanceof File ? URL.createObjectURL(field.value) : field.value
                              }
                              className='object-cover'
                              fill
                              alt='Logo' />
                          </div>
                        ) : (
                          <Avatar className='size-[72px]'>
                            <AvatarFallback>
                              <ImageIcon className='size-[36px] text-neutral-400' />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      <div className='flex flex-col'>
                        <p className='text-sm'>Workspace Icon</p>
                        <p className='text-sm text-muted-foreground'>
                          PNG, JPG, JPEG or SVG
                        </p>
                        <input
                          className='hidden'
                          type='file'
                          accept='.jpg, .png, .jpeg, .svg'
                          ref={inputRef}
                          onChange={handleImageChage}
                        />
                        <Button
                          type='button'
                          disabled={isPending}
                          size={'xs'}
                          variant={'teritrary'}
                          className='w-fit mt-2'
                          onClick={() => inputRef.current?.click()}
                        >
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
            <DottedSepeartor className='py-7' />
            <div className='flex items-center justify-between'>
              <Button type='button' disabled={isPending} size={'lg'} variant={'secondary'} onClick={onCancle}>Cancel</Button>
              <Button type='submit' disabled={isPending} size={'lg'}>
                {isPending ? <Loader2Icon className='size-4 animate-spin' /> : 'Create Workspace'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CreateWorkSpaceForm