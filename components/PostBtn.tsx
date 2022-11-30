import Link from 'next/link';
import { BsPlusLg } from 'react-icons/bs';

const PostBtn = () => {
  return (
    <div className='fixed px-3 bottom-8 w-full'>
      <div className='max-w-[1060px] mx-auto flex justify-end'>
        <Link className='aspect-square bg-red-400 rounded-full p-2' href={'/post'}>
          <BsPlusLg size={30} color='white' />
        </Link>
      </div>
    </div>
  );
};
export default PostBtn;
