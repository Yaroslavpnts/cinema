export enum EnumTypeData {
  MOVIES = 'movies',
  ACTORS = 'actors',
  DIRECTORS = 'directors',
}

export enum ColumnType {
  MOVIES = 'movies',
  POSITION = 'position',
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  type: ColumnType;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  type: ColumnType;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDelete: () => void;
}

export interface IDataTableProps {
  rows: {
    [index: string]: string | number;
    name: string;
    id: number;
  }[];
  typeData: EnumTypeData;
}
