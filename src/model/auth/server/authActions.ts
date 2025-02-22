"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authValidation } from "../validation/AuthVaildation";

interface IAuth {
  email: string;
  password: string;
}

export const signUp = async (payload: IAuth) => {
  if (!payload.email || !payload.password)
    throw new Error("Email and password are required");

  const exUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (exUser) {
    throw new Error("User already exists");
  }

  const validation = authValidation.safeParse(payload);
  if (!validation.success) {
    const errors = validation.error.issues.map((issue) => issue.message);
    throw new Error(errors.join(", "));
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const { id, email } = await prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
    },
  });
  const user = { id, email };
  return user;
};
