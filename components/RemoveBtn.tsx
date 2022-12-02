'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Board } from '../app/page';
import useUser from '../utils/zustand';
import ButtonModal from './ButtonModal';

const RemoveBtn = ({ board }: { board: Board }) => {
  const access_token = useUser(store => store.session?.access_token);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onYes = async () => {
    if (!access_token) return setError(true);

    try {
      setDisabled(true);
      await axios.patch('http://localhost:3000/api/board', { access_token, id: board.id });

      router.push(`/board?category=${board.category}`);
      router.refresh();
    } catch (error) {
      console.log(error);
      setDisabled(false);
      setError(true);
    }
  };

  return (
    <>
      {modal && <ButtonModal disabled={disabled} message={error ? '계정을 확인해주세요' : '정말로 삭제하시겠습니까?'} setModal={setModal} onYes={onYes} onClose={() => setError(false)} />}
      <button onClick={() => setModal(true)} className='block h-[38px] bg-red-400 py-2 px-4 text-sm text-white font-bold rounded-full'>
        삭제
      </button>
    </>
  );
};
export default RemoveBtn;
