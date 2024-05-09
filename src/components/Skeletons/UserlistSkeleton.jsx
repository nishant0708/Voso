import React from 'react';

const UserlistSkeleton = () => {
  return (
    <div className="overflow-auto pb-5 animate-pulse">
      <div className="flex items-center  mt-4">
        <div className="flex items-center justify-center mt-4 ">
          <div className="ml-5 w-[60px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="ml-3.5  w-[165px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="ml-4 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="ml-4 w-[130px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="ml-3.5 w-[135px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="ml-3.5 w-[165px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="ml-3.5 w-[120px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
        </div>
      </div>

      <hr className="mt-2 border-[#CBCBD2]" />
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex items-center mt-4">
          <div className="flex items-center justify-center mt-4 ">
            <div className="flex items-center mt-4">
              <div className="flex items-center justify-center mt-4 ">
                <div className="ml-5 w-[60px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                <div className="ml-3.5  w-[165px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                <div className="ml-4 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                <div className="ml-4 w-[130px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                <div className="ml-3.5 w-[135px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                <div className="ml-3.5 w-[165px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                <div className="ml-3.5 w-[120px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserlistSkeleton;
