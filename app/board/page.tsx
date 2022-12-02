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
    <div>
      <h2 className='font-bold text-3xl text-gray-700 dark:text-white my-8'>{categories.find(cate => cate.url === categoryUrl)?.name}</h2>
      <ul>
        {boards.map(board => (
          <BoardItem key={board.id} board={board} />
        ))}
      </ul>
    </div>
  );
};
export default Board;
