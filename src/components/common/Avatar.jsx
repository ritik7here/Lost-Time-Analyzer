import React from 'react';
import { cn } from '../../utils/cn';

export function Avatar({ src, alt, size = "md", className, ...props }) {
  const sizeClass = {
    sm: 'avatar-sm',
    md: 'avatar-md',
    lg: 'avatar-lg'
  }[size] || 'avatar-md';

  return (
    <img 
      src={src} 
      alt={alt} 
      className={cn('avatar', sizeClass, className)} 
      {...props} 
    />
  );
}
