import React from 'react';

export const Card = ({ children }) => (
  <div className="p-4 shadow-md rounded-lg bg-white">{children}</div>
);

export const CardContent = ({ children }) => <div>{children}</div>;
