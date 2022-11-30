import Header from '../../components/Header';
import PostBtn from '../../components/PostBtn';

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='max-w-[1060px] mx-auto w-full p-3'>{children}</main>
      <PostBtn />
    </>
  );
};
export default BoardLayout;
