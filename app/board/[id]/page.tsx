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
        <p className='text-gray-400 mb-4'>{categories.find(cate => cate.url === board.category)?.name}</p>
        <p className='text-xl'>{board.username}</p>

        <div className='my-4 flex items-end justify-between'>
          <h3 className='font-bold text-2xl bg-transparent flex items-end gap-4 '>{board.title}</h3>
          <p>{new Date(board.createdAt).toISOString().split('T')[0]}</p>
        </div>
      </div>
      <p className='py-3 min-h-[calc(100vh-320px)] whitespace-pre bg-transparent block w-full'>{board.content}</p>
      <div className='border-t flex gap-2 pt-3'>
        <button className='block h-[38px] bg-red-400 py-2 px-4 text-sm text-white font-bold rounded-full'>수정</button>
        <RemoveBtn board={board} />
      </div>
    </>
  );
};
export default page;
