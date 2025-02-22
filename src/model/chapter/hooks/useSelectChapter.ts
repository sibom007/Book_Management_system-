import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { ChapterSelect } from "../server/ChapterActions";
import { CHAPTER_Constant } from "@/utils/ChapterConstant";

export const useSelectChapter = (BookId: string) => {
  return useQuery({
    queryKey: [CHAPTER_Constant.SELECT_CHAPTERS],
    queryFn: async () => {
      try {
        return await ChapterSelect(BookId);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(
            error.message || "An error occurred while fetching books"
          );
        } else {
          toast.error("An unknown error occurred while fetching books");
        }
        throw error;
      }
    },

    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};
