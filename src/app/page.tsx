"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const handlec = async () => {
  const data = await signOut({ redirect: true, callbackUrl: "/auth" });
  console.log("hello", data);
};

const Homepage = () => {
  return (
    <div className="bg-primary">
      <Button className="bg-Sprimary" onClick={handlec}>
        Logout
      </Button>
    </div>
  );
};

export default Homepage;
