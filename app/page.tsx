import DebugBtn from '../components/DebugBtn';
import Header from '../components/Header';
import PostBtn from '../components/PostBtn';

const Page = () => {
  return (
    <>
      <Header />
      <main className='max-w-[1060px] mx-auto w-full p-3'>
        <h2>Main Page</h2>
        <DebugBtn />
      </main>
      <PostBtn />
    </>
  );
};

export default Page;
