'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';

import { Button } from '@/components/Button';
import { Table } from '@/components/Table';
import { request } from '@/services/request';

import './styles.scss';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (text: string) => <span>{`${text} AMD`}</span>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Title',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'imagePath',
    render: (image: { path: string }) => {
      const imageSrc = process.env.NEXT_PUBLIC_SERVER_ORIGIN + image.path;

      return (
        <Link href={imageSrc} target='_blank'>
          <NextImage
            width={200}
            height={100}
            src={imageSrc}
            className='product--image-thumbnail'
            alt='Image preview'
          />
        </Link>
      );
    },
  },
];

const Products = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await request({ method: 'GET', url: `/products?page=${page}` });

      if (res.data) {
        setProducts(res.data);
      }
    };

    getProducts();
  }, [page]);

  return (
    <>
      <div className='page-header-section'>
        <h1>Products page</h1>
        <Link href='/dashboard/products/create'>
          <Button>Create</Button>
        </Link>
      </div>
      <Table columns={columns} data={products} editBaseLink='/dashboard/products' />
    </>
  );
};

export default Products;
