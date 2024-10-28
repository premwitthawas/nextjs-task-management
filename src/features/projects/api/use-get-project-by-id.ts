import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface PropUseGetProjectById {
  projectId: string;
}

export const useGetProjectById = ({ projectId }: PropUseGetProjectById) => {
  // console.log(projectId);
  const query = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"].$get({
        param: {
          projectId,
        },
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
