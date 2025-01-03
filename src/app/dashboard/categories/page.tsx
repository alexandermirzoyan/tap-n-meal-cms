'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { request } from '@/services/request';
import { Table } from '@/components/Table';
import { Button } from '@/components/Button';
import './styles.scss';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const res = await request({ method: 'GET', url: '/categories' });
    setCategories(res.data);
  };

  const removeCategory = async (id: number) => {
    const isRemoveConfirmed = window.confirm('Are you sure to remove ?');
    if (!isRemoveConfirmed) {
      return;
    }

    const res = await request({ method: 'DELETE', url: `/categories/${id}` });
    if (res.data?.affected >= 1) {
      getCategories();
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className='page-header-section'>
        <h1>Categories page</h1>
        <Link href='/dashboard/categories/create'>
          <Button>Create</Button>
        </Link>
      </div>
      <Table columns={columns} data={categories} onRowRemove={removeCategory} editBaseLink='/dashboard/categories' />
    </>
  );
};

export default Categories;
