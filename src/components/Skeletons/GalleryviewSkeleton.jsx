import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';

const GalleryviewSkeleton = () => {
  return (
    <DefaultLayout>
      <div className="overflow-auto  w-full rounded-sm border border-stroke bg-white px-5 pt-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5 animate-pulse">
        <div className="w-[200px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>

        <div className="flex items-center mt-4">
          <div className="flex items-center justify-center mt-4 ">
            <div className="w-[265px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
            <div className="ml-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
            <div className="ml-2.5 w-[160px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>

            <div className="ml-2 w-[365px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
            <div className="ml-2 w-[90px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          </div>
        </div>

        <hr className="mt-2 border-[#CBCBD2]" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex items-center mt-4">
            <div className="flex items-center justify-center mt-4 ">
              <svg
                class=" ml-20 w-12 h-12 text-[#CBCBD2] dark:text-gray-700 me-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>

              <div className="ml-32 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
              <div className="ml-2.5 w-[160px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>

              <div className="ml-2 w-[365px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
              <div className="ml-2 w-[90px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default GalleryviewSkeleton;
