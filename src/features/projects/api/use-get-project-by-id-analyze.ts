import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";

interface PropUseProjectAnalyticById {
  projectId: string;
}

export type AnalyticsProjectResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["analytics"]["$get"],
  200
>;

export const useGetProjectAnalyticById = ({
  projectId,
}: PropUseProjectAnalyticById) => {
  // console.log(projectId);
  const query = useQuery({
    queryKey: ["project-analytics"],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"][
        "analytics"
      ].$get({
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
