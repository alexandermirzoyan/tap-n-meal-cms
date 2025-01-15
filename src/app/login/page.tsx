'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import './styles.scss';

const Login = () => {
  const router = useRouter();

  const onLoginClick = () => {
    Cookies.set('token', '123', { expires: 7 });
    router.push('/dashboard');
  };

  return (
    <div className='login--page-container'>
      <h1>Login</h1>
      <Input name='login' placeholder='Username' />
      <Input name='password' type='password' placeholder='Password' />
      <Button onClick={onLoginClick}>Login</Button>
    </div>
  );
};

export default Login;
