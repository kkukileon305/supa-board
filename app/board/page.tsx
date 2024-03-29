import { use } from 'react';

import BoardItem from '../../components/BoardItem';
import { categories } from '../../utils/categories';
import { Board } from '../page';

const getBoardsByCategory = async (category: string | undefined) => {
  if (!category) return [];
  const boards: Board[] = await (await fetch(`/api/board?category=${category}`, { next: { revalidate: 60 } })).json();

  return boards;
};

const Board = async ({ searchParams }: { searchParams?: { category: string } }) => {
  const boards = await getBoardsByCategory(searchParams?.category);

  return (
    <>
      <h2 className='font-bold text-3xl text-gray-700 dark:text-white my-8'>{categories.find(cate => cate.url === searchParams?.category)?.name}</h2>
      {!!boards.length ? (
        <ul>
          {boards.map(board => (
            <BoardItem key={board.id} board={board} />
          ))}
        </ul>
      ) : (
        <h2 className='text-center py-8 font-bold text-2xl'>아직 글이 없어요...</h2>
      )}
    </>
  );
};
export default Board;
