import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../server/BookActions";
import { toast } from "sonner";
import { Book_Constant } from "@/utils/BookConstant";

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (BookId: string) => deleteBook(BookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Book_Constant.BOOKS] });
      toast.success("Book deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete book");
    },
  });
};
