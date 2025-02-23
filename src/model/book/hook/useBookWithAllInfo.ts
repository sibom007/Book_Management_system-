import { BookWithAllInfo } from "../server/BookActions";
import { useQuery } from "@tanstack/react-query";
import { Book_Constant } from "@/utils/BookConstant";

const fetchBook = async (BookId: string) => {
  const result = await BookWithAllInfo(BookId);
  return result;
};

export const useBookWithAllInfo = (BookId: string) => {
  return useQuery({
    queryKey: [Book_Constant.BOOK_CHAPTERS_QUESTION],
    queryFn: () => fetchBook(BookId),
    retry: 2,
    enabled: !!BookId,
  });
};
