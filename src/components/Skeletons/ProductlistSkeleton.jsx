import React from 'react';

const ProductlistSkeleton = () => {
  return (
    <div className="overflow-auto pb-5 animate-pulse">
      <div className="flex items-center  mt-4">
        <div className="flex items-center justify-center mt-4 ">
          <div className="ml-10 w-[60px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="ml-12 w-[230px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="ml-12 w-[230px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="ml-12 w-[230px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="ml-12 w-[100px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
        </div>
      </div>

      <hr className="mt-2 border-[#CBCBD2]" />
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="flex items-center mt-4">
          <div className="flex items-center justify-center mt-4 ">
            <div className="flex items-center mt-4">
              <div className="flex items-center justify-center mt-4 ">
                <div className="ml-10 w-[60px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                <div className="ml-12 w-[230px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                <div className="ml-12 w-[230px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                <div className="ml-12 w-[230px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                <div className="ml-12 w-[100px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductlistSkeleton;
