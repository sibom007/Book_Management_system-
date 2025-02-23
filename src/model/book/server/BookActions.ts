"use server";

import { prisma } from "@/lib/prisma";
import { userAuthorised } from "@/utils/userAuthorised";

export const Books = async ({
  page = 1,
  limit = 6,
  Class,
  author,
  title,
}: {
  page?: number;
  limit?: number;
  Class?: number;
  author?: string;
  title?: string;
}) => {
  await userAuthorised();

  const filters: {
    class?: number;
    author?: string;
    title?: { contains: string; mode: "insensitive" };
  } = {};
  if (Class !== undefined) filters.class = Class;
  if (author) filters.author = author;
  if (title) filters.title = { contains: title, mode: "insensitive" };

  // Get total count of matching books
  const totalBooks = await prisma.book.count({ where: filters });

  // Calculate total pages
  const totalPages = Math.ceil(totalBooks / limit);

  // Fetch paginated books
  const books = await prisma.book.findMany({
    where: filters,
    skip: (page - 1) * limit,
    take: limit,
  });

  return { books, totalPages };
};
export const addBook = async (payload: {
  title: string;
  class: number;
  chapterCount: number;
}) => {
  const user = await userAuthorised();
  if (!payload) throw new Error("Invalid payload");
  if (!user.id) {
    throw new Error("You are not authorized to add this book");
  }
  const result = await prisma.book.create({
    data: {
      title: payload.title,
      class: payload.class,
      chapterCount: payload.chapterCount,
      author: user.email,
      userId: user.id,
    },
  });
  if (!result) throw new Error("Failed to create book");
  return result;
};
export const book = async (BookId: string) => {
  await userAuthorised();
  const result = await prisma.book.findUniqueOrThrow({
    where: {
      id: BookId,
    },
  });
  return result;
};

export const userBook = async () => {
  const User = await userAuthorised();
  const result = await prisma.user.findFirstOrThrow({
    where: {
      email: User.email,
    },
    select: {
      password: false,
      books: true,
    },
  });

  return result;
};

export const updateBook = async (
  BookId: string,
  payload: { title?: string; class?: number }
) => {
  await userAuthorised();
  const result = await prisma.book.update({
    where: {
      id: BookId,
    },
    data: payload,
  });
  if (!result) throw new Error("Failed to update book");
  return result;
};

export const deleteBook = async (BookId: string) => {
  await userAuthorised();
  const result = await prisma.book.delete({
    where: {
      id: BookId,
    },
  });
  if (!result) throw new Error("Failed to delete book");
  return result;
};

export const BookWithAllInfo = async (BookId: string) => {
  await userAuthorised();
  const result = await prisma.book.findUniqueOrThrow({
    where: {
      id: BookId,
    },
    include: {
      chapters: {
        include: {
          Question: true,
        },
      },
    },
  });
  if (!result) {
    throw new Error("Book not found");
  }
  return result;
};
