import React, { useCallback, useEffect, useState } from "react";
import { Task, TaskStatus } from "@/features/tasks/types";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { KanbanHeaderColumn } from "@/features/tasks/components/kanban-header-column";
import { KabanCard } from "@/features/tasks/components/kaban-card";

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

type TaskState = {
  [Key in TaskStatus]: Task[];
};

interface Props {
  data: Task[];
  onChange: (
    tasks: { $id: string; status: TaskStatus; position: number }[]
  ) => void;
}

export const DndKanban = ({ data, onChange }: Props) => {
  const [tasks, setTasks] = useState<TaskState>(() => {
    const initialTasks: TaskState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };
    data.forEach((task) => {
      initialTasks[task.status as TaskStatus].push(task);
    });
    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort(
        (a, b) => a.position - b.position
      );
    });
    return initialTasks;
  });
  const onDragEndHandle = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const { source, destination } = result;
      const sourecStatus = source.droppableId as TaskStatus;
      const destStatus = destination.droppableId as TaskStatus;
      let updatesPayload: {
        $id: string;
        status: TaskStatus;
        position: number;
      }[] = [];
      setTasks((prev) => {
        const newTasks = { ...prev };
        const sourceColumn = [...newTasks[sourecStatus]];
        const [movedTask] = sourceColumn.splice(source.index, 1);
        if (!movedTask) {
          console.error("No tasks found at source index");
          return prev;
        }
        const updateMovedTask =
          sourecStatus !== destStatus
            ? { ...movedTask, status: destStatus }
            : movedTask;

        newTasks[sourecStatus] = sourceColumn;
        const descColumn = [...newTasks[destStatus]];
        descColumn.splice(destination.index, 0, updateMovedTask);
        newTasks[destStatus] = descColumn;
        updatesPayload = [];
        updatesPayload.push({
          $id: updateMovedTask.$id,
          status: destStatus,
          position: Math.min((destination.index + 1) * 1000, 1_000_000),
        });
        newTasks[destStatus].forEach((task, index) => {
          if (task && task.$id !== updateMovedTask.$id) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (task.position !== newPosition) {
              updatesPayload.push({
                $id: task.$id,
                status: destStatus,
                position: newPosition,
              });
            }
          }
        });
        if (sourecStatus !== destStatus) {
          newTasks[sourecStatus].forEach((task, index) => {
            if (task) {
              const newPosition = Math.min((index + 1) * 1000, 1_000_000);
              if (task.position !== newPosition) {
                updatesPayload.push({
                  $id: task.$id,
                  status: sourecStatus,
                  position: newPosition,
                });
              }
            }
          });
        }
        return newTasks;
      });
      onChange(updatesPayload);
    },
    [onChange]
  );
  useEffect(() => {
    const newTasks: TaskState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };
    data.forEach((task) => {
      newTasks[task.status as TaskStatus].push(task);
    });
    Object.keys(newTasks).forEach((status) => {
      newTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
    });
    setTasks(newTasks)
  }, [data]);
  return (
    <DragDropContext onDragEnd={onDragEndHandle}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div
              className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
              key={board}
            >
              <KanbanHeaderColumn
                board={board}
                taskCount={tasks[board].length}
              />
              <Droppable droppableId={board}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px] py-1.5"
                  >
                    {tasks[board].map((task, idx) => {
                      return (
                        <Draggable
                          key={task.$id}
                          draggableId={task.$id}
                          index={idx}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              <KabanCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
