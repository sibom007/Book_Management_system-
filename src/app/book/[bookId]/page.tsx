import SingleBook from "@/model/book/sections/SingleBook/SingleBook";

const SingleBookPage = ({ params }: { params: { bookId: string } }) => {
  return (
    <div>
      <SingleBook BookId={params.bookId} />
    </div>
  );
};

export default SingleBookPage;
