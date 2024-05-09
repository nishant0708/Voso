import React from 'react';

const BlogEditSkeleton = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 animate-pulse">
      <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-[2%] mb-5 ">
        <div className="w-full">
          <div className=" w-[120px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="mt-2 bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-5 "></div>
        </div>
        <div className="w-full">
          <div className=" w-[120px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="mt-2 bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-5 "></div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-[120px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
        <div className="mt-2  bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-16 "></div>
      </div>
      <div className="mt-10 bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-5 "></div>
    </div>
  );
};

export default BlogEditSkeleton;
