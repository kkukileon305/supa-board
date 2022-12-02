import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PostBtn from '../../components/PostBtn';

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='max-w-[1060px] min-h-[calc(100vh-112px)] mx-auto w-full p-3'>{children}</main>
      <Footer />
      <PostBtn />
    </>
  );
};
export default BoardLayout;
