import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
type ReponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$delete"]
>;
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ReponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":projectId"]["$delete"]({
        param,
      });
      if (!response.ok) throw new Error("Failed to deleted Project");
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", data.$id] });
    },
    onError: () => {
      toast.error("Failed to delete Project");
    },
  });
  return mutation;
};