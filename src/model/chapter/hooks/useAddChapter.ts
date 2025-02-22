import { toast } from "sonner";
import { AddChapter } from "../server/ChapterActions";
import { CHAPTER_Constant } from "@/utils/ChapterConstant";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    },

    onError: (error) => {
      if (error instanceof Error) {
        toast.error(
          error.message || "An error occurred while adding the chapter"
        );
      } else {
        toast.error("An unknown error occurred while adding the chapter");
      }
    },
  });
};
