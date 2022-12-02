'use client';

import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

type ModalProps = {
  message: string;
  setModal: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
};

const Modal = ({ message, setModal, onClose }: ModalProps) => {
  const closeModal: MouseEventHandler<HTMLDivElement> = e => {
    setModal(false);
    onClose();
  };

  return (
    <div className='fixed z-10 w-full h-full bg-black/50 flex items-center justify-center cursor-pointer' onClick={closeModal}>
      <div className='bg-white dark:bg-gray-700 max-w-[500px] w-full rounded-xl p-8'>
        <h2 className='font-bold text-2xl mb-10 text-center text-red-400'>알림</h2>
        <p className='text-gray-700 dark:text-white text-center'>{message}</p>
      </div>
    </div>
  );
};
export default Modal;
