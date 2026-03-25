import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({ children, variant = "low", className, ...props }) {
  const variantClass = {
    high: 'badge-high',
    medium: 'badge-medium',
    low: 'badge-low',
    section: 'badge-section'
  }[variant.toLowerCase()] || 'badge-low';

  return (
    <span className={cn('badge', variantClass, className)} {...props}>
      {children}
    </span>
  );
}
