'use client';

import Link from 'next/link';
import Cookies from 'js-cookie';

import { Button } from '@/components/Button';

import './styles.scss';

export const Navigation = () => {
  const onLogoutClick = () => {
    Cookies.remove('token');
    window.location.reload();
  };

  return (
    <nav className='nav--container'>
      <Link href='/dashboard/products'>Products</Link>
      <Link href='/dashboard/categories'>Categories</Link>
      <Link href='/dashboard/images'>Images</Link>
      <Button onClick={onLogoutClick}>Logout</Button>
    </nav>
  );
};
