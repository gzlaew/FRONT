import { InputHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from "../lib/utils";

const inputVariants = cva(
    'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
    {
      variants: {
        variant: {
          default:
            'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100',
          destructive:
            'bg-red-100 text-red-900 dark:bg-red-200 dark:text-red-800',
          outline:
            'bg-transparent border border-gray-300 dark:border-gray-600 dark:text-gray-100',
          subtle:
            'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100',
          ghost:
            'bg-transparent dark:bg-transparent text-gray-900 dark:text-gray-100',
        },
        inputSize: {
          default: 'py-2 px-4',
          sm: 'py-1 px-2 text-sm',
          lg: 'py-3 px-6 text-lg',
        },
      },
      defaultVariants: {
        variant: 'default',
        inputSize: 'default',
      },
    }
);

interface InputComp extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  inputSize?: 'default' | 'sm' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputComp>(({ className, inputSize, variant, ...props }, ref) => {
    return <input ref={ref} className={cn(inputVariants({ variant, inputSize, className }))} {...props} />;
});

Input.displayName = 'Input';

export { Input, inputVariants };
