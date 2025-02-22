import { toast } from "sonner";
import { updateBook } from "../server/BookActions";
import { Book_Constant } from "@/utils/BookConstant";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      BookId,
      payload,
    }: {
      BookId: string;
      payload: { title: string; class: number };
    }) => await updateBook(BookId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Book_Constant.BOOKS] });

      toast.success("Book updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update book");
    },
  });
};
