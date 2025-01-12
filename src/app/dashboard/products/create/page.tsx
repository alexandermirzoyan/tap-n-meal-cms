'use client';

import React, { useEffect } from 'react';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { request } from '@/services/request';

const CreateProduct = () => {
  const [categoryOptions, setCategoryOptions] = React.useState([]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log('data :: ', data);
  };

  const getCategories = async () => {
    const res = await request({ method: 'GET', url: '/categories' });

    if (res.data) {
      const options = res.data.map((c: { id: number, name: string }) => ({ value: c.id, label: c.name }));
      setCategoryOptions(options);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
          label='Category'
          onChange={(value) => alert(value)}
          options={categoryOptions}
        />

        <Button type='submit'>Create</Button>
      </form>
    </>
  );
};

export default CreateProduct;
