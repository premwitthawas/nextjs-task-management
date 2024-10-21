import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UseGetProjectsProps {
  workspaceId: string;
}

export const useGetProjects = ({ workspaceId }: UseGetProjectsProps) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId: workspaceId },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch useGetProjects");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
