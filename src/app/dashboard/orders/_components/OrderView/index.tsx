'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { request } from '@/services/request';

import { IOrderViewProps } from './types';

import './styles.scss';

export const OrderView = ({ id }: IOrderViewProps) => {
  const [order, setOrder] = useState<any | null>(null);

  const getOrder = async (orderId: string) => {
    const res = await request({ method: 'GET', url: `/orders/${orderId}` });

    setOrder(res.data);
  };

  useEffect(() => {
    getOrder(id);
  }, [id]);

  if (!order) {
    return null;
  }

  return (
    <>
      <p>{`Table: ${order.table}`}</p>
      <p>{`Date Ordered: ${order.created_at}`}</p>
      <p>{`Payment Method: ${order.payment_method}`}</p>
      <p>Products</p>
      {order.orderProducts.map((orderProduct: any, index: number) => (
        <div key={index} className='order-view--product'>
          <p>{`Comment: ${orderProduct.comment || 'N/A'}`}</p>
          <p>{`Count: ${orderProduct.count}`}</p>
          <p>{`Price: ${orderProduct.product.price} AMD`}</p>
          <Link href={`/dashboard/products/${orderProduct.product.id}`}>Click for Preview</Link>
        </div>
      ))}
    </>
  );
};
