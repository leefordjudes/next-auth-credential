'use client';
import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default async function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    let response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    console.log('signin response:', response);
    if (!response?.error) {
      router.push('/');
      router.refresh();
    }
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
        Login
      </button>
    </form>
  );
}
