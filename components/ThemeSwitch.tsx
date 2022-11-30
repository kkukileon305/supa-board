'use client';

import { useTheme } from 'next-themes';
import { BsMoon } from 'react-icons/bs';

const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();

  return (
    <button className='bg-red-400 dark:bg-gray-400 transition h-8 w-[60px] rounded-full px-1' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <BsMoon size={24} className='bg-white rounded-full aspect-square p-1 transition translate-x-[0] dark:translate-x-[28px]' color='#323137' />
    </button>
  );
};

export default ThemeSwitch;
