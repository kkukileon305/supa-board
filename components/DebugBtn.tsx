'use client';

import axios from 'axios';
import useUser from '../utils/zustand';

const DebugBtn = () => {
  const access_token = useUser(store => store.session?.access_token);

  const onClick = async () => {
    if (!access_token) return;

    try {
      const {
        data: { message, user },
      } = await axios.post('http://localhost:3000/api/board', { access_token });
      console.log(message, user);
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={onClick}>DebugBtn</button>;
};
export default DebugBtn;
