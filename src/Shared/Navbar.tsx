"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import MobilNav from "./MobilNav";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    tl.from(navItemsRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
    });
  }, []);

  useGSAP(() => {
    // GSAP hover effect for navbar items
    navItemsRef.current.forEach((item) => {
      if (item) {
        const border = document.createElement("div");
        border.classList.add(
          "border-b-animation",
          "absolute",
          "bottom-0",
          "left-0",
          "w-full",
          "h-[2px]",
          "bg-Sprimary",
          "scale-x-0",
          "origin-left"
        );
        item.appendChild(border);
        gsap.set(border, { scaleX: 0 });
        item.addEventListener("mouseenter", () => {
          gsap.to(border, { scaleX: 1, duration: 0.5, ease: "power2.out" });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(border, {
            scaleX: 0,
            duration: 0.5,
            transformOrigin: "right center",
            ease: "power2.in",
          });
        });
      }
    });
  }, []);

  useEffect(() => {
    gsap.fromTo(
      spanRefs.current,
      { opacity: 0, y: -50, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, []);
  const { data: session } = useSession()
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth" });
  };



  return (
    <nav
      ref={navRef}
      className="flex items-center justify-between px-6 py-4 bg-tertiary shadow-md">
      <div className=" flex items-center justify-between w-full">
        {/* left side */}
        <div>
          <h1 className="text-xl font-semibold flex space-x-1">
            {Array.from("School Forest").map((char, index) => (
              <span
                ref={(el: HTMLSpanElement | null) => {
                  if (el) spanRefs.current[index] = el;
                }}
                key={index}
                className="inline-block span">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* right side */}
        <div className="flex items-center justify-between gap-4 relative">
          {/* Menu Items for Desktop */}
          <div className="hidden lg:block">
            <ul
              className={` flex items-center gap-10 text-md font-semibold  absolute lg:static top-16 left-0 w-full bg-tertiary lg:w-auto lg:bg-transparent lg:flex-row `}>
              {[
                { name: "Home", path: "/" },
                { name: "Contact", path: "/contact" },
                { name: "Book", path: "/book" },
                { name: "Rank", path: "/rank" },
                { name: "About", path: "/about" },
              ].map((item, index) => (
                <li
                  ref={(el: HTMLLIElement | null) => {
                    navItemsRef.current[index] = el;
                  }}
                  key={index}
                  className="nav-item relative cursor-pointer pb-1">
                  <Link
                    href={item.path}
                    className="block hover:text-Sprimary transition duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/*  for Mobile */}
          <MobilNav />

          {/* Profile Picture for Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="No img"
                width={50}
                height={50}
                className="object-cover rounded-bl-2xl rounded-tr-2xl"
                style={{ width: "auto", height: "auto" }} // Ensure the aspect ratio is maintained
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="me-2">

              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {session?.user?.email ? <p onClick={handleLogout} className="flex-1">
                  LogOut
                </p> : <Link href={"/auth"} className="flex-1">
                  Login
                </Link>}

              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
