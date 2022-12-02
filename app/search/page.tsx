'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, useRef, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import BoardItem from '../../components/BoardItem';
import { Board } from '../page';

const SearchPage = () => {
  const router = useRouter();
  const [boards, setBoards] = useState<Board[]>([]);

  const debounce = useRef<NodeJS.Timeout>();

  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value: _value } }) => {
    clearTimeout(debounce.current);

    debounce.current = setTimeout(async () => {
      const { data } = await axios.get<Board[]>(`http://localhost:3000/api/board?q=${_value}`);
      setBoards(data);
    }, 500);
  };

  return (
    <>
      <div className='h-[62px] border-b flex items-center justify-center'>
        <div className='flex items-center gap-4 max-w-[1060px] p-3 w-full'>
          <button onClick={() => router.back()} className='h-full flex items-center justify-center'>
            <BiArrowBack size={24} />
          </button>
          <input //
            type='text'
            className='focus:outline-none block w-full text-xl bg-transparent'
            placeholder='입력해주세요...'
            onChange={onChange}
          />
        </div>
      </div>

      {!!boards.length ? (
        <ul className='p-3 max-w-[1060px] mx-auto w-full'>
          {boards.map(board => (
            <BoardItem key={board.id} board={board} />
          ))}
        </ul>
      ) : (
        <h2 className='text-center py-8 font-bold text-2xl'>검색 결과가 없어요...</h2>
      )}
    </>
  );
};
export default SearchPage;
