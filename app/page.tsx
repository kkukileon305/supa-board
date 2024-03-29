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
  try {
    const boards = await (await fetch('/api/board', { next: { revalidate: 60 } })).json();
    return boards;
  } catch (error) {
    return [];
  }
};

const Page = async () => {
  const boards: Board[] = await getAllBoard();

  return (
    <>
      <Header />
      <AdSwiper />
      <main className='max-w-[1060px] mx-auto w-full p-3'>
        <h2 className='font-bold text-3xl text-gray-700 dark:text-white my-8'>오늘의 게시글</h2>
        {!!boards.length ? (
          <ul>
            {boards.map(board => (
              <BoardItem key={board.id} board={board} />
            ))}
          </ul>
        ) : (
          <h2 className='text-center py-8 font-bold text-2xl'>아직 글이 없어요...</h2>
        )}
      </main>
      <Footer />
      <PostBtn />
    </>
  );
};

export default Page;
