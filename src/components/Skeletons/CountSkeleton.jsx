import React from 'react'

const CountSkeleton = () => {
  return (
    <div className="p-7">
                <form action="#">
                  <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                    <div className="mt-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    <div className="mt-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    </div>
                    <div className="w-full sm:w-1/2">
                    <div className="mt-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    <div className="mt-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                    <div className="mt-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    <div className="mt-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    </div>
                    <div className="w-full sm:w-1/2">
                    <div className="mt-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    <div className="mt-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="w-full sm:w-1/2">
                    <div className="mt-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    <div className="mt-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
                    </div>
                  </div>
                </form>
              </div>
  )
}

export default CountSkeleton