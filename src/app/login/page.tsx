'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const onLoginClick = () => {
    Cookies.set('token', '123', { expires: 7 });
    router.push('/dashboard');
  };

  return (
    <>
      <h1>Login page</h1>
      <button onClick={onLoginClick}>Click me to login</button>
    </>
  );
};

export default Login;
