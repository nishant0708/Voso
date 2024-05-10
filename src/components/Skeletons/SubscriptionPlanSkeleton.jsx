import React from 'react'

const SubscriptionPlanSkeleton = () => {
  return (
    <div className="p-7 animate-pulse">
    <form action="#">
      <div className="mb-5 flex flex-col gap-7.5">
        <div className="w-full">
        <div className="mt-2 w-full bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-5 "></div>
        <div className="mt-2 w-full bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-5 "></div>
        </div>
        <div className="w-full">
        <div className="mt-2 w-full bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-5 "></div>
        <div className="mt-2 w-full bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-5 "></div>
        </div>
        <div className="w-full">
        <div className="mt-2 w-full bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-5 "></div>
        <div className="mt-2 w-full bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-5 "></div>
        </div>
      </div>
    </form>
  </div>
  )
}

export default SubscriptionPlanSkeleton