import React from 'react';
import type { FC } from 'react';

export const LoadingSpinner: FC = () => {
  return (
    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
  );
};