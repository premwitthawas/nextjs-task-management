"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeftIcon, ImageIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Project } from "@/features/projects/types";
import { useUpdateProject } from "@/features/projects/api/use-update-project";
import { updateProjectSchema } from "@/features/projects/schema";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import UseConfirm from "@/hooks/use-confrim";

interface Props {
  onCancle?: () => void;
  initialValues: Project;
}

const EditProjectForm = ({ onCancle, initialValues }: Props) => {
  const router = useRouter();
  const { mutate: updateProjectHandle, isPending } = useUpdateProject();
  const { mutate: deleteProjectHandle, isPending: isDeletePending } = useDeleteProject();
  const [DeleteDialog, confrimDelete] = UseConfirm(
    "Delete Project",
    "This action cannot be undone.",
    'destructive'
  );
  const inputRef = React.useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof updateProjectSchema>>({
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
    resolver: zodResolver(updateProjectSchema),
  });
  const onSubmitHandle = (values: z.infer<typeof updateProjectSchema>) => {
    const data = {
      param: {
        projectId: initialValues.$id,
      },
      form: {
        name: values.name as string,
        image: values.image instanceof File ? values.image : "",
        filename: values.image instanceof File ? values.image.name : "",
      },
    };
    updateProjectHandle(data, {
      onSuccess: () => {
        form.reset();
        router.push(`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`)
      },
    });
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
    deleteProjectHandle(
      {
        param: { projectId: initialValues.$id },
      },
      {
        onSuccess: () => {
          router.push(`/workspaces/${initialValues.workspaceId}`)
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      {/* <ResetCodeDialog /> */}
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size={"sm"}
            variant={"secondary"}
            onClick={
              onCancle
                ? onCancle
                : () => router.push(`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`)
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
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Project name" />
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
                          <p className="text-sm">Project Icon</p>
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
                    "Edit Project"
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
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a Project is a irreversible and will remove all
              associated data
            </p>
            <Button
              size={"sm"}
              variant={"destructive"}
              type="button"
              className="mt-6 w-fit ml-auto"
              disabled={isPending || isDeletePending}
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

export default EditProjectForm;
