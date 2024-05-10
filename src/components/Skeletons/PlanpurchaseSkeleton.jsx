import React from 'react'

const PlanpurchaseSkeleton = () => {
  return (
    <form >
    <div className="p-5.5 pb-5 animate-pulse">
      <div className="w-full xl:w-1/2 text-sm ">
         <form  >
            <div className="p-5.5 pb-5 ">
              <div className="w-full xl:w-1/2 text-sm">
              <div className="ml-2 w-[90px] lg:w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>

                <div className="mt-1 relative z-20 bg-transparent ">
                <div className="ml-2 w-[200px] lg:w-[380px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>

                 
                </div>
              </div>

 
            </div>
          </form>

        <div className="mt-1 relative z-20 bg-transparent dark:bg-form-input">
       

         
        </div>
      </div>

      <div className="mt-8 text-sm flex justify-center items-center gap-5">
      <div className="ml-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
      <div className="ml-2 w-[180px] bg-[#CBCBD2] dark:bg-[#374151] rounded-lg shadow-md p-4 "></div>
      </div>
    </div>
  </form>
  )
}

export default PlanpurchaseSkeleton