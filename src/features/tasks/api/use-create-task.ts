import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
type ReponseType = InferResponseType<
  (typeof client.api.tasks)["$post"],
  200
>;
type RequestType = InferRequestType<(typeof client.api.tasks)["$post"]>;
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ReponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks["$post"]({ json });
      if (!response.ok) throw new Error("Failed to create Task");
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Task created");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
    },
    onError: () => {
      toast.error("Failed to create Task");
    },
  });
  return mutation;
};
