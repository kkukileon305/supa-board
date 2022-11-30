'use client';

import Link from 'next/link';
import { MouseEventHandler, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header';
import { categories } from '../../utils/categories';
import supabase from '../../utils/supabaseClient';
import useUser from '../../utils/zustand';

type Inputs = {
  title: string;
  content: string;
};

const PostPage = () => {
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  const session = useUser(store => store.session);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Inputs>();

  const onSubmit = async (inputs: Inputs) => {
    if (!session) return;

    const { error } = await supabase.from('Board').insert({
      ...inputs,
      username: session.user.user_metadata.username,
      category: category.name,
    });

    console.log(error);
  };

  const closeModal: MouseEventHandler<HTMLDivElement> = useCallback(({ target }) => {
    if (target instanceof Element && !target.closest('ul.container')) {
      setModal(false);
    }
  }, []);

  const changeCategory = (index: number) => {
    setCategory(categories[index]);
    setModal(false);
  };

  if (!session) {
    return (
      <div className='min-h-[100vh] flex flex-col justify-center items-center'>
        <div className='max-w-[400px] w-full p-8 flex flex-col items-center gap-8'>
          <p className='text-center'>로그인을 먼저 해주세요</p>
          <Link className='px-4 py-2 bg-red-400 text-white font-bold rounded-full' href={'/login'}>
            로그인
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      {modal && (
        <div onClick={closeModal} className='fixed w-full h-full top-0 left-0 px-2 bg-black/50 flex flex-col items-center justify-center'>
          <div className='container bg-white dark:bg-gray-700 rounded-xl p-8 max-w-[500px] w-full flex flex-col items-center'>
            <p className='mb-12 text-center'>카테고리를 선택해주세요</p>
            <ul className='flex flex-wrap justify-center gap-2'>
              {categories.map((category, index) => (
                <li key={category.url}>
                  <button onClick={() => changeCategory(index)} className='text-gray-500 hover:text-gray-200 dark:text-gray-300 font-bold p-3 bg-transparent hover:bg-gray-500 rounded-xl'>
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-[1060px] mx-auto p-3 flex flex-col gap-4 items-start'>
        <button onClick={() => setModal(true)} className='border py-3 px-6'>
          {category.name}
        </button>
        <input className='border p-3 bg-transparent block w-full focus:outline-none' placeholder='제목' type='text' {...register('title', { required: true })} />
        <textarea className='border p-3 h-[calc(100vh-282px)] bg-transparent resize-none block w-full focus:outline-none' placeholder='내용을 입력해주세요...' {...register('content', { required: true })} />
        <div className='w-full flex flex-row-reverse justify-between items-center'>
          <button className='block h-[38px] bg-red-400 py-2 px-4 text-sm text-white font-bold rounded-full'>업로드</button>
          {(errors.content || errors.title) && <p className='text-red-400'>제목과 내용을 입력해주세요</p>}
        </div>
      </form>
    </>
  );
};
export default PostPage;
