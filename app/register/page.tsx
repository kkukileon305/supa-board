'use client';

import supabase from '../../utils/supabaseClient';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import Modal from '../../components/Modal';

type Form = {
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = async (data: Form) => {
    setDisabled(true);

    const { error } = await supabase.auth.signUp(data);

    if (error) {
      console.log(error);
      setDisabled(false);
    } else {
      setModal(true);
    }
  };

  return (
    <>
      {modal && <Modal message='인증 메일을 확인 후 로그인해주세요' setModal={setModal} redirect='/login' />}
      <div className='min-h-[100vh] flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-full p-3'>
          <h2 className='font-bold text-3xl text-center text-red-400 mb-8'>회원가입</h2>

          <p className='font-bold text-gray-400 dark:text-white'>Email</p>
          <input type='email' {...register('email', { required: true })} className='block border p-1 w-full my-4 focus:outline-none' />
          <p className='font-bold text-gray-400 dark:text-white'>Password</p>
          <input type='password' autoComplete='off' {...register('password', { required: true, minLength: 6 })} className='block border p-1 w-full my-4 focus:outline-none' />
          <p className='text-center text-red-400'>{errors.email || errors.password ? '확인해주세요' : 'Good'}</p>
          <button disabled={disabled} className='rounded-full py-3 w-full block bg-red-400 mt-8 font-bold text-xl text-white'>
            {disabled ? '가입중' : '가입하기'}
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
