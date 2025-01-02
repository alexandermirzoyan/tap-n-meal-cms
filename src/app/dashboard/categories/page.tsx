'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Table from 'rc-table';

import { request } from '@/services/request';
import TrashIcon from '../../../../public/icons/trash.png';
import './styles.scss';

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
      render: (element: any) => (
        <button className='rc-table-remove-col' onClick={() => removeCategory(element.id)}>
          <Image alt='aa' src={TrashIcon} />
        </button>
      ),
    },
  ];

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
