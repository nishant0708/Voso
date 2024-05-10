import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';

const Blogviewskeleton = () => {
  return (
    <DefaultLayout>
      <div className="overflow-auto  w-full rounded-sm border border-stroke bg-white px-5 pt-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5 animate-pulse">
        <div className="w-[200px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>

        <div className="flex items-center mt-4">
          <div className="flex items-center justify-center mt-4 ">
            <div className="w-[315px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>

            <div className="ml-6 w-[235px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
            <div className="ml-6 w-[315px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
            <div className="ml-6 w-[140px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          </div>
        </div>

        <hr className="mt-2 border-[#CBCBD2]" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex items-center  mt-4">
            <div className="flex items-center  mt-4 ">
              <div className="ml-7 w-12 h-12 bg-[#CBCBD2] dark:bg-[#374151] rounded-full shadow-md "></div>
              <div className="ml-2.5 w-[230px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
              <div className="ml-6 w-[235px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
              <div className="ml-6 w-[315px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
              <div className="ml-6 w-[140px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Blogviewskeleton;
