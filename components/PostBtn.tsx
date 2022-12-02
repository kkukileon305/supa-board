import Link from 'next/link';
import { BsPlusLg } from 'react-icons/bs';

const PostBtn = () => {
  return (
    <Link className='fixed bottom-4 right-4 aspect-square bg-red-400 rounded-full p-2' href={'/post'}>
      <BsPlusLg size={30} color='white' />
    </Link>
  );
};
export default PostBtn;
