import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
type ReponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$delete"]
>;
export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ReponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.members[":memberId"]["$delete"]({
        param,
      });
      if (!response.ok) throw new Error("Failed to deleted member");
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Member deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["members", data.$id] });
    },
    onError: () => {
      toast.error("Failed to deleted member");
    },
  });
  return mutation;
};
