'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import Pagination from 'rc-pagination';

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
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await request({ method: 'GET', url: `/products?page=${page}` });

    if (res.data) {
      setProducts(res.data);
    }
  };

  const getTotalProductsCount = async () => {
    const res = await request({ method: 'GET', url: '/products/total' });
    if (res.data?.total) {
      setTotalProducts(res.data.total);
    }
  };

  const removeProduct = async (id: number) => {
    const isRemoveConfirmed = window.confirm('Are you sure to remove ?');
    if (!isRemoveConfirmed) {
      return;
    }

    const res = await request({ method: 'DELETE', url: `/products/${id}` });
    if (res.data?.affected >= 1) {
      getProducts();
    }
  };

  useEffect(() => {
    getProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getTotalProductsCount();
  }, []);

  return (
    <>
      <div className='page-header-section'>
        <h1>Products page</h1>
        <Link href='/dashboard/products/create'>
          <Button>Create</Button>
        </Link>
      </div>
      <Table columns={columns} data={products} onRowRemove={removeProduct} editBaseLink='/dashboard/products' />
      <Pagination
        className='product--pagination'
        align='center'
        total={totalProducts}
        pageSize={10}
        current={page}
        onChange={(newPage) => setPage(newPage)}
      />
    </>
  );
};

export default Products;
