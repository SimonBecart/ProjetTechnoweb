'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import BookCard from '@/app/components/card/BookCard/BookCard';
import Card from '@/app/components/card/Card';
import AddBookModal from '@/app/components/modal/AddBook/AddBook.modal';
import Modal from '@/app/components/modal/Modal';
import { useBooksProviders, useGenresProviders } from '@/hooks';

const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, booksLoad } = useListBooks();
  const { useListGenres } = useGenresProviders();
  const { genres, genreLoad } = useListGenres();
  const [filterByName, setFilterByName] = useState<string>('');
  const [filterByGenre, setFilterByGenre] = useState<string>('');

  useEffect(() => booksLoad);
  useEffect(() => genreLoad);

  return (
    <>
      <div className="bg-white mb-2">
        <h1 className="text-3xl ml-5">Books</h1>
        <label htmlFor="filter" className="m-2 ml-5">
          Sort by title : &nbsp;
          <input
            className="border border-black rounded-md"
            type="text"
            onChange={(e): void => {
              setFilterByName(e.target.value);
            }}
          />
        </label>
        <label htmlFor="filter" className="m-2">
          Sort by genre : &nbsp;
          <select
            className="border border-black rounded-md"
            onChange={(e): void => {
              setFilterByGenre(e.target.value);
            }}
          >
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>
        <Modal title="Ajouter un livre">
          <AddBookModal />
        </Modal>
      </div>

      <div className="bg-gray-400 grid grid-cols-4 justify-items-center">
        {books
          .filter((book) =>
            book.name.toLowerCase().includes(filterByName.toLowerCase()),
          )
          // eslint-disable-next-line no-confusing-arrow
          .filter((book) =>
            filterByGenre === ''
              ? true
              : book.genres.some((genre) => genre === filterByGenre),
          )
          .map((book) => (
            <Card key={book.id} photo={book.cover}>
              <BookCard book={book} />
            </Card>
          ))}
      </div>
    </>
  );
};

export default BooksPage;
