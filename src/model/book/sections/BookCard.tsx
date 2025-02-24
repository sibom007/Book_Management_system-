"use client";
import { gsap } from "gsap";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";

import { useRef } from "react";

interface BookCardProps {
  className: string;
  book: {
    id: string;
    title: string;
    class: number;
    chapterCount: number;
  };
}

const BookCard = ({ className, book }: BookCardProps) => {
  const cardRef = useRef(null);
  useGSAP(() => {
    if (cardRef.current) {
      const element = cardRef.current as HTMLElement;
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(element, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`border rounded-lg shadow-lg p-4 w-full max-w-lg ${className} shadow-md hover:shadow-Ssecondary transition-shadow duration-300`}>
      <div className="bg-tertiary text-center h-40 flex items-center justify-center rounded-md">
        <h1 className="text-6xl font-semibold">
          {book?.title
            .split("")
            .slice(0, 2)
            .map((word) => word.slice(0, 2))
            .join("")}
        </h1>
      </div>
      <h2 className="text-lg font-semibold mt-2">{book?.title}</h2>
      <div className="flex justify-between mt-1">
        <h2 className="text-md font-medium">Class - {book?.class}</h2>
        <h2 className="text-md font-medium">Chapter - {book?.chapterCount}</h2>
      </div>
      <div className="flex justify-between mt-4">
        <Button variant={"primary"}>
          <Link href={`book/${book?.id}`} className="flex-1">
            See More
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
