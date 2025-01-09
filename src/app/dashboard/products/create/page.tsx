'use client';

import React from 'react';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';

const CreateProduct = () => {
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log('data :: ', data);
  };

  return (
    <>
      <div className='page-header-section'>
        <h1>Create Product</h1>
      </div>
      <form onSubmit={submit} className='page-form-container'>
        <div className='input-group-container'>
          <Input name='name.en' placeholder='Name EN' />
          <Input name='name.hy' placeholder='Name HY' />
          <Input name='name.ru' placeholder='Name RU' />
        </div>

        <div className='input-group-container'>
          <Input name='description.en' placeholder='Description EN' />
          <Input name='description.hy' placeholder='Description HY' />
          <Input name='description.ru' placeholder='Description RU' />
        </div>

        <Input type='number' name='price' placeholder='Price (AMD)' />
        <Input type='number' name='quantity' placeholder='Quantity' />

        <Select
          onChange={(value) => alert(value)}
          options={[
            { value: 1, label: 'Gago' },
            { value: 2, label: 'Mago' },
            { value: 3, label: 'Grno' },
            { value: 4, label: 'MrdoMrdoMrdoMrdoMrdoMrdo', image: '/uploads/cover-1735044867472-453659985.JPG' },
          ]}
        />

        <Button type='submit'>Create</Button>
      </form>
    </>
  );
};

export default CreateProduct;
