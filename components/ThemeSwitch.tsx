'use client';

import { useTheme } from 'next-themes';
import { BsMoon } from 'react-icons/bs';

const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <BsMoon size={30} color={theme === 'dark' ? 'white' : '#374151'} />
    </button>
  );
};
export default ThemeSwitch;
