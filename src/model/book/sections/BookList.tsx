"use client";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import BookCard from "./BookCard";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import AddBook from "./AddBook";
import { useBooks } from "../hook/useBooks";
import BookCardSkeleton from "./Skeleton/BookCardSkeleton";

const BookList = () => {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const { data, isLoading, isFetching } = useBooks(
    page,
    6,
    undefined,
    undefined,
    title
  );

  const booksContainer = useRef(null);

  useGSAP(() => {
    gsap.from(".book-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2, // Staggers each card by 0.2s
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="px-10 mt-5">
      <Header name="Books" />
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-end gap-2 w-full relative">
          <Input
            type="search"
            placeholder="Search..."
            className="w-[20%] focus:w-[40%] transition-all duration-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <Search className="absolute right-[27%] md:right-[17%] lg:right-[8%] size-4 md:size-6 " />
          {/* <Button variant={"secondary"}>Add Books</Button> */}
          <AddBook />
        </div>
      </div>
      <div
        ref={booksContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {isLoading || isFetching ? (
          Array.from({ length: 6 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))
        ) : data?.books.length === 0 ? (
          <div className="text-center text-4xl">No Books are available </div>
        ) : (
          data?.books.map((book) => (
            <BookCard key={book.id} book={book} className="book-card" />
          ))
        )}
      </div>
      {/* Pagination Controls */}
      <div className="my-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={page === 1 ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>

            {[...Array(data?.totalPages || 1)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => setPage(index + 1)}
                  className={page === index + 1 ? "bg-gray-200" : ""}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setPage((prev) => prev + 1)}
                className={
                  page === data?.totalPages
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
export default BookList;
