import {FC, ReactNode} from "react";


export type TableComponent = FC<TableProps> & {
  Head: FC<TableHeadProps>;
  HeadCell: FC<TableHeadCellProps>;
  Body: FC<TableBodyProps>;
  Row: FC<TableRowProps>;
  Cell: FC<TableCellProps>;
};

export interface TableContextValue {
  items: any[];
}

export interface RowContextValue {
  item: any;
  index: number;
}

export interface TableProps {
  items: any[];
  loading?: boolean;
  className?: string;
  children: ReactNode;
  height?: number | string;
}

export interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

export interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export interface TableHeadCellProps {
  children: string;
}

export interface TableRowProps {
  children: ReactNode;
  className?: string | ((item: any, index: number) => string);
}

export interface TableCellProps {
  children?: ReactNode | ((item: any, index: number) => ReactNode);
  dataKey?: string;
  className?: string | ((item: any, index: number) => string);
  rowSpan?: number;
  colSpan?: number;
}
