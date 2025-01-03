import RCTable from 'rc-table';
import Image from 'next/image';
import Link from 'next/link';

import { ITableProps } from '@/components/Table/types';
import TrashIcon from '../../../public/icons/trash.png';
import EditIcon from '../../../public/icons/edit.png';

export const Table = ({ columns, data, onRowRemove }: ITableProps) => {
  const columnsWithAction = [...columns, {
    title: '',
    dataIndex: '',
    key: 'operations',
    width: 100,
    render: (element: any) => (
      <>
        <button className='rc-table-action-col mr-8' onClick={() => onRowRemove(element.id)}>
          <Image alt='Trash icon' src={TrashIcon} />
        </button>
        <Link href='/' className='rc-table-action-col'>
          <Image alt='Edit icon' src={EditIcon} />
        </Link>
      </>
    ),
  }];

  return (
    <RCTable columns={columnsWithAction} data={data} rowKey={(record: any) => record.id} />
  );
};
