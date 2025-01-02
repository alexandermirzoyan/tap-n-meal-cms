'use client';

import { useEffect, useState } from 'react';
import Table from 'rc-table';

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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '',
    dataIndex: '',
    key: 'operations',
    width: 100,
    render: () => <a href='#'>Delete</a>,
  },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const res = await request({ method: 'GET', url: '/categories' });
    setCategories(res.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h1>Categories page</h1>
      <Table columns={columns} data={categories} rowKey={(record: any) => record.id} />
    </>
  );
};

export default Categories;
