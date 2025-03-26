import axios from 'axios';
import { useState } from 'react';
import { DetailedBookModel } from '@/models/detailedBook.model';

type UseDetailedBookProvider = {
  book: DetailedBookModel | null;
  load: (bookId: string) => void;
};

export const useDetailedBook = (): UseDetailedBookProvider => {
  const [book, setBook] = useState<DetailedBookModel | null>(null);

  const load = (bookId: string): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`)
      .then((data) => setBook(data.data))
      .catch((err) => console.error(err));
  };
  return { book, load };
};

type DetailedBookProviders = {
  useDetailedBook: () => UseDetailedBookProvider;
};

export const useDetailedBooksProviders = (): DetailedBookProviders => ({
  useDetailedBook,
});
