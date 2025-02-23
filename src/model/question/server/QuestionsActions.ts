"use server";

import { prisma } from "@/lib/prisma";
import { userAuthorised } from "@/utils/userAuthorised";

export const AddQuestionToDB = async (payload: {
  question: string;
  answer: string;
  contant: string;
  BookId: string;
}) => {
  if (!payload.BookId) {
    throw new Error("BookId is required");
  }
  const user = await userAuthorised();
  if (!user) {
    throw new Error("User not authorised");
  }

  const chapter = await prisma.chapter.findFirst({
    where: {
      bookId: payload.BookId,
      content: payload.contant,
    },
  });

  if (!chapter) {
    throw new Error("Chapter not found");
  }

  const { question, answer } = payload;
  if (!question || !answer) {
    throw new Error("Question and Answer are required");
  }

  const result = await prisma.question.create({
    data: {
      question,
      answer,
      chapterId: chapter.id,
      userId: user.id!,
    },
  });

  return result;
};
