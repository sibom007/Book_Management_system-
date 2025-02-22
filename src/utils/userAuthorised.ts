import { auth } from "@/utils/auth";

export const userAuthorised = async () => {
  const user = await auth();
  if (!user) throw new Error("User not authorised");
  if (!user?.user) throw new Error("User not found");
  if (!user?.user?.email) throw new Error("User not found");
  return user.user;
};
