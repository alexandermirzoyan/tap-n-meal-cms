export interface ITableProps {
  columns: object[];
  data: object[];
  onRowRemove: (_id: number) => void;
  editBaseLink: string;
}
