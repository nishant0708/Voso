import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="overflow-hidden animate-pulse rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className=" bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-32 "></div>
      <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <div className="relative z-30 mx-auto -mt-13 md:-mt-18 h-22 w-full max-w-22 rounded-full bg-white/20 p-1 backdrop-blur sm:h-32 sm:max-w-32 sm:p-3"></div>
        <div className="mt-1">
          <div className="mx-auto w-[150px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
          <div className="mt-2 mx-auto w-[200px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>

          <div className="mt-5 flex justify-center items-center">
            <div className="rounded-md border border-stroke bg-white shadow-default dark:border-form-strokedark dark:bg-boxdark">
              <div className="p-7">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <div className="mt-2 w-[100px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    <div className="mt-2 w-[280px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-6 "></div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="mt-2 w-[100px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    <div className="mt-2 w-[280px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-6 "></div>
                  </div>
                </div>

                <div className="mb-5.5">
                  <div className="mt-2 w-[200px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                  <div className="mt-2 w-full bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-6 "></div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <div className="mt-2 w-[100px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    <div className="mt-2 w-[280px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-6 "></div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="mt-2 w-[100px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    <div className="mt-2 w-[280px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-6 "></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
