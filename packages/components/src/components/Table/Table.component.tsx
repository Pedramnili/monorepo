import {createContext, useContext} from "react";
import {TableContextValue, RowContextValue, ITableProps, ITableHeadProps, ITableBodyProps, ITableHeadCellProps, ITableRowProps, ITableCellProps, TableComponent} from "./Table.types";
import "./Table.css"


const TableContext = createContext<TableContextValue | undefined>(undefined);
const RowContext = createContext<RowContextValue | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('Table components must be used within Table');
  }
  return context;
};

export const useRowContext = () => {
  const context = useContext(RowContext);
  if (!context) {
    throw new Error('Table.Cell must be used within Table.Row');
  }
  return context;
};

export const Table: TableComponent = ({items, children}: ITableProps) => {
  return (
    <TableContext.Provider value={{items}}>
      <table className="table w-full mt-4 text-sm text-center border border-gray-300 dark:border-gray-600 border-separate border-spacing-0 rounded-lg">
        {children}
      </table>
    </TableContext.Provider>
  );
};

Table.Head = function Head({children}: ITableHeadProps) {
  return (
    <thead className="bg-gray-200 dark:bg-gray-700">
      <tr>
        {children}
      </tr>
    </thead>
  )
}

Table.HeadCell = function HeadCell({children}: ITableHeadCellProps) {
  return (
    <th className="p-2 border-e border-b border-gray-300 dark:border-gray-600">
      {children}
    </th>
  )
}

Table.Body = function Body({children}: ITableBodyProps) {
  const {items} = useTableContext();

  return (
    <tbody>
      {items.map((item, index) => (
        <RowContext.Provider key={index} value={{item, index}}>
          {children}
        </RowContext.Provider>
      ))}
    </tbody>
  );
}

Table.Row = function Row({children, className = ""}: ITableRowProps) {
  const {item, index} = useRowContext();

  const resolvedClassName = typeof className === 'function'
    ? className(item, index)
    : className;

  return <tr className={resolvedClassName}>{children}</tr>
}

Table.Cell = function Cell({children, dataKey, className = "", rowSpan, colSpan}: ITableCellProps) {
  const {item, index} = useRowContext();

  let resolvedChildren;
  if (dataKey) {
    resolvedChildren = item[dataKey];
  } else if (typeof children === 'function') {
    resolvedChildren = children(item, index);
  } else {
    resolvedChildren = children;
  }

  if ((rowSpan && (index) % rowSpan !== 0)) return null

  return (
    <td className={`p-2 border-e border-b border-gray-300 dark:border-gray-600 ${className}`} rowSpan={rowSpan} colSpan={colSpan}>
      {resolvedChildren}
    </td>
  )
}
