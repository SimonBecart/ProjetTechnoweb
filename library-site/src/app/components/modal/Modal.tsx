import { FC, ReactElement, ReactNode, useState } from 'react';

interface ModalProps {
  children: ReactNode;
  title: string;
}

const Modal: FC<ModalProps> = ({ children, title }): ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <button
        type="button"
        className="text-white bg-blue-400 rounded-3xl p-3 m-3"
        onClick={(): void => {
          setShowModal(true);
        }}
      >
        {title}
      </button>
      {showModal && (
        <>
          <div className="flex justify-center items-center fixed inset-0 z-50">
            <div className="relative w-full max-w-4xl">
              <div className="flex flex-col rounded-lg shadow-lg relative bg-slate-100">
                <div className="p-5 w-full flex justify-between">
                  <h3 className="text-3xl font-semibold">{title}</h3>

                  <button
                    type="button"
                    onClick={(): void => {
                      setShowModal(false);
                    }}
                  >
                    X
                  </button>
                </div>
                {children}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      )}
    </div>
  );
};

export default Modal;
