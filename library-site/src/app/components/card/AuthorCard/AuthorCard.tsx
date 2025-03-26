import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { PlainAuthorModel } from '@/models';

interface AuthorCard {
  author: PlainAuthorModel;
}

const AuthorCard: FC<AuthorCard> = ({ author }): ReactElement => {
  const authorName = `${author.firstName} ${author.lastName}`;

  return (
    <div className="border-b border-t mb-2 p-2">
      <div className="">
        <h1 className="text-2xl">
          <Link href={`authors/${author.id}`}>{authorName}</Link>
        </h1>
        <p>
          {author.writtenBooksNumber}
          &nbsp;Books
        </p>
      </div>
    </div>
  );
};

export default AuthorCard;
