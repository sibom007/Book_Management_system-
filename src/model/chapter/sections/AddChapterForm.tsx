"use client";
import { useState } from "react";
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
  const { data } = useSelectChapter(BookId);
  const { mutate, isPending } = useAddChapter();

  const createdChapters = data?.map((item) => item.content); // Extract the created chapters
  const chapters = Array.from({ length: 10 }, (_, i) => {
    const chapterValue = `CH${i + 1}`;
    // Exclude created chapters
    if (!createdChapters?.includes(chapterValue)) {
      return {
        label: `Chapter ${i + 1}`,
        value: chapterValue,
      };
    }
  }).filter(Boolean); // Remove undefined values if any

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
        <SelectContent className="bg-black text-white">
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
