"use client";
import Header from "@/components/Header";
import AddChapter from "@/model/chapter/sections/AddChapter";
import AddQuestion from "@/model/question/sections/AddQuestion";
import { useBook } from "../../hook/useBook";

const SingleBook = ({ BookId }: { BookId: string }) => {
  const { data } = useBook(BookId);
  return (
    <div className="px-10">
      <Header name={data?.title || ""} variant="primary" />

      <div className="flex justify-end gap-4">
        <AddQuestion BookId={BookId} />
        <AddChapter BookId={BookId} />
      </div>
    </div>
  );
};

export default SingleBook;
