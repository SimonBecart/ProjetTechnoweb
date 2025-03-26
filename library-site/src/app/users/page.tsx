'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import { useUsersProviders } from '@/hooks';
import { useDeleteUser } from '../api/user.delete';

const UsersPage: FC = (): ReactElement => {
  const handleDeleteUser = async (userId: string): Promise<void> => {
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
    );

    if (!confirmed) {
      return;
    }

    try {
      const deleteUser = useDeleteUser();
      await deleteUser(userId);
      console.log('User deletted !');
    } catch (error) {
      console.error("Error !", error);
    }
  };

  const { useListUsers } = useUsersProviders();
  const { users, usersLoad } = useListUsers();
  const [filterByName, setFilterByName] = useState<string>('');

  useEffect(() => usersLoad);
  return (
    <>
      <label htmlFor="filter" className="m-5">
        Sort by user : &nbsp;
        <input
          className="border border-black rounded-md mt-5"
          type="text"
          onChange={(e): void => {
            setFilterByName(e.target.value);
          }}
        />
      </label>
      <div className="flex justify flex-col items-center pt-4">
        {users
          .filter((user) =>
            `${user.firstName} ${user.lastName}`
              .toLowerCase()
              .includes(filterByName.toLowerCase()),
          )
          .map((user) => (
            <div className="flex m-5 border-2 border-black w-5/6 h-44 bg-green-200 p-5">
              <div className="w-1/4">
                <h1 className="text-2xl relative bottom-3">
                  {user.firstName}
                  {user.lastName}
                </h1>
                <p>
                  <span className="font-bold">Age: </span>
                  {user.age}
                </p>
                <p>
                  <span className="font-bold">Email: </span>
                  {user.email}
                </p>
                <p>
                  <span className="font-bold">Password: </span>
                  {user.password}
                </p>
              </div>

              <div className="w-1/4">
                <h2 className="font-bold">Preferred Book :</h2>
                {user.preferredBook ? (
                  <div>{user.preferredBook.name}</div>
                ) : (
                  <div>Choose a prefered Book !</div>
                )}

                <h2 className="font-bold">Favorite Genres</h2>
                <ul>
                  {user.favoriteGenres === null ? (
                    <p>Find one </p>
                  ) : (
                    user.favoriteGenres.map((genre) => <div>{genre}</div>)
                  )}
                </ul>
              </div>

              <div className="w-2/4 ml-5 relative bottom-4">
                <h2 className="font-bold">Books Read</h2>
                <div className="flex flex-wrap h-full">
                  {user.booksRead === null ? (
                    <p>Read !</p>
                  ) : (
                    user.booksRead.map((book) => (
                      <div
                        key={book.id}
                        className="border-2 border-black p-1 m-1 w-1/6 flex flex-col justify-center items-center"
                      >
                        <img src={book.cover} />
                        <h1 className="text-xs text-center">{book.name}</h1>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={(): Promise<void> => handleDeleteUser(user.id)}
                className='relative h-7 w-7 border-20 left-5 bottom-5 bg-[url("/cross.png")] bg-contain'
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default UsersPage;
