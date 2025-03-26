// GenrePill.tsx

import { FC, ReactElement } from 'react';

interface GenrePillProps {
  genre: string;
}

const getBackgroundColor = (genre: string): string => {
  const colors: Record<string, string> = {
    'Science Fiction': 'bg-blue-600',
    Mystery: 'bg-purple-800',
    Fantasy: 'bg-green-800',
    Romance: 'bg-pink-600',
    'Historical Fiction': 'bg-gray-500',
    Thriller: 'bg-stone-500',
    Horror: 'bg-red-700',
    Biography: 'bg-orange-600',
  };
  return colors[genre];
};

const GenrePill: FC<GenrePillProps> = ({ genre }): ReactElement => {
  const backgroundColor = getBackgroundColor(genre);

  return (
    <p
      className={`shadow-2xl text-white rounded-xl mx-1 px-2 ${backgroundColor}`}
    >
      {genre}
    </p>
  );
};

export default GenrePill;
