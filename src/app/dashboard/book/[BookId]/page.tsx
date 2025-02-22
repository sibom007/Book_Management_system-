import SingleBook from "@/model/book/sections/SingleBook/SingleBook";

interface BookPageProps {
  params: Promise<{ BookId: string }>; // params is a promise
}

const BookPage = async ({ params }: BookPageProps) => {
  const { BookId } = await params;

  return (
    <div>
      <SingleBook BookId={BookId} />
    </div>
  );
};

export default BookPage;
