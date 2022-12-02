import Link from 'next/link';
import { Board } from '../app/page';

const BoardItem = ({ board }: { board: Board }) => {
  return (
    <li>
      <Link className='border block rounded-xl p-3 my-2 select-none hover:bg-gray-300 dark:hover:bg-gray-500' href={`/board/${board.id}`}>
        <h3 className='font-bold text-gray-700 dark:text-white'>{board.title}</h3>
        <div className='flex justify-between'>
          <p>{board.username}</p>
          <p>{new Date(board.createdAt).toISOString().split('T')[0]}</p>
        </div>
      </Link>
    </li>
  );
};
export default BoardItem;
