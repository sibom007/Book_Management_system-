"use client";
import { useMemo, useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useAddChapter } from "../hooks/useAddChapter";
import { useSelectChapter } from "../hooks/useSelectChapter";

const AddChapterForm = ({ BookId }: { BookId: string }) => {
  const [title, setTitle] = useState("");
  const [contant, setContant] = useState("");
  const { mutate, isPending } = useAddChapter();

  const { data, refetch } = useSelectChapter(BookId) ?? {
    totalChapters: 0,
    createdChapters: [],
  };

  useEffect(() => {
    // Refetch chapters when BookId changes
    if (BookId) {
      refetch();
    }
  }, [BookId, refetch]);

  const chapters = useMemo(() => {
    return Array.from({ length: data?.totalChapters || 0 }, (_, i) => {
      const chapterValue = `CH${i + 1}`;
      if (!data?.createdChapters.includes(chapterValue)) {
        return { label: `Chapter ${i + 1}`, value: chapterValue };
      }
    }).filter(Boolean);
  }, [data?.totalChapters, data?.createdChapters]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", { title, contant });
    mutate({ title, content: contant, bookId: BookId });
    setTitle("");
    setContant("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select onValueChange={(value) => setContant(value)}>
        <SelectTrigger className="w-full py-6 mb-4">
          <SelectValue placeholder="Select a chapter" />
        </SelectTrigger>
        <SelectContent className="bg-black text-white h-52">
          {chapters.map((chapter) => (
            <SelectItem key={chapter?.value} value={chapter?.value || ""}>
              {chapter?.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Chapter Name"
        className="mb-3"
      />
      <div className="flex justify-end">
        <DialogClose asChild>
          <Button type="submit" disabled={isPending} variant={"secondary"}>
            Submit
          </Button>
        </DialogClose>
      </div>
    </form>
  );
};

export default AddChapterForm;
