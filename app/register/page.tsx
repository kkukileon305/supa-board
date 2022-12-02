'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import supabase from '../../utils/supabaseClient';
import { ImSpinner2 } from 'react-icons/im';
import Link from 'next/link';
import Modal from '../../components/Modal';
import { useRouter } from 'next/navigation';

type Form = {
  email: string;
  password: string;
  username: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = async ({ email, password, username }: Form) => {
    setDisabled(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      console.log(error);
      setDisabled(false);
    } else {
      setModal(true);
    }
  };

  return (
    <>
      {modal && <Modal message='인증 메일을 확인 후 로그인해주세요' setModal={setModal} onClose={() => router.push('/login')} />}
      <div className='min-h-[100vh] flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-full p-3'>
          <h2 className='font-bold text-3xl text-center text-red-400 mb-8'>회원가입</h2>

          <p className='font-bold text-gray-700 dark:text-white'>이메일</p>
          <input type='email' {...register('email', { required: true })} className='block bg-transparent border p-1 w-full my-4 focus:outline-none' />

          <div className='flex justify-between'>
            <p className='font-bold text-gray-700 dark:text-white'>비밀번호</p>
            <p className='text-gray-700/50 dark:text-white/50'>최소 6글자 이상</p>
          </div>
          <input type='password' autoComplete='off' {...register('password', { required: true, minLength: 6 })} className='block bg-transparent border p-1 w-full my-4 focus:outline-none' />

          <div className='flex justify-between'>
            <p className='font-bold text-gray-700 dark:text-white'>닉네임</p>
            <p className='text-gray-700/50 dark:text-white/50'>2글자 이상 6글자 이하</p>
          </div>
          <input type='text' autoComplete='off' {...register('username', { required: true, minLength: 2, maxLength: 6 })} className='block  bg-transparent border p-1 w-full my-4 focus:outline-none' />

          <p className='text-center text-red-400'>{errors.email || errors.password || errors.username ? '양식을 확인해주세요' : 'Good'}</p>
          <button disabled={disabled} className='rounded-full h-[52px] py-3 w-full block bg-red-400 mt-8 font-bold text-xl text-white'>
            {disabled ? <ImSpinner2 className='mx-auto animate-spin' size={20} /> : '가입하기'}
          </button>
        </form>
        <Link className='font-bold text-gray-400 dark:text-white' href={'/'}>
          돌아가기
        </Link>
      </div>
    </>
  );
};
export default RegisterPage;
