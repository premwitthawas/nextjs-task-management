import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
type ReponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;
export const useLogout = () => {
  const mutation = useMutation<ReponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();
      if(!response.ok) throw new Error('Failed to logout')
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Loggout sucesss");
      window.location.reload();
    },
    onError: ()=> {
      toast.error("Failed to loggout")
    }
  });
  return mutation;
};
