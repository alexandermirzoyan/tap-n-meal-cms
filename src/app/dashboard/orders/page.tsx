'use client';

import React, { useEffect, useState } from 'react';
import Pagination from 'rc-pagination';

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
    title: 'Table',
    dataIndex: 'table',
    key: 'table',
  },
  {
    title: 'Date Ordered',
    dataIndex: 'created_at',
    key: 'created_at',
  },
];

const Orders = () => {
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const res = await request({ method: 'GET', url: `/orders?page=${page}` });

    if (res.data) {
      setOrders(res.data);
    }
  };

  const getTotalProductsCount = async () => {
    const res = await request({ method: 'GET', url: '/orders/total' });
    if (res.data?.total) {
      setTotalProducts(res.data.total);
    }
  };

  useEffect(() => {
    getOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getTotalProductsCount();
  }, []);

  return (
    <>
      <div className='page-header-section'>
        <h1>Orders</h1>
      </div>
      <Table columns={columns} data={orders} editBaseLink='/dashboard/orders' />
      <Pagination
        className='order--pagination'
        align='center'
        total={totalProducts}
        pageSize={10}
        current={page}
        onChange={(newPage) => setPage(newPage)}
      />
    </>
  );
};

export default Orders;
