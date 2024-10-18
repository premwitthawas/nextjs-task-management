import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
type ReponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"]
>;
export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ReponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.workspaces[":workspaceId"]["join"][
        "$post"
      ]({ param, json });
      if (!response.ok) throw new Error("Failed member to join workspace");
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Join to Workspace success");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] });
    },
    onError: () => {
      toast.error("Failed  member to join workspace");
    },
  });
  return mutation;
};
