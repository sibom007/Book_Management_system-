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

import { useSelectChapter } from "@/model/chapter/hooks/useSelectChapter";
import { useAddQuestion } from "../hooks/useAddQuestion";

const QuestionForm = ({ BookId }: { BookId: string }) => {
  const [contant, setContant] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const { mutate, isPending } = useAddQuestion();
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
      if (data?.createdChapters.includes(chapterValue)) {
        return { label: `Chapter ${i + 1}`, value: chapterValue };
      }
    }).filter(Boolean);
  }, [data?.totalChapters, data?.createdChapters]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    const payload = {
      question,
      answer,
      contant,
      BookId,
    };
    mutate({ payload });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select value={contant} onValueChange={(value) => setContant(value)}>
        <SelectTrigger className="w-full py-6 mb-4">
          <SelectValue placeholder="Select a chapter" />
        </SelectTrigger>
        <SelectContent className="bg-black text-white ">
          {chapters.map((chapter) => (
            <SelectItem key={chapter?.value} value={chapter?.value || ""}>
              {chapter?.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter Question Name"
        className="mb-3"
      />
      <Input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter Answer Name"
        className="mb-3"
      />
      <div className="flex justify-end">
        <DialogClose asChild>
          <Button type="submit" variant={"secondary"} disabled={isPending}>
            Submit
          </Button>
        </DialogClose>
      </div>
    </form>
  );
};

export default QuestionForm;
