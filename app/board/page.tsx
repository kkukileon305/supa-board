import BoardItem from '../../components/BoardItem';
import { categories } from '../../utils/categories';
import { Board } from '../page';

const getBoardsByCategory = async (category: string) => {
  const boards: Board[] = await (await fetch(`http://localhost:3000/api/board?category=${category}`, { next: { revalidate: 60 } })).json();

  return boards;
};

const Board = async ({ searchParams: { category: categoryUrl } }: { searchParams: { category: string } }) => {
  const boards = await getBoardsByCategory(categoryUrl);

  return (
    <>
      <h2 className='font-bold text-3xl text-gray-700 dark:text-white my-8'>{categories.find(cate => cate.url === categoryUrl)?.name}</h2>
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