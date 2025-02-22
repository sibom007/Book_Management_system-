"use server";
import { prisma } from "@/lib/prisma";
import { userAuthorised } from "@/utils/userAuthorised";

export const AddChapter = async (payload: {
  title: string;
  content: string;
  bookId: string;
}) => {
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

export const ChapterSelect = async (BookId: string) => {
  await userAuthorised();

  // Fetch book's chapters
  const bookWithChapters = await prisma.book.findUnique({
    where: { id: BookId },
    select: { chapters: true },
  });
  return bookWithChapters?.chapters;
};
