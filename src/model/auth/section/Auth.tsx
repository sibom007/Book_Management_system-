"use client";

import { useState } from "react";
import SignIn from "./Sign-In";
import SignUp from "./Sign-up";


const Auth = () => {
  const [varient, setVarient] = useState("sign-in");

  return (
    <>
      {varient === "sign-in" ? (
        <SignIn setVarient={setVarient} />
      ) : (
        <SignUp setVarient={setVarient} />
      )}
      
    </>
  );
};

export default Auth;
