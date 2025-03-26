import Link from 'next/link';
import { FC, ReactElement } from 'react';
import GenrePill from '@/app/components/genrePill/GenrePill';
import { PlainBookModel } from '@/models';

interface BookCardProps {
  book: PlainBookModel;
}

const BookCard: FC<BookCardProps> = ({ book }): ReactElement => {
  const authorName = `${book.author?.firstName} ${book.author?.lastName}`;
  const writtenOn = new Date(book.writtenOn).toLocaleDateString();

  return (
    <>
      <div className="border-b border-t mb-2 p-2">
        <div className="">
          <h1 className="text-2xl italic">
            <Link href={`books/${book.id}`}>{book.name}</Link>
          </h1>
        </div>
        <div className="grid grid-cols-2 text-lg text-gray-500">
          <p>{authorName}</p>
          <p>{writtenOn}</p>
        </div>
      </div>

      <div className="mb-2 p-2 flex flex-row">
        {book.genres.map((genre) => (
          <GenrePill genre={genre} key={genre} />
        ))}
      </div>
    </>
  );
};

export default BookCard;
