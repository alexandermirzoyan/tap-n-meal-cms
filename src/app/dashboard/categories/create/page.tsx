'use client';

import React from 'react';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { request } from '@/services/request';

import './styles.scss';

const CreateCategoryPage = () => {
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await request({
      method: 'POST',
      url: '/categories',
      data: { name: { ...data } },
    });

    if (res.data?.id) {
      alert('Category created!');
    }
  };

  return (
    <>
      <div className='page-header-section'>
        <h1>Create Category</h1>
      </div>
      <form onSubmit={submit} className='page-form-container'>
        <Input name='en' placeholder='Name EN' />
        <Input name='hy' placeholder='Name HY' />
        <Input name='ru' placeholder='Name RU' />
        <Button type='submit'>Create</Button>
      </form>
    </>
  );
};

export default CreateCategoryPage;
