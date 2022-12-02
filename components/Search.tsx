import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';

const Search = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <Link href={'/search'} className={`${isMobile ? 'flex md:hidden w-full' : 'hidden md:flex w-[140px]'} dark:hover:bg-white/30 hover:bg-gray-400 rounded-full border py-1 px-4 flex justify-center items-center gap-4`}>
      <BiSearch size={24} />
    </Link>
  );
};
export default Search;
