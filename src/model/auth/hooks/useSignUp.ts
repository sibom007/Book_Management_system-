import { toast } from "sonner";
import { signUp } from "../server/authActions";
import { useMutation } from "@tanstack/react-query";

const useSignUp = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await signUp({ email, password });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
    onSuccess: () => {
      toast.success("Sign-up successful");
    },
  });
};
export default useSignUp;
