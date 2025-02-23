"use server";
import { prisma } from "@/lib/prisma";
import { userAuthorised } from "@/utils/userAuthorised";

export const AddChapter = async (payload: {
  title: string;
  content: string;
  bookId: string;
}) => {
  if (payload.title.length < 1) {
    throw new Error("Title is required");
  }
  if (payload.content.length < 1) {
    throw new Error("Content is required");
  }
  await userAuthorised();
  const result = await prisma.chapter.create({
    data: {
      title: payload.title,
      content: payload.content,
      bookId: payload.bookId,
    },
  });
  if (!result) {
    throw new Error("Failed to create chapter");
  }
  return result;
};

// export const SelectChapter = async (BookId: string) => {
//   await userAuthorised();
//   // Fetch book's chapters
//   const bookWithChapters = await prisma.book.findUnique({
//     where: { id: BookId },
//     select: { chapters: true },
//   });
//   return bookWithChapters?.chapters;
// };

export const SelectChapter = async (BookId: string) => {
  await userAuthorised();

  // Fetch book with chapter count and existing chapters
  const bookWithChapters = await prisma.book.findUnique({
    where: { id: BookId },
    select: {
      chapterCount: true, // Assuming `chapterCount` is stored in the book table
      chapters: {
        select: { content: true }, // Fetch only the content field
      },
    },
  });

  return {
    totalChapters: bookWithChapters?.chapterCount || 0,
    createdChapters:
      bookWithChapters?.chapters.map((chapter) => chapter.content) || [],
  };
};
