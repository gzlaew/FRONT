import { TableHTMLAttributes, forwardRef, ReactNode } from "react";
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from "../lib/utils";

const tableVariants = cva(
  'min-w-full divide-y divide-gray-200',
  {
    variants: {
      variant: {
        default: 'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100',
        striped: 'bg-white odd:bg-gray-100 even:bg-white dark:bg-gray-800 dark:odd:bg-gray-700 dark:even:bg-gray-800',
        bordered: 'bg-white border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100',
      },
      tableSize: {
        default: 'text-sm',
        sm: 'text-xs',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      tableSize: 'default',
    },
  }
);

interface TableComp extends TableHTMLAttributes<HTMLTableElement>, VariantProps<typeof tableVariants> {
  tableSize?: 'default' | 'sm' | 'lg';
  headers?: string[];
  rows?: ReactNode[][];
}


const Table = forwardRef<HTMLTableElement, TableComp>(({ className, tableSize, variant, headers = [], rows = [], ...props }, ref) => {
  return (
    <table ref={ref} className={cn(tableVariants({ variant, tableSize, className }))} {...props}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

Table.displayName = 'Table';

export { Table, tableVariants };
