"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";
import { Input } from "@/components/ui/input";
import useSignUp from "../hooks/useSignUp";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import SocialLogin from "./Social-Login";

const SignUp = ({ setVarient }: { setVarient: (varient: string) => void }) => {
  const [showPassword, setShowPassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate } = useSignUp();
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (
      containerRef.current &&
      formRef.current &&
      logoRef.current &&
      textRef.current
    ) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(
        formRef.current.children,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
          delay: 0.5,
        }
      );

      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 1 }
      );

      const children = textRef.current.children;
      gsap.fromTo(
        children,
        { opacity: 0, y: 100 }, // Start state
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3, // Animate each child one by one
          ease: "power2.out",
        }
      );
    }
  }, []);

  const handlesignUp = () => {
    mutate(
      { email, password },
      {
        onSuccess: () => {
          setVarient("sign-in");
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen items-center justify-center px-6">
      <div className="relative  md:flex w-full max-w-5xl rounded-lg bg-gray-800 shadow-lg overflow-hidden">
        <div className=" w-full md:w-1/2 p-8">
          <div
            ref={logoRef}
            className="mb-8 text-4xl font-bold text-Sprimary text-center">
            Sign Up
          </div>

          <form ref={formRef}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your password"
                className="mt-1"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <Input
                type={showPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1"
              />
              <p className=" absolute right-3 top-9">
                {showPassword === "text" ? (
                  <FaEyeSlash onClick={() => setShowPassword("password")} />
                ) : (
                  <FaRegEye onClick={() => setShowPassword("text")} />
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={handlesignUp}
              className="w-full rounded-md bg-Sprimary py-2 font-semibold text-white transition duration-300 hover:bg-Sprimary shadow-lg hover:shadow-Sprimary/50">
              sign up
            </button>
          </form>
          <SocialLogin />
          <p className="mt-4 text-center text-sm text-gray-400">
            Dont have an account?{" "}
            <button
              onClick={() => setVarient("sign-in")}
              className="text-Ssecondary hover:underline">
              Sign Up
            </button>
          </p>
        </div>
        {/* Left Side (Welcome Message) */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-Ssecondary to-tertiary flex items-center justify-center text-center p-8 clip-path-polygon">
          <div ref={textRef} className="max-w-md">
            <h2 className="text-xl md:text-5xl font-bold text-white leading-tight tracking-tight uppercase ">
              Welcome <br /> Back!
            </h2>
            <p className="text-white text-lg md:text-xl mt-4 text-left">
              Sign in to continue your journey with us
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
