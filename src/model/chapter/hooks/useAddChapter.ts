import { toast } from "sonner";
import { AddChapter } from "../server/ChapterActions";
import { CHAPTER_Constant } from "@/utils/ChapterConstant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Book_Constant } from "@/utils/BookConstant";

export const useAddChapter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      title: string;
      content: string;
      bookId: string;
    }) => {
      return await AddChapter(payload);
    },

    onSuccess: () => {
      toast.success("Chapter added successfully!");
      queryClient.invalidateQueries({
        queryKey: [CHAPTER_Constant.SELECT_CHAPTERS],
      });
      queryClient.invalidateQueries({
        queryKey: [Book_Constant.BOOK_CHAPTERS_QUESTION],
      });
    },

    onError: (error) => {
      toast.error(
        error.message || "An error occurred while adding the chapter"
      );
    },
  });
};
