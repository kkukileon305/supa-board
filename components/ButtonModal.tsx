'use client';

import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { ImSpinner2 } from 'react-icons/im';

type ModalProps = {
  message: string;
  setModal: Dispatch<SetStateAction<boolean>>;
  onYes: () => void;
  onClose?: () => void;
  disabled: boolean;
};

const ButtonModal = ({ message, onYes, setModal, onClose, disabled }: ModalProps) => {
  const closeModal: MouseEventHandler<HTMLDivElement> = ({ target }) => {
    if (target instanceof Element && !target.closest('div.container')) {
      setModal(false);
      onClose && onClose();
    }
  };

  return (
    <div className='fixed top-0 left-0 z-10 w-full h-full bg-black/50 flex items-center justify-center' onClick={closeModal}>
      <div className='bg-white dark:bg-gray-700 max-w-[500px] w-full rounded-xl p-8 container'>
        <h2 className='font-bold text-2xl mb-4 text-center text-red-400'>알림</h2>
        <p className='text-gray-700 dark:text-white text-center'>{message}</p>
        <div className='mt-8 flex justify-center gap-2'>
          <button
            className='py-3 px-6 bg-white dark:bg-gray-700 border rounded-full'
            onClick={() => {
              setModal(false);
              onClose && onClose();
            }}
          >
            취소
          </button>
          <button disabled={disabled} className='py-3 px-6 bg-red-400 text-white rounded-full' onClick={() => onYes()}>
            {disabled ? <ImSpinner2 className='mx-auto animate-spin' size={20} /> : '삭제'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ButtonModal;
