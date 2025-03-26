import { FC, ReactElement, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  photo: string;
}

const Card: FC<CardProps> = ({ photo, children }): ReactElement => (
  <div className="rounded-xl shadow-2xl w-full max-w-xs p-2 m-2 bg-white">
    <div className="flex justify-center items-center my-2">
      <img src={photo} alt="book cover" className="w-40 h-60" />
    </div>

    {children}
  </div>
);

export default Card;
