"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import AddChapter from "@/model/chapter/sections/AddChapter";

const SingleBook = ({ BookId }: { BookId: string }) => {
  return (
    <div className="px-10">
      <Header name="SingleBook" variant="primary" />

      <div className="flex justify-end gap-4">
        <Button variant={"secondary"}>Add Question</Button>
        <AddChapter BookId={BookId} />
      </div>
    </div>
  );
};

export default SingleBook;
