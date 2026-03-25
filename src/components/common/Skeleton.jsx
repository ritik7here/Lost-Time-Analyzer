import React from 'react';
import { cn } from '../../utils/cn';

export function Skeleton({ className, ...props }) {
  return (
    <div 
      className={cn('skeleton', className)} 
      {...props} 
    />
  );
}

export function Spinner({ size = 24, className }) {
  return (
    <svg 
      className={cn("animate-spin", className)} 
      style={{ animation: 'spin 1s linear infinite', width: size, height: size, color: 'var(--accent-primary)' }} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }}></circle>
      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style={{ opacity: 0.75 }}></path>
    </svg>
  );
}
