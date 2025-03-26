import { FC, ReactElement, useEffect, useState } from 'react';
import { useAuthorsProviders, useGenresProviders } from '@/hooks';
import { usePushBook } from '@/hooks/push/usePushBook';
import { BookModel } from '@/models';

const AddBookModal: FC = (): ReactElement => {
  const { useListGenres } = useGenresProviders();
  const { genres, genreLoad } = useListGenres();
  const { useListAuthors } = useAuthorsProviders();
  const { authors, authorsLoad } = useListAuthors();
  const [addBook, setAddBook] = useState<BookModel>({
    id: '',
    name: '',
    writtenOn: '',
    cover: '',
    bookGenres: [],
    author: '',
  });

  useEffect(() => {
    genreLoad();
    authorsLoad();
  });

  return (
    <div className="p-5 w-full">
      <form action="">
        <div className="rounded-md p-2">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name :
              <input
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e): void => {
                  setAddBook({
                    ...addBook,
                    name: e.target.value,
                  });
                }}
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Author :
              <select
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e): void => {
                  setAddBook({
                    ...addBook,
                    author: e.target.value,
                  });
                }}
              >
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <option value="" />
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.firstName}
                    {author.lastName}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="writtenOn"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Written date :
              <input
                type="date"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e): void => {
                  setAddBook({
                    ...addBook,
                    writtenOn: e.target.value,
                  });
                }}
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="filter"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Genres : &nbsp;
              <select
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e): void => {
                  setAddBook({
                    ...addBook,
                    bookGenres: [e.target.value],
                  });
                }}
              >
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <option value="" />
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="writtenOn"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cover :
              <input
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e): void => {
                  setAddBook({
                    ...addBook,
                    cover: e.target.value,
                  });
                }}
              />
            </label>
          </div>
        </div>

        <div className="flex flex-row-reverse">
          <button
            type="button"
            className="text-white bg-blue-400 rounded-3xl px-4 py-2 m-2"
            onClick={(): void => {
              usePushBook(addBook).then((r) => console.log(r));
              window.location.href = '/books';
            }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookModal;
