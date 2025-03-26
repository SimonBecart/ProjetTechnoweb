'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useDetailedBook } from '@/hooks/providers/detailedBookProvider';
import Modal from '@/app/components/modal/Modal';
import DeleteBookModal from '@/app/components/modal/DeleteBook/DeleteBook.modal';

const BooksDetailsPage: FC = () => {
  const { id } = useParams();
  const { book, load } = useDetailedBook();

  useEffect(() => {
    const bookId = Array.isArray(id) ? id.join('') : id;
    load(bookId);
  });

  const formattedWrittenOn = book
    ? format(new Date(book.writtenOn), 'dd/MM/yyyy')
    : '';

  return (
    <div>
      {book ? (
        <div className="h-screen p-5 flex">
          <div className="w-1/2 flex justify-center items-center flex-col">
            <h1 className="text-4xl font-bold mb-10">{book.name}</h1>
            <img src={book.cover} alt="test" className="h-96 w-60" />
          </div>
          <div className="w-1/2 flex justify-center items-center flex-col">
            <p className="text-2xl py-3">
              Genres :&nbsp;
              {book?.genres.map((genre) => genre?.name).join(', ')}
            </p>
            <p className="text-2xl py-3">
              Publicated in&nbsp;
              {formattedWrittenOn}
            </p>
            <Link href={`/authors/${book.author.id}`}>
              <p className="text-2xl py-3">
                Par&nbsp;
                {book.author.firstName}
                &nbsp;
                {book.author.lastName}
              </p>
            </Link>
          </div>
          <div className="flex justify-end h-24">
            <Modal title="Supprimer le livre">
              <DeleteBookModal book={book.id} />
            </Modal>
          </div>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BooksDetailsPage;
