import React from 'react';

export const Table = ({ children }) => <table className="min-w-full">{children}</table>;
export const TableHeader = ({ children }) => <thead className="bg-gray-200">{children}</thead>;
export const TableBody = ({ children }) => <tbody>{children}</tbody>;
export const TableRow = ({ children }) => <tr>{children}</tr>;
export const TableHead = ({ children }) => <th className="px-4 py-2">{children}</th>;
export const TableCell = ({ children }) => <td className="px-4 py-2 border">{children}</td>;
