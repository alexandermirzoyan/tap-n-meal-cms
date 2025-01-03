const CategoryInnerPage = async ({ params }: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  return (
    <h1>
      Update #
      {id}
      {' '}
      category
    </h1>
  );
};

export default CategoryInnerPage;
