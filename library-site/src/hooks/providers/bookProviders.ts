import axios from 'axios';
import { useState } from 'react';
import { PlainBookModel } from '@/models';

type UseListBooksProvider = {
  books: PlainBookModel[];
  booksLoad: () => void;
};

export const useListBooks = (): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  const fetchBooks = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => setBooks(data.data))
      .catch((err) => console.error(err));
  };

  return { books, booksLoad: fetchBooks };
};

type BookProviders = {
  useListBooks: () => UseListBooksProvider;
};

export const useBooksProviders = (): BookProviders => ({
  useListBooks,
});
