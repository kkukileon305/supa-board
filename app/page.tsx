import AdSwiper from '../components/AdSwiper';
import BoardItem from '../components/BoardItem';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PostBtn from '../components/PostBtn';

export type Board = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  username: string;
  category: string;
};

const getAllBoard = async () => {
  const boards = await (await fetch('http://localhost:3000/api/board', { next: { revalidate: 60 } })).json();

  return boards;
};

const Page = async () => {
  const boards: Board[] = await getAllBoard();

  return (
    <>
      <Header />
      <AdSwiper />
      <main className='max-w-[1060px] mx-auto w-full p-3'>
        <h2 className='font-bold text-3xl text-gray-700 dark:text-white my-8'>오늘의 게시글</h2>
        <ul className='min-h-[20vh]'>
          {boards.map(board => (
            <BoardItem key={board.id} board={board} />
          ))}
        </ul>
      </main>
      <Footer />
      <PostBtn />
    </>
  );
};

export default Page;
