import React from 'react'

const CardDataSkeleton = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark animate-pulse">

      <div className=" w-11.5 h-11.5 bg-[#CBCBD2] dark:bg-[#374151] rounded-full items-center justify-center shadow-md "></div>
      <div className="mt-4 flex items-end justify-between">
        <div>
        <div className="mt-2 w-[100px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-5 "></div>
        <div className="mt-2 w-[100px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-5 "></div>
        </div>

        <div className="mt-2 w-[100px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-5 "></div>
      </div>
    </div>
  )
}

export default CardDataSkeleton;