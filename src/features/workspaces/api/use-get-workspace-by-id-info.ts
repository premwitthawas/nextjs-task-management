import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface useGetWorkspaceByIdInfoProp {
  workspaceId: string;
}

export const useGetWorkspaceByIdInfo = ({
  workspaceId,
}: useGetWorkspaceByIdInfoProp) => {
  const query = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces["info"][":workspaceId"].$get(
        {
          param: {
            workspaceId,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
