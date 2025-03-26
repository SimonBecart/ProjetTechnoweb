import { FC, ReactElement } from 'react';
import { useDeleteAuthor } from '@/hooks/delete/useDeleteAuthor';

interface DeleteAuthorModalProps {
  author: string;
}

const DeleteAuthorModal: FC<DeleteAuthorModalProps> = ({
  author,
}): ReactElement => (
  <div className="p-5 w-full">
    <form action="">
      <div className="rounded-md p-2">
        <div className="mb-4">
          <p className="block text-sm font-medium leading-6 text-gray-900">
            Sure ?
          </p>
        </div>

        <div className="flex flex-row-reverse">
          <button
            type="button"
            className="text-white bg-blue-400 rounded-3xl px-4 py-2 m-2"
            onClick={(): void => {
              useDeleteAuthor(author);
              window.location.href = '/authors';
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className="text-white bg-slate-200 rounded-3xl px-4 py-2 m-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default DeleteAuthorModal;
