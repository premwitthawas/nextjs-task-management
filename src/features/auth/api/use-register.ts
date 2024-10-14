import { useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/rpc";
type ReponseType = InferResponseType<(typeof client.api.auth.register)["$post"]>;
type RequestType = InferRequestType<
  (typeof client.api.auth.register)["$post"]
>["json"];
export const useRegister = () => {
  const mutation = useMutation<ReponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.register["$post"]({ json });
      return await response.json();
    },
  });
  return mutation;
};
