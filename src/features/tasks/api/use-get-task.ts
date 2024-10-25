import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { Task } from "@/features/tasks/types";

interface UseGetTasksProps {
  taskId: string;
}

export const useGetTaskById = ({ taskId }: UseGetTasksProps) => {
  const query = useQuery<Task>({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"].$get({
        param: {
          taskId,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch useGetTask");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
