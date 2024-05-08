import React, { useMemo } from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;

  const generatePageNumbers = useMemo(() => {
    const pageNumbers = [];
    const leftBoundary = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const rightBoundary = Math.min(totalPages, leftBoundary + maxVisiblePages - 1);

    for (let i = leftBoundary; i <= rightBoundary; i++) {
      const isCurrent = page === i;
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 rounded cursor-pointer focus:outline-none ${
            isCurrent ? 'bg-blue-500 text-white font-bold' : 'text-gray-700'
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (leftBoundary > 1) {
      pageNumbers.unshift(
        <button key={1} className="px-3 py-1 rounded cursor-pointer focus:outline-none" onClick={() => onPageChange(1)}>
          1
        </button>,
        <span key="leftDots" className="px-3 py-1">...</span>
      );
    }

    if (rightBoundary < totalPages) {
      pageNumbers.push(
        <span key="rightDots" className="px-3 py-1">...</span>,
        <button key={totalPages} className="px-3 py-1 rounded cursor-pointer focus:outline-none" onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  }, [page, totalPages, onPageChange, maxVisiblePages]);

  return <div className="flex gap-2">{generatePageNumbers}</div>;
};

export default Pagination;