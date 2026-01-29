import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// We don't have radix-ui slot installed yet, but I'll strip it for now or install it.
// Actually, simple button is enough.

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-accent text-white hover:bg-accent-hover border-none',
            secondary: 'bg-white text-text-primary border border-border-light hover:bg-bg-hover',
            ghost: 'bg-transparent text-text-secondary hover:bg-bg-hover hover:text-text-primary border-none',
            danger: 'bg-red-500 text-white hover:bg-red-600 border-none', // custom for now
        };

        const sizes = {
            sm: 'h-7 px-3 text-xs', // 28px
            md: 'h-8 px-3.5 text-sm', // 32px
            lg: 'h-9 px-4 text-sm', // 36px
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button };
