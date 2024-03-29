'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { HiMenuAlt3 } from 'react-icons/hi';
import { categories } from '../utils/categories';
import supabase from '../utils/supabaseClient';
import useUser from '../utils/zustand';
import Nav from './Nav';
import Search from './Search';
import ThemeSwitch from './ThemeSwitch';

const Header = () => {
  const [navModal, setNavModal] = useState(false);
  const router = useRouter();
  const { session, clearSession } = useUser(({ session, setSession, clearSession }) => ({ session, setSession, clearSession }));

  const logout = async () => {
    await supabase.auth.signOut();
    clearSession();
    router.push('/login');
  };

  return (
    <header className='border-b flex justify-center items-center h-[62px] sticky top-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur z-10'>
      {navModal && <Nav setModal={setNavModal} />}
      <div className='max-w-[1060px] mx-auto w-full p-3 flex justify-between items-center'>
        <Link className='block font-bold text-2xl' href={'/'}>
          <AiOutlineHome size={30} />
        </Link>
        <ul className='hidden md:flex items-center gap-8'>
          {categories.map(category => (
            <li key={category.url}>
              <Link className='text-gray-700 dark:text-gray-200' href={`/board?category=${category.url}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-4'>
          <Search />
          <ThemeSwitch />
        </div>
        {session ? (
          <div className='hidden md:flex items-center justify-between w-[180px]'>
            <p>{session.user.user_metadata.username}님</p>
            <button onClick={logout} className='block h-[38px] bg-red-400 py-2 px-4 text-sm text-white font-bold rounded-full'>
              로그아웃
            </button>
          </div>
        ) : (
          <ul className='hidden md:flex items-center gap-4 w-[180px]'>
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
        <button onClick={() => setNavModal(true)} className='block md:hidden'>
          <HiMenuAlt3 size={30} />
        </button>
      </div>
    </header>
  );
};
export default Header;
