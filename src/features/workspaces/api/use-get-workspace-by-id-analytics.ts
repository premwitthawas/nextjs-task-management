import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";

interface useGetWorkspaceByIdAnalyticsProp {
  workspaceId: string;
}

export type AnalyticsWorkspaceResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["analytics"]["$get"],
  200
>;

export const useGetWorkspaceByIdAnalytics = ({
  workspaceId,
}: useGetWorkspaceByIdAnalyticsProp) => {
  const query = useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"][
        "analytics"
      ].$get({
        param: {
          workspaceId,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
