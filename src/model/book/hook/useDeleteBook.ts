import { toast } from "sonner";
import { deleteBook } from "../server/BookActions";
import { Book_Constant } from "@/utils/BookConstant";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
