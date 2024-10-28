"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateWorkSpacesSchema } from "@/features/workspaces/schema";
import { cn } from "@/lib/utils";
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
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeftIcon, CopyIcon, ImageIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Workspace } from "@/features/workspaces/types";
import UseConfirm from "@/hooks/use-confrim";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { toast } from "sonner";
import { useResetCodeInviteWorkspace } from "../api/use-reset-invite-code";

interface Props {
  onCancle?: () => void;
  initialValues: Workspace;
}

const EditWorkSpaceForm = ({ onCancle, initialValues }: Props) => {
  const router = useRouter();
  const [fullInviteLink, setFullInviteLink] = useState<string>('')
  const { mutate: updateWorkspaceHandle, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspaceHandle, isPending: isDeletePending } =
    useDeleteWorkspace();
  const { mutate: resetCodeInviteWorkspace, isPending: isResetCodePending } =
    useResetCodeInviteWorkspace();
  const [DeleteDialog, confrimDelete] = UseConfirm(
    "Delete Workspace",
    "This action cannot be undone.",
    'destructive'
  );
  const [ResetCodeDialog, confrimResetCode] = UseConfirm(
    "Reset invite link",
    "This will invalidate the current invite linke",
    'destructive'
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof updateWorkSpacesSchema>>({
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
    // resolver: zodResolver(updateWorkSpacesSchema),
  });
  const onSubmitHandle = (values: z.infer<typeof updateWorkSpacesSchema>) => {
    const data = {
      param: {
        workspaceId: initialValues.$id,
      },
      form: {
        name: values.name as string,
        image: values.image instanceof File ? values.image : "",
        filename: values.image instanceof File ? values.image.name : "",
      },
    };
    updateWorkspaceHandle(data);
  };
  const handleImageChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };
  const handleDeleteConfrim = async () => {
    const ok = await confrimDelete();
    if (!ok) return;
    deleteWorkspaceHandle(
      {
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: () => {
          window.location.href = "/";
        },
      }
    );
  };

  const handleCopyLink = () => {
    if (fullInviteLink) {
      navigator.clipboard.writeText(fullInviteLink).then(() => {
        toast.success("Invite link copied to the clipboard");
      });
    }
  };
  const handleResetCodeInvite = async () => {
    const ok = await confrimResetCode();
    if (!ok) return;
    resetCodeInviteWorkspace(
      {
        param: { workspaceId: initialValues.$id },
      },
    );
  };
  useEffect(() => {
    if (window !== undefined) {
      setFullInviteLink(`${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`)
    }
  }, [initialValues.$id, initialValues.inviteCode])
  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <ResetCodeDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size={"sm"}
            variant={"secondary"}
            onClick={
              onCancle
                ? onCancle
                : () => router.push(`/workspaces/${initialValues.$id}`)
            }
          >
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
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
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter workspace name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              className="object-cover"
                              fill
                              alt="Logo"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG, JPEG or SVG
                          </p>
                          <Input
                            className="hidden"
                            type="file"
                            accept=".jpg, .png, .jpeg, .svg"
                            ref={inputRef}
                            onChange={handleImageChage}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={isPending}
                              size={"xs"}
                              variant={"destructive"}
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={isPending}
                              size={"xs"}
                              variant={"teritrary"}
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
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
                  className={cn(!onCancle && "invisible")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} size={"lg"}>
                  {isPending ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    "Edit Workspace"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Invite Members</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add members to your workspace.
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input disabled value={fullInviteLink} />
                <Button
                  onClick={handleCopyLink}
                  variant={"secondary"}
                  className="size-12"
                >
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>
            <Button
              size={"sm"}
              variant={"outline"}
              type="button"
              className="mt-6 w-fit ml-auto"
              disabled={isPending || isDeletePending || isResetCodePending}
              onClick={handleResetCodeInvite}
            >
              Reset invite link
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is a irreversible and will remove all
              associated data
            </p>
            <Button
              size={"sm"}
              variant={"destructive"}
              type="button"
              className="mt-6 w-fit ml-auto"
              disabled={isPending || isDeletePending || isResetCodePending}
              onClick={handleDeleteConfrim}
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditWorkSpaceForm;
