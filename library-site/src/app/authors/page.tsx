'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import AuthorCard from '@/app/components/card/AuthorCard/AuthorCard';
import Card from '@/app/components/card/Card';
import AddAuthorModal from '@/app/components/modal/AddAuthor/AddAuthor.modal';
import Modal from '@/app/components/modal/Modal';
import { useAuthorsProviders } from '@/hooks';

const AuthorsPage: FC = (): ReactElement => {
  const { useListAuthors } = useAuthorsProviders();
  const { authors, authorsLoad } = useListAuthors();
  const [filterByName, setFilterByName] = useState<string>('');
  const [filterByNumberOfBooks, setFilterByNumberOfBooks] = useState<number>(6);

  useEffect(() => authorsLoad);
  return (
    <>
      <label htmlFor="filter" className="m-2">
        Sort by author : &nbsp;
        <input
          className="border border-black rounded-md mt-5"
          type="text"
          onChange={(e): void => {
            setFilterByName(e.target.value);
          }}
        />
      </label>
      <label htmlFor="filter" className="m-2">
        Sort by number of writted books :
        {filterByNumberOfBooks === 6 ? (
          <p className='ml-8'>No filter</p>
        ) : (
          <p>{filterByNumberOfBooks}</p>
        )}
        <input
          type="range"
          defaultValue={6}
          min={0}
          max={6}
          onChange={(e): void => {
            setFilterByNumberOfBooks(Number(e.target.value));
          }}
        />
      </label>
      <Modal title="Add author">
        <AddAuthorModal />
      </Modal>
      <div className="grid grid-cols-4 justify-items-center bg-gray-500">
        {authors
          .filter((author) =>
            `${author.firstName} ${author.lastName}`
              .toLowerCase()
              .includes(filterByName.toLowerCase()),
          )
          .filter((author) =>
            filterByNumberOfBooks !== 6
              ? author.writtenBooksNumber === filterByNumberOfBooks
              : author,
          )
          .map((author) => (
            <Card key={author.id} photo={author.photoUrl}>
              <AuthorCard author={author} />
            </Card>
          ))}
      </div>
    </>
  );
};

export default AuthorsPage;
