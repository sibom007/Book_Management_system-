import { useQuery } from "@tanstack/react-query";
import { userBook } from "../server/BookActions";
import { toast } from "sonner";
import { Book_Constant } from "@/utils/BookConstant";

export const useUserBooks = () => {
  return useQuery({
    queryKey: [Book_Constant.USER_BOOKS],
    queryFn: async () => {
      try {
        const response = await userBook();
        return response;
      } catch (error) {
        toast.error("Failed to fetch user books");
        throw error;
      }
    },
  });
};
