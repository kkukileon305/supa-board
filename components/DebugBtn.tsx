'use client';

import supabase from '../utils/supabaseClient';
import useUser from '../utils/zustand';

const DebugBtn = () => {
  const session = useUser(store => store.session);

  return <button onClick={() => console.log(session)}>DebugBtn</button>;
};
export default DebugBtn;
