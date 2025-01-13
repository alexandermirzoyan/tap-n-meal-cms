'use client';

import React, { useEffect, useState } from 'react';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { request } from '@/services/request';

const CreateProduct = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [imageOptions, setImageOptions] = useState([]);
  const [nameValues, setNameValues] = useState({ en: '', hy: '', ru: '' });
  const [descriptionValues, setDescriptionValues] = useState({ en: '', hy: '', ru: '' });
  const [price, setPrice] = useState<string | number>(0);
  const [quantity, setQuantity] = useState<string | number>(0);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const onNameInputChange = (value: string, langCode: string) => {
    setNameValues((prevState) => ({ ...prevState, [langCode]: value }));
  };

  const onDescriptionInputChange = (value: string, langCode: string) => {
    setDescriptionValues((prevState) => ({ ...prevState, [langCode]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      price,
      quantity,
      category_id: selectedCategory,
      image_id: selectedImage,
      tag_id: null,
      name: nameValues,
      description: descriptionValues,
    };

    const res = await request({ method: 'POST', url: '/products', data });

    if (res?.data?.id) {
      alert('Product created!');
    }
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
          <Input name='name.en' placeholder='Name EN' onChange={(evt) => onNameInputChange(evt.target.value, 'en')} />
          <Input name='name.hy' placeholder='Name HY' onChange={(evt) => onNameInputChange(evt.target.value, 'hy')} />
          <Input name='name.ru' placeholder='Name RU' onChange={(evt) => onNameInputChange(evt.target.value, 'ru')} />
        </div>

        <div className='input-group-container'>
          <Input name='description.en' placeholder='Description EN' onChange={(evt) => onDescriptionInputChange(evt.target.value, 'en')} />
          <Input name='description.hy' placeholder='Description HY' onChange={(evt) => onDescriptionInputChange(evt.target.value, 'hy')} />
          <Input name='description.ru' placeholder='Description RU' onChange={(evt) => onDescriptionInputChange(evt.target.value, 'ru')} />
        </div>

        <Input type='number' name='price' placeholder='Price (AMD)' onChange={(evt) => setPrice(evt.target.value)} />
        <Input type='number' name='quantity' placeholder='Quantity' onChange={(evt) => setQuantity(evt.target.value)} />

        <div className='select-group-container mb-24'>
          <Select
            label='Category'
            onChange={(value) => setSelectedCategory(value)}
            options={categoryOptions}
          />

          <Select
            label='Image'
            onChange={(value) => setSelectedImage(value)}
            options={imageOptions}
          />
        </div>

        <Button type='submit'>Create</Button>
      </form>
    </>
  );
};

export default CreateProduct;
