import {FC, ReactNode} from "react";


export type TableComponent = FC<ITableProps> & {
  Head: FC<ITableHeadProps>;
  HeadCell: FC<ITableHeadCellProps>;
  Body: FC<ITableBodyProps>;
  Row: FC<ITableRowProps>;
  Cell: FC<ITableCellProps>;
};

export interface TableContextValue {
  items: any[];
}

export interface RowContextValue {
  item: any;
  index: number;
}

export interface ITableProps {
  items: any[];
  children: ReactNode;
}

export interface ITableHeadProps {
  children: ReactNode;
}

export interface ITableBodyProps {
  children: ReactNode;
}

export interface ITableHeadCellProps {
  children: string;
}

export interface ITableRowProps {
  children: ReactNode;
  className?: string | ((item: any, index: number) => string);
}

export interface ITableCellProps {
  children?: ReactNode | ((item: any, index: number) => ReactNode);
  dataKey?: string;
  className?: string | ((item: any, index: number) => string);
  rowSpan?: number;
  colSpan?: number;
}
