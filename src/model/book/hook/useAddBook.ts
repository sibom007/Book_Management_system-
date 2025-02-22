import { toast } from "sonner";
import { addBook } from "../server/BookActions";
import { Book_Constant } from "@/utils/BookConstant";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      title: string;
      class: number;
      chapterCount: number;
    }) => {
      try {
        return await addBook(payload);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message || "An error occurred while addimg books");
        } else {
          toast.error("An unknown error occurred while Adding books");
        }
      }
    },

    onSuccess: () => {
      toast.success("Book added successfully!");
      queryClient.invalidateQueries({ queryKey: [Book_Constant.BOOKS] });
    },
  });
};
