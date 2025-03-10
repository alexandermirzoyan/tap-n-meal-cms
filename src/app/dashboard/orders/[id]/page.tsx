import { OrderView } from '../_components/OrderView';

const OrderInnerPage = async ({ params }: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  return (
    <>
      <div className='page-header-section'>
        <h1>{`View #${id} Order`}</h1>
      </div>
      <OrderView id={id} />
    </>
  );
};

export default OrderInnerPage;
