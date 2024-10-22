'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DottedSepeartor from "@/components/dotted-separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateTask } from "@/features/tasks/api/use-create-task";
import { createTaskSchema } from "@/features/tasks//schema";
import DatePicker from "@/components/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MemberAvatar from "@/features/member/components/members-avatar";

interface Props {
    onCancle?: () => void;
    projectOptions: { id: string, name: string, imageUrl: string }[];
    memberOptions: { id: string, name: string, }[];
}

const CreateTaskForm = ({ onCancle, memberOptions, projectOptions }: Props) => {
    const workspaceId = useWorkspaceId();
    const { mutate: createTaskHandle, isPending } = useCreateTask();
    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            workspaceId,
        }
    });
    const onSubmitHandle = (values: z.infer<typeof createTaskSchema>) => {
        createTaskHandle({
            json: {
                ...values,
                workspaceId
            }
        }, {
            onSuccess: () => {
                form.reset();
            }
        });
    };
    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new Task
                </CardTitle>
            </CardHeader>
            <div className="p-7">
                <DottedSepeartor />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitHandle)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Task Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter task name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Due Date</FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="assigneeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assignee</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="select assignee" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    memberOptions.map((member) => {
                                                        return <SelectItem value={member.id} key={member.id}>
                                                            <div className="flex items-center gap-x-2">
                                                                <MemberAvatar className="size-6" name={member.name} />
                                                                {member.name}
                                                            </div>
                                                        </SelectItem>
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DottedSepeartor className="py-7" />
                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                disabled={isPending}
                                size={"lg"}
                                variant={"secondary"}
                                onClick={onCancle}
                                className={cn(!onCancle && 'invisible')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending} size={"lg"}>
                                {isPending ? (
                                    <Loader2Icon className="size-4 animate-spin" />
                                ) : (
                                    "Create Task"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CreateTaskForm;
