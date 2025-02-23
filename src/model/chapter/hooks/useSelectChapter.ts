import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

import { CHAPTER_Constant } from "@/utils/ChapterConstant";
import { SelectChapter } from "../server/ChapterActions";

export const useSelectChapter = (BookId: string) => {
  return useQuery({
    queryKey: [CHAPTER_Constant.SELECT_CHAPTERS],
    queryFn: async () => {
      try {
        const { createdChapters, totalChapters } = await SelectChapter(BookId);
        return { createdChapters, totalChapters };
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
