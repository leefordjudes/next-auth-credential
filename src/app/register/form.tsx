'use client';
import { FormEvent } from 'react';
import * as actions from '@/actions';

export default async function RegisterPage() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const response = await actions.register({ email, password });
    console.log({ response });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2 mx-auto max-w-md mt-10'
    >
      <input
        name='email'
        id='email'
        className='border border-blue-400 p-1'
        type='email'
      />
      <input
        name='password'
        id='password'
        className='border border-blue-400 p-1'
        type='password'
      />
      <button type='submit' className='bg-slate-600 text-white'>
        Register
      </button>
    </form>
  );
}
