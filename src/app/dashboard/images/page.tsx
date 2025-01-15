'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';

import { request } from '@/services/request';
import { Table } from '@/components/Table';

import './styles.scss';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'Image Preview',
    dataIndex: 'path',
    key: 'path',
    width: 100,
    render: (imagePath: string) => {
      const imageSrc = process.env.NEXT_PUBLIC_SERVER_ORIGIN + imagePath;

      return (
        <Link href={imageSrc} target='_blank'>
          <NextImage
            width={200}
            height={100}
            src={imageSrc}
            className='image--thumbnail'
            alt='Image preview'
          />
        </Link>
      );
    },
  },
];

const Images = () => {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    const res = await request({ method: 'GET', url: '/images' });
    if (res?.data) {
      setImages(res.data);
    }
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const res = await request({
      method: 'POST',
      url: '/images/upload',
      data: formData,
    });

    if (res.data?.id) {
      await getImages();
      alert('Image uploaded!');
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <div className='page-header-section'>
        <h1>Images</h1>
      </div>
      <form onSubmit={submit} className='mb-24'>
        <input type='file' id='file' name='file' accept='image/png, image/gif, image/jpeg' />
        <input type='submit' value='Upload' />
      </form>
      <Table columns={columns} data={images} showActionButtons={false} />
    </>
  );
};

export default Images;
