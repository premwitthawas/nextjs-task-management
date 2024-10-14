import { useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/rpc";
type ReponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<
  (typeof client.api.auth.login)["$post"]
>["json"];
export const useLogin = () => {
  const mutation = useMutation<ReponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.login["$post"]({ json });
      return await response.json();
    },
  });
  return mutation;
};
