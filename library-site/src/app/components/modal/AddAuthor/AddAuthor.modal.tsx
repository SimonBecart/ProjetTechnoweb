import { FC, ReactElement, useState } from 'react';
import { usePushAuthor } from '@/hooks/push/usePushAuthor';
import { PlainAuthorModel } from '@/models';

const AddAuthorModal: FC = (): ReactElement => {
  const [addAuthor, setAddAuthor] = useState<PlainAuthorModel>({
    id: '',
    firstName: '',
    lastName: '',
    photoUrl: '',
  });

  return (
    <div className="p-5 w-full">
      <form action="">
        <div className="rounded-md p-2">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Surname :
              <input
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e): void =>
                  setAddAuthor({
                    ...addAuthor,
                    firstName: e.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name :
              <input
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e): void =>
                  setAddAuthor({
                    ...addAuthor,
                    lastName: e.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="photoUrl"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Photo URL :
              <input
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e): void =>
                  setAddAuthor({
                    ...addAuthor,
                    photoUrl: e.target.value,
                  })
                }
              />
            </label>
          </div>
        </div>

        <div className="flex flex-row-reverse">
          <button
            type="button"
            className="text-white bg-blue-400 rounded-3xl px-4 py-2 m-2"
            onClick={(): void => {
              usePushAuthor(addAuthor).then((r) => console.log(r));
              window.location.href = '/authors';
            }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAuthorModal;
