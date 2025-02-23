import { toast } from "sonner";

import { CHAPTER_Constant } from "@/utils/ChapterConstant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddQuestionToDB } from "../server/QuestionsActions";

export const useAddQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: {
        question: string;
        answer: string;
        contant: string;
        BookId: string;
      };
    }) => {
      return await AddQuestionToDB(payload);
    },

    onSuccess: () => {
      toast.success("Question added successfully!");
      queryClient.invalidateQueries({
        queryKey: [CHAPTER_Constant.SELECT_CHAPTERS],
      });
    },

    onError: (error) => {
      toast.error(
        error.message || "An error occurred while adding the question"
      );
    },
  });
};
