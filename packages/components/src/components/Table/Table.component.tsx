import clsx from "clsx";
import {createContext, useContext} from "react";
import {Loading} from "../Loading/Loading.component";
import {TableContextValue, RowContextValue, TableProps, TableHeadProps, TableBodyProps, TableHeadCellProps, TableRowProps, TableCellProps, TableComponent} from "./Table.types";
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

export const Table: TableComponent = ({items, children, className, height, loading}: TableProps) => {
  return (
    <TableContext.Provider value={{items}}>
      <div style={{height}} className={clsx("overflow-y-auto border relative border-gray-300 dark:border-gray-600 rounded-lg")}>
        <table className={"table w-full mt-4 text-sm text-center  border-separate border-spacing-0 rounded-lg " + className}>
          {children}
        </table>
        {
          loading ?
          <div className={"absolute top-0 left-0 w-full h-full backdrop-blur-[2px] bg-gray-950/40 flex justify-center items-center text-md"}>
            <Loading text={"لطفا صبر کنید..."}/>
          </div>
          : null
        }
      </div>
    </TableContext.Provider>
  );
};

Table.Head = function Head({children, className}: TableHeadProps) {
  return (
    <thead className={"bg-gray-200 dark:bg-gray-700 " + className}>
      <tr>
        {children}
      </tr>
    </thead>
  )
}

Table.HeadCell = function HeadCell({children}: TableHeadCellProps) {
  return (
    <th className="p-2 border-e border-b border-gray-300 dark:border-gray-600">
      {children}
    </th>
  )
}

Table.Body = function Body({children, className}: TableBodyProps) {
  const {items} = useTableContext();

  return (
    <tbody className={className}>
      {items.map((item, index) => (
        <RowContext.Provider key={index} value={{item, index}}>
          {children}
        </RowContext.Provider>
      ))}
    </tbody>
  );
}

Table.Row = function Row({children, className = ""}: TableRowProps) {
  const {item, index} = useRowContext();

  const resolvedClassName = typeof className === 'function'
    ? className(item, index)
    : className;

  return <tr className={clsx("h-10", resolvedClassName)}>{children}</tr>
}

Table.Cell = function Cell({children, dataKey, className = "", rowSpan, colSpan}: TableCellProps) {
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
