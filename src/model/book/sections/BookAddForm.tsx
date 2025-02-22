import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddBook } from "../hook/useAddBook";
import { DialogClose } from "@/components/ui/dialog"; // Import DialogClose

const BookAddForm = () => {
  const { mutate, isPending } = useAddBook();
  const [title, setTitle] = useState("");
  const [classValue, setClassValue] = useState("");
  const [chapter, setChapter] = useState("");

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      title,
      class: Number(classValue),
      chapterCount: Number(chapter),
    });
    setTitle("");
    setClassValue("");
    setChapter("");
  };

  return (
    <form onSubmit={HandleSubmit} className="flex flex-col gap-2">
      <div>
        <label htmlFor="title" className="text-sm text-muted">
          Title
        </label>
        <Input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="class" className="text-sm text-muted">
          Class
        </label>
        <Input
          type="number"
          placeholder="Class"
          value={classValue}
          onChange={(e) => setClassValue(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="title" className="text-sm text-muted">
          Chapter
        </label>
        <Input
          type="number"
          placeholder="Chapter"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <DialogClose asChild>
          <Button type="submit" variant="secondary" disabled={isPending}>
            Submit
          </Button>
        </DialogClose>
      </div>
    </form>
  );
};
export default BookAddForm;
