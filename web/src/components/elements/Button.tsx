import React from 'react';

export default function Button({ variant, size, children, className, ...props }) {
  return (
    <button className={`btn-${variant} btn-${size} ${className}`} {...props}>
      {children}
    </button>
  );
}

