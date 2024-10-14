import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { client } from "@/lib/rpc";
type ReponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;
export const useLogout = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation<ReponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();
      return await response.json();
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["current"] });
    },
  });
  return mutation;
};
