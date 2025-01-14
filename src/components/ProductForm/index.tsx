'use client';

import React, { useEffect, useState } from 'react';

import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { request } from '@/services/request';

import { IProductFormProps } from './types';

export const ProductForm = ({ id }: IProductFormProps) => {
  const isEditMode = !!id;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [imageOptions, setImageOptions] = useState([]);
  const [nameValues, setNameValues] = useState({ en: '', hy: '', ru: '' });
  const [descriptionValues, setDescriptionValues] = useState({ en: '', hy: '', ru: '' });
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
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

    const method = isEditMode ? 'PATCH' : 'POST';
    const endpoint = isEditMode ? `/products/${id}` : '/products';
    const res = await request({ method, url: endpoint, data });

    if (res?.data) {
      alert(`Product ${isEditMode ? 'updated' : 'created'}!`);
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

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        const res = await request({
          method: 'GET',
          url: `/products/${id}`,
          // Passing 'Authorization' header as it's only needed for the certain API to get all resources independent of language for CMS
          headers: { Authorization: 'Bearer 12345' },
        });

        if (res.data) {
          setPrice(res.data.price);
          setQuantity(res.data.quantity);
          setSelectedCategory(res.data.category.id);
          setSelectedImage(res.data.image.id);

          const names: { [key: string]: string } = {};
          res.data.name.forEach((n: any) => {
            names[n.locale.code] = n.name;
          });

          const descriptions: { [key: string]: string } = {};
          res.data.description.forEach((d: any) => {
            descriptions[d.locale.code] = d.description;
          });

          setNameValues({ en: names.en, hy: names.hy, ru: names.ru });
          setDescriptionValues({ en: descriptions.en, hy: descriptions.hy, ru: descriptions.ru });
        }
      };

      getProduct();
    }
  }, [id]);

  return (
    <form onSubmit={submit} className='page-form-container'>
      <div className='input-group-container'>
        <Input name='name.en' placeholder='Name EN' value={nameValues.en} onChange={(evt) => onNameInputChange(evt.target.value, 'en')} />
        <Input name='name.hy' placeholder='Name HY' value={nameValues.hy} onChange={(evt) => onNameInputChange(evt.target.value, 'hy')} />
        <Input name='name.ru' placeholder='Name RU' value={nameValues.ru} onChange={(evt) => onNameInputChange(evt.target.value, 'ru')} />
      </div>

      <div className='input-group-container'>
        <Input
          name='description.en'
          value={descriptionValues.en}
          placeholder='Description EN'
          onChange={(evt) => onDescriptionInputChange(evt.target.value, 'en')}
        />
        <Input
          name='description.hy'
          value={descriptionValues.hy}
          placeholder='Description HY'
          onChange={(evt) => onDescriptionInputChange(evt.target.value, 'hy')}
        />
        <Input
          name='description.ru'
          value={descriptionValues.ru}
          placeholder='Description RU'
          onChange={(evt) => onDescriptionInputChange(evt.target.value, 'ru')}
        />
      </div>

      <Input type='number' name='price' value={price} placeholder='Price (AMD)' onChange={(evt) => setPrice(evt.target.value)} />
      <Input type='number' name='quantity' value={quantity} placeholder='Quantity' onChange={(evt) => setQuantity(evt.target.value)} />

      <div className='select-group-container mb-24'>
        <Select
          value={selectedCategory}
          label='Category'
          onChange={(value) => setSelectedCategory(value)}
          options={categoryOptions}
        />

        <Select
          value={selectedImage}
          label='Image'
          onChange={(value) => setSelectedImage(value)}
          options={imageOptions}
        />
      </div>

      <Button type='submit'>{isEditMode ? 'Update' : 'Create'}</Button>
    </form>
  );
};
