import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Books } from "../server/BookActions";
import { Book_Constant } from "@/utils/BookConstant";

// Define the query function to fetch books using Next.js server actions
export const fetchBooks = async (
  page: number = 1,
  limit: number = 5,
  Class?: number,
  author?: string,
  title?: string
) => {
  try {
    return await Books({ page, limit, Class, author, title }); // Calling the Books function directly
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message || "An error occurred while fetching books");
    } else {
      toast.error("An unknown error occurred while fetching books");
    }
    throw error;
  }
};
/**
 * Custom Hook: useBooks
 * Fetches books from the server using React Query.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of books per page.
 * @param {number} [Class] - Optional filter by class.
 * @param {string} [author] - Optional filter by author.
 * @returns {object} - React Query result containing data, error, and status.
 */
export const useBooks = (
  page: number = 1,
  limit: number = 6,
  Class?: number,
  author?: string,
  title?: string
) => {
  return useQuery({
    queryKey: [Book_Constant.BOOKS, page, limit, Class, author, title], // Unique key for caching & refetching
    queryFn: () => fetchBooks(page, limit, Class, author, title),
    retry: 2, // Retry up to 3 times on failure
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
  });
};
