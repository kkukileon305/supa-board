import Header from '../../components/Header';
import PostBtn from '../../components/PostBtn';

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <PostBtn />
    </>
  );
};
export default BoardLayout;
