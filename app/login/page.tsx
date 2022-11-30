'use client';

import { useRouter } from 'next/navigation';
import supabase from '../../utils/supabaseClient';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import useUser from '../../utils/zustand';
import { ImSpinner2 } from 'react-icons/im';

type Form = {
  email: string;
  password: string;
};

const LoginPabe = () => {
  const setSession = useUser(store => store.setSession);
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = async (data: Form) => {
    setDisabled(true);

    const {
      error,
      data: { session },
    } = await supabase.auth.signInWithPassword(data);

    if (error || !session) {
      console.log(error);
      setError(true);
      setDisabled(false);
    } else {
      setSession(session);
      router.push('/');
    }
  };

  return (
    <div className='min-h-[100vh] flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-full p-3'>
        <h2 className='font-bold text-3xl text-center text-red-400 mb-8'>로그인</h2>

        <p className='font-bold text-gray-400 dark:text-white'>Email</p>
        <input type='email' {...register('email', { required: true })} className='block bg-transparent border p-1 w-full my-4 focus:outline-none' />
        <p className='font-bold text-gray-400 dark:text-white'>Password</p>
        <input type='password' autoComplete='off' {...register('password', { required: true, minLength: 6 })} className='block bg-transparent border p-1 w-full my-4 focus:outline-none' />
        <p className='text-center text-red-400'>{errors.email || errors.password || error ? '입력정보 확인 또는 이메일 인증 확인' : 'Good'}</p>
        <button disabled={disabled} className='rounded-full h-[52px] py-3 w-full block bg-red-400 mt-8 font-bold text-xl text-white'>
          {disabled ? <ImSpinner2 className='mx-auto animate-spin' size={20} /> : '로그인하기'}
        </button>
      </form>
      <Link className='font-bold text-gray-400 dark:text-white' href={'/'}>
        돌아가기
      </Link>
    </div>
  );
};
export default LoginPabe;
