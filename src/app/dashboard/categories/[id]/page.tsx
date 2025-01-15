import React from 'react';

import { CategoryForm } from '@/components/CategoryForm';

const CategoryInnerPage = async ({ params }: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  return (
    <>
      <div className='page-header-section'>
        <h1>{`Update #${id} Category`}</h1>
      </div>
      <CategoryForm id={+id} />
    </>
  );
};

export default CategoryInnerPage;
