import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import ThemeSwitch from './ThemeSwitch';

const navs = [
  {
    url: 'free',
    name: '자유',
  },
  {
    url: 'good',
    name: '굿',
  },
  {
    url: 'asd',
    name: 'ASD',
  },
  {
    url: 'qwe',
    name: 'QWE',
  },
  {
    url: 'zxc',
    name: 'ZXC',
  },
];

const Header = () => {
  return (
    <header className='border-b sticky top-0'>
      <div className='max-w-[1060px] mx-auto w-full p-3 flex justify-between'>
        <Link className='block font-bold text-2xl' href={'/'}>
          <AiOutlineHome size={30} />
        </Link>
        <ul className='flex items-center gap-8'>
          {navs.map(nav => (
            <li key={nav.url}>
              <Link className='text-gray-700 dark:text-gray-200' href={`/${nav.url}`}>
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>

        <ThemeSwitch />
        <ul className='flex items-center gap-4'>
          <li>
            <Link className='transition bg-red-white dark:bg-gray-700 py-2 px-4 border text-sm text-gray-400 dark:text-white font-bold rounded-full' href={`/login`}>
              로그인
            </Link>
          </li>
          <li>
            <Link className='bg-red-400 py-2 px-4 text-sm text-white font-bold rounded-full' href={`/register`}>
              회원가입
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
