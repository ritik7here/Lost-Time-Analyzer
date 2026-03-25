import React from 'react';
import { cn } from '../../utils/cn';

export function Button({ children, variant = "primary", className, ...props }) {
  const variantClass = variant === 'outline' ? 'btn-outline' : 'btn-primary';
  
  return (
    <button className={cn('btn', variantClass, className)} {...props}>
      {children}
    </button>
  );
}
