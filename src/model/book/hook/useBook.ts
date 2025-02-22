import { useQuery } from "@tanstack/react-query";
import { book } from "../server/BookActions";
import { Book_Constant } from "@/utils/BookConstant";

const fetchBook = async (BookId: string) => {
  const result = await book(BookId);
  return result;
};

export const useBook = (BookId: string) => {
  return useQuery({
    queryKey: [Book_Constant.BOOK, BookId],
    queryFn: () => fetchBook(BookId),
    retry: 2,
    enabled: !!BookId,
  });
};
