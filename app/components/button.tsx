import { ButtonHTMLAttributes, FC, forwardRef } from "react";
import {VariantProps, cva} from 'class-variance-authority';
import { cn } from "../lib/utils";



const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800',
    {
      variants: {
        variant: {
          default:
            'bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900',
          destructive:
            'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
          outline:
            'bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100',
          subtle:
            'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100',
          ghost:
            'bg-transparent dark:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
          link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-300 hover:bg-transparent dark:hover:bg-transparent',
        },
        size: {
          default: 'h-10 py-2 px-4',
          sm: 'h-9 px-2 rounded-md',
          lg: 'h-11 px-8 rounded-md',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    }
  )

  interface ButtonComp extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants>{}

const Button =forwardRef<HTMLButtonElement, ButtonComp>( ({className, size, variant, ...props}, ref) => {
    return <button ref={ref} className={cn(buttonVariants({variant, size, className}))} {...props} />
})

export {Button, buttonVariants}