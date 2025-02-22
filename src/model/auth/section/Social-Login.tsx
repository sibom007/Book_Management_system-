"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <div className="my-4">
      <Button
        variant={"primary"}
        className="w-full"
        onClick={() => signIn("google")}>
        <FcGoogle />
        Google Login
      </Button>
    </div>
  );
};

export default SocialLogin;
