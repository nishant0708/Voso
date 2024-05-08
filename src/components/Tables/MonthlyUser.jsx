import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonth } from '../../Redux/slicer/monthlySlice';

const MonthlyUser = () => {
  const dispatch = useDispatch();
  const monthData = useSelector((state) => state.MonthCount.Month);

  //calling api for fetching monthly user
  useEffect(() => {
    dispatch(fetchMonth());
  }, [dispatch]);

  if (!Array.isArray(monthData)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Monthly Website
      </h4>

      <div className="overflow-x-auto flex flex-col">
        <div className=" grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 pl-5 xl:p-5">
            <h5 className="text-sm text-center font-medium uppercase xsm:text-base">
              Month
            </h5>
          </div>
          <div className="p-2.5 pl-10 text-center xl:p-5">
            <h5 className="text-sm text-center font-medium uppercase xsm:text-base">
              Year
            </h5>
          </div>
          <div className="p-2.5 pl-5 text-center xl:p-5">
            <h5 className="text-sm text-center font-medium uppercase xsm:text-base">
              Count
            </h5>
          </div>
        </div>

        {monthData.map((month, index) => (
          <div
            key={`${month.month}-${month.year}`}
            className={`grid grid-cols-3 ${
              index === monthData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
          >
            <div className="flex justify-center items-center p-2.5 xl:p-5">
              <p className="ml-3 text-black dark:text-white">{month.month}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 pl-10 xl:p-5">
              <p className="text-black dark:text-white">{month.year}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 pl-5 xl:p-5">
              <p className="text-meta-3">{month.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyUser;
