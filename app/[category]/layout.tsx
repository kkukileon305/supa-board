import Header from '../../components/Header';

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='max-w-[1060px] mx-auto w-full p-3'>{children}</main>
    </>
  );
};
export default BoardLayout;
