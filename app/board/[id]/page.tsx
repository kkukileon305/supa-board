import RemoveBtn from '../../../components/RemoveBtn';
import { categories } from '../../../utils/categories';
import { Board } from '../../page';

const getBoardById = async (id: string) => {
  const board = await (await fetch(`http://localhost:3000/api/board?id=${id}`)).json();

  return board;
};

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const board: Board = await getBoardById(id);

  return (
    <>
      <div className='border-b'>
        <div className='max-w-[1060px] mx-auto p-3'>
          <p>{categories.find(cate => cate.url === board.category)?.name}</p>
          <div className='flex justify-between'>
            <h3 className='bg-transparent flex items-end gap-4 '>
              <strong className='font-bold text-xl'>{board.title}</strong> <span className='opacity-50'>{board.username}</span>
            </h3>
            <p>{new Date(board.createdAt).toISOString().split('T')[0]}</p>
          </div>
        </div>
      </div>
      <p className='max-w-[1060px] mx-auto p-3 min-h-[calc(100vh-282px)] whitespace-pre bg-transparent block w-full'>{board.content}</p>
      <div className='border-t'>
        <div className='max-w-[1060px] mx-auto p-3 w-full flex flex-row justify-end items-center gap-2'>
          <button className='block h-[38px] bg-red-400 py-2 px-4 text-sm text-white font-bold rounded-full'>수정</button>
          <RemoveBtn board={board} />
        </div>
      </div>
    </>
  );
};
export default page;
