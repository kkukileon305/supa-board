import DebugBtn from '../components/DebugBtn';
import Header from '../components/Header';

const Page = () => {
  return (
    <>
      <Header />
      <main className='max-w-[1060px] mx-auto w-full p-3'>
        <h2>Main Page</h2>
        <DebugBtn />
      </main>
    </>
  );
};

export default Page;
