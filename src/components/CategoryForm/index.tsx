'use client';

import React, { useEffect, useState } from 'react';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { request } from '@/services/request';

import { ICategoryFormProps, TFormValues, TTranslationResponse } from './types';

export const CategoryForm = ({ id }: ICategoryFormProps) => {
  const [values, setValues] = useState<TFormValues>({ en: '', hy: '', ru: '' });

  const onInputChange = (value: string, langCode: string) => {
    setValues((prevState) => ({ ...prevState, [langCode]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await request({
      method: 'PATCH',
      url: `/categories/${id}`,
      data: { name: { ...data } },
    });

    if (res.data?.id) {
      alert('Category updated!');
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      const res = await request({ method: 'GET', url: `/categories/${id}` });

      if (res?.data) {
        const defaultValues = { en: '', hy: '', ru: '' };
        res.data.translations.forEach((translation: TTranslationResponse) => {
          defaultValues[translation.locale.code] = translation.name;
        });

        setValues(defaultValues);
      }
    };

    if (id) {
      getCategory();
    }
  }, [id]);

  return (
    <form onSubmit={submit} className='page-form-container'>
      <Input name='en' value={values.en} placeholder='Name EN' onChange={(evt) => onInputChange(evt.target.value, 'en')} />
      <Input name='hy' value={values.hy} placeholder='Name HY' onChange={(evt) => onInputChange(evt.target.value, 'hy')} />
      <Input name='ru' value={values.ru} placeholder='Name RU' onChange={(evt) => onInputChange(evt.target.value, 'ru')} />
      <Button type='submit'>Update</Button>
    </form>
  );
};
