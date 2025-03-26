'use client';

import Image from 'next/image';
import { FC, ReactElement, useEffect } from 'react';
import { useDetailedUser } from '@/hooks';

const Home: FC = (): ReactElement => {
  const userIsLoggedIn = true; 
  const { user, load } = useDetailedUser();

  useEffect(() => {
    load('50b2dbe0-67b9-421f-8e67-d8620dde95cf');
  });
  return (
    <main>
      {userIsLoggedIn ? (
        <div className="flex min-h-screen flex-col item s-center p-24">
          <h1 className="text-4xl font-bold">{`Salut ${user?.firstName} ${user?.lastName}`}</h1>
          <h1 className="text-xl mt-4">
            Nous sommes contents de vous voir de retour
          </h1>

          <p className="text-lg mt-4">Âge :{user?.age}</p>

          <p className="text-lg">Email :{user?.email}</p>

          {user?.preferredBook && (
            <div>
              <h2 className="text-lg mt-4">Livre préféré :</h2>
              <p className="text-base">{user.preferredBook.name}</p>
            </div>
          )}

          {user?.booksRead.length === null && (
            <div>
              <h2 className="text-lg mt-4">Livres lus :</h2>
              <ul>
                {user.booksRead.map((book) => (
                  <li key={book.id}>{book.name}</li>
                ))}
              </ul>
            </div>
          )}
          <h1 className="text-3xl font-bold relative top-5">Livre Lu</h1>
          <div className="w-full border-2 flex flex-wrap h-60 mt-10">
            {user?.booksRead === null ? (
              <p>Lit des livres</p>
            ) : (
              user?.booksRead.map((book) => (
                <div
                  key={book.id}
                  className="border-2 border-black p-1 m-1 w-1/6 flex flex-col justify-center items-center"
                >
                  <img src={book.cover} alt={book.name} />
                  <h1 className="text-xs text-center">{book.name}</h1>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen flex-col items-center p-24">
          <h1 className="text-4xl font-bold">Bienvenue dans votre Librairie</h1>
          <h1 className="text-xl mt-10">
            Ici retrouvez tous les livres que nous avons
          </h1>
          <h1 className="text-xl mt-4">
            Connectez-vous pour avoir accès aux livres que vous avez lus
          </h1>
          <Image
            src="/chat.png"
            width={240}
            height={240}
            className="h-60"
            alt="Chat"
          />
        </div>
      )}
    </main>
  );
};

export default Home;
