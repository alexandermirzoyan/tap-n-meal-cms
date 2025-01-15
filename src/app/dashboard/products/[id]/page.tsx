import { ProductForm } from '@/components/ProductForm';

const ProductInnerPage = async ({ params }: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  return (
    <>
      <div className='page-header-section'>
        <h1>{`Update #${id} Product`}</h1>
      </div>
      <ProductForm id={+id} />
    </>
  );
};

export default ProductInnerPage;
