import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const useSignIn = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true,
      });

      if (res?.error) {
        throw new Error(res.error);
      }
      return res;
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(`${error.message}`);
    },
    onSuccess: () => {
      toast.success("Sign-In successful");
    },
  });
};

export default useSignIn;
