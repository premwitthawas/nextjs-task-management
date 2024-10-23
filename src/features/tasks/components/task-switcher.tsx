"use client";
import DottedSepeartor from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2Icon, PlusIcon } from "lucide-react";
import React from "react";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useQueryState } from "nuqs";
import DataFilter from "@/features/tasks/components/data-filter";
import { useTaskFilters } from "@/features/tasks/hooks/use-filter-task";
import { DataTable } from "@/features/tasks/components/data-table";
import { columns } from "@/features/tasks/components/columns";
const TaskSwitcher = () => {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });
  const [{ assigneeId, dueDate, projectId, search, status }] = useTaskFilters();
  const { open } = useCreateTaskModal();
  const workspaceId = useWorkspaceId();
  const { data: tasks, isLoading: isLoadingTask } = useGetTasks({
    workspaceId,
    assigneeId,
    dueDate,
    projectId,
    search,
    status,
  });
  return (
    <Tabs
      className="flex-1 w-full border rounded-lg"
      defaultValue={view}
      onValueChange={setView}
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="table" className="h-8 w-full lg:w-auto">
              Table
            </TabsTrigger>
            <TabsTrigger value="kanban" className="h-8 w-full lg:w-auto">
              Kanban
            </TabsTrigger>
            <TabsTrigger value="carlendar" className="h-8 w-full lg:w-auto">
              Carlendar
            </TabsTrigger>
          </TabsList>
          {/* BUTTON */}
          <Button onClick={open} className="w-full lg:w-auto" size={"sm"}>
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSepeartor className="my-4" />
        {/* FILLTER */}
        <DataFilter />
        <DottedSepeartor className="my-4" />
        {isLoadingTask ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <pre>{JSON.stringify(tasks, null, 2)}</pre>
            </TabsContent>
            <TabsContent value="carlendar" className="mt-0">
              <pre>{JSON.stringify(tasks, null, 2)}</pre>
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default TaskSwitcher;
