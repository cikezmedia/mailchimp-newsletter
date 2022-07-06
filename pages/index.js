import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { BiMailSend } from 'react-icons/bi';
import loadingSvg from '../public/assets/loading.svg';

const Home = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState('IDLE');
  const [resMessage, setResMessage] = useState('');

  function isValidEmail(mail) {
    return /\S+@\S+\.\S+/.test(mail);
  }

  const subscribe = async () => {
    try {
      if (!isValidEmail(email)) {
        setResMessage('Please enter a valid email');
        setTimeout(() => {
          setResMessage('');
        }, 3000);
      } else {
        const valid_email = isValidEmail(email);
        setEmail(valid_email);
        const payload = {
          validMail: email,
        };
        await axios.post('/api/newsletter', payload);

        setResMessage('Your subscription is successful');
        setTimeout(() => setResMessage(), 3000);
      }
    } catch (error) {
      setResMessage('You are already subscribed to our newsletter.');
      setTimeout(() => setResMessage(), 3000);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2 bg-darkGreen'>
      <Head>
        <title>Email Newsletter</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
        <h1 className='text-3xl tracking-wide font-bold text-lightYellow'>
          Newsletter
        </h1>

        <div className='relative flex flex-row items-center max-w-3xl pt-8'>
          <input
            className='bg-gray-200 pl-3 w-[350px] lg:w-[480px] outline-none ring-1 ring-lightYello text-darkGreen focus:ring-2 pr-16 focus:ring-mainGreen rounded-lg p-2'
            placeholder='enter your email'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className={`absolute border-l cursor-pointer border-darkGreen pl-3 right-3`}
            type='button'
            disabled={loading === 'LOADING'}
            onClick={subscribe}
          >
            {loading === 'LOADING' ? (
              <span className='flex items-center mx-auto'>
                <Image src={loadingSvg} width={30} height={30} alt='' />
              </span>
            ) : (
              <BiMailSend className='text-darkGreen h-7 w-7' />
            )}
          </button>
        </div>
        <div className='pt-6'>
          {resMessage && <p className='text-sm text-green-400'>{resMessage}</p>}
        </div>
      </main>
    </div>
  );
};

export default Home;
