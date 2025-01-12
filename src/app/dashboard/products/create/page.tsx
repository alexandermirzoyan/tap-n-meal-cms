'use client';

import React, { useEffect } from 'react';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { request } from '@/services/request';

const CreateProduct = () => {
  const [categoryOptions, setCategoryOptions] = React.useState([]);
  const [imageOptions, setImageOptions] = React.useState([]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log('data :: ', data);
  };

  const getCategories = async () => {
    const res = await request({ method: 'GET', url: '/categories' });

    if (res.data) {
      const options = res.data.map((category: { id: number, name: string }) => ({ value: category.id, label: category.name }));
      setCategoryOptions(options);
    }
  };

  const getImages = async () => {
    const res = await request({ method: 'GET', url: '/images' });
    if (res?.data) {
      const options = res.data.map((image: { id: number, path: string }) => ({ value: image.id, label: `Image #${image.id}`, image: image.path }));
      setImageOptions(options);
    }
  };

  useEffect(() => {
    getCategories();
    getImages();
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

        <div className='select-group-container'>
          <Select
            label='Category'
            onChange={(value) => alert(value)}
            options={categoryOptions}
          />

          <Select
            label='Image'
            onChange={(value) => alert(value)}
            options={imageOptions}
          />
        </div>

        <Button type='submit'>Create</Button>
      </form>
    </>
  );
};

export default CreateProduct;
