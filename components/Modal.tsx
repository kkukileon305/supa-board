'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

const Modal = ({ message, setModal, redirect }: { message: string; setModal: Dispatch<SetStateAction<boolean>>; redirect: string }) => {
  const router = useRouter();

  const closeModal: MouseEventHandler<HTMLDivElement> = e => {
    setModal(false);
    router.push(redirect);
  };

  return (
    <div className='fixed z-10 w-full h-full bg-black/50 flex items-center justify-center cursor-pointer' onClick={closeModal}>
      <div className='bg-white max-w-[500px] w-full rounded-xl p-8'>
        <h2 className='font-bold text-2xl mb-10 text-center text-red-400'>알림</h2>
        <p className='text-gray-700'>{message}</p>
      </div>
    </div>
  );
};
export default Modal;
