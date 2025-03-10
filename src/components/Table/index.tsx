import RCTable from 'rc-table';
import Image from 'next/image';
import Link from 'next/link';

import { ITableProps } from '@/components/Table/types';
import TrashIcon from '../../../public/icons/trash.png';
import EditIcon from '../../../public/icons/edit.png';

export const Table = ({
  columns,
  data,
  onRowRemove,
  editBaseLink,
  showActionButtons = true,
}: ITableProps) => {
  const columnsWithAction = [
    ...columns,
    ...(showActionButtons ? [{
      title: '',
      dataIndex: '',
      key: 'operations',
      width: 100,
      render: (element: any) => (
        <>
          <Link href={`${editBaseLink}/${element.id}`} className='rc-table-action-col mr-8'>
            <Image alt='Edit icon' src={EditIcon} />
          </Link>
          {
            onRowRemove ? (
              <button className='rc-table-action-col' onClick={() => onRowRemove(element.id)}>
                <Image alt='Trash icon' src={TrashIcon} />
              </button>
            ) : null
          }
        </>
      ),
    }] : []),
  ];

  return (
    <RCTable columns={columnsWithAction} data={data} rowKey={(record: any) => record.id} />
  );
};
