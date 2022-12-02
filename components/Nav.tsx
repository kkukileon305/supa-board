'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { categories } from '../utils/categories';
import supabase from '../utils/supabaseClient';
import useUser from '../utils/zustand';
import Search from './Search';
import ThemeSwitch from './ThemeSwitch';

const Nav = ({ setModal }: { setModal: Dispatch<SetStateAction<boolean>> }) => {
  const { theme } = useTheme();

  const router = useRouter();

  const { session, clearSession } = useUser(({ session, setSession, clearSession }) => ({ session, setSession, clearSession }));
  const closeModal: MouseEventHandler = ({ target }) => {
    if (target instanceof Element && !target.closest('div.container')) {
      setModal(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    clearSession();
    router.push('/login');
  };

  return (
    <nav onClick={closeModal} className='md:hidden fixed bg-black/50 w-full h-[100vh] top-0 left-0 px-3 flex justify-center items-center z-20'>
      <div className='bg-white dark:bg-gray-700 max-w-[600px] w-full p-4 rounded-xl container'>
        <div className='flex items-center justify-between mb-4'>
          <Link className='block font-bold text-2xl' href={'/'}>
            <AiOutlineHome size={30} />
          </Link>

          <button className='border rounded-md' onClick={() => setModal(false)}>
            <IoMdClose className='p-1' color={theme === 'dark' ? 'white' : 'black'} size={30} />
          </button>
        </div>

        <div className='flex justify-center'>
          <Search isMobile />
        </div>

        <ul className='py-2 border-b'>
          {categories.map(cate => (
            <li className='my-2' key={cate.url}>
              <Link className='font-bold block py-1' onClick={() => setModal(false)} href={`/board?category=${cate.url}`}>
                {cate.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className='flex justify-between items-center'>
          {session ? (
            <div className='flex items-center justify-center gap-4 my-4'>
              <p>{session.user.user_metadata.username}님</p>
              <button onClick={logout} className='block h-[38px] bg-red-400 py-2 px-4 text-sm text-white font-bold rounded-full'>
                로그아웃
              </button>
            </div>
          ) : (
            <ul className='flex justify-center items-center gap-4 my-4'>
              <li>
                <Link className='block transition bg-white dark:bg-gray-700 py-2 px-4 border text-sm text-gray-400 dark:text-white font-bold rounded-full' href={`/login`}>
                  로그인
                </Link>
              </li>
              <li>
                <Link className='block bg-red-400 py-2 px-4 text-sm text-white font-bold rounded-full' href={`/register`}>
                  회원가입
                </Link>
              </li>
            </ul>
          )}
          <ThemeSwitch isMobile />
        </div>
      </div>
    </nav>
  );
};
export default Nav;
