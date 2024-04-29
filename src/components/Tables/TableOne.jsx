import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopUsers } from '../../Redux/slicer/topUsersSlice';
import userimg from '../../images/icon/icons8-user-40.png';
const TableOne = () => {
  const dispatch = useDispatch();
  const limit = 10;
  const page = 1;
  const { topUsers, loading, error } = useSelector((state) => state.topUsers);
  useEffect(() => {
    // Dispatch the fetchTopUsers action when the component mounts
    dispatch(fetchTopUsers({ limit, page }));
  }, [dispatch, limit, page]);

  const formatDate = (dateString) => {
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      'en-US',
      options,
    );
    return formattedDate;
  };
  return (
    <div className="overflow-x-auto w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Latest Top 10 Users
      </h4>

      <div className="overflow-auto flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm  text-center font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm text-centerfont-medium uppercase xsm:text-base">
              Mobile
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm text-center font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm text-center font-medium uppercase xsm:text-base">
              Plan
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm text-center font-medium uppercase xsm:text-base">
              Created Data
            </h5>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : topUsers ? (
          <div>
            {topUsers.map((user, index) => (
              <div
                key={user._id}
                className={` grid grid-cols-3 sm:grid-cols-5 ${
                  index === topUsers.length - 1
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                }`}
              >
                {/* Render user information */}
                <div className="flex gap-10 justify-center items-center p-2.5 xl:p-5">
                  <img
                    src={userimg} // Assuming there's a profile image URL in user data
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="ml-3  text-black dark:text-white">
                    {user.first_name}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{user.mobile}</p>
                </div>

                <div className="flex  items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-5">{user.email}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">NA</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-meta-5">{formatDate(user.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="p-5.5 flex flex-col gap-5.5 text-sm text-center text-black dark:text-white rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : topUsers.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="font-extrabold text-center">
              <tr
                style={{
                  borderBottom: '2px solid rgb(159 157 157 / 33%)',
                }}
              >
                <th className="p-2.5 pl-13">NAME</th>
                <th className="p-2.5 pl-13">MOBILE</th>
                <th className="p-2.5 pl-13">EMAIL</th>
                <th className="p-2.5 pl-13">PLAN</th>
                <th className="p-2.5 pl-12">CREATED AT</th>
              </tr>
            </thead>
            <tbody className="text-black dark:text-white text-center whitespace-nowrap">
              {topUsers.map((user, index) => (
                <tr
                  key={user._id}
                  style={{
                    borderBottom: '1px solid rgb(159 157 157 / 13%)',
                  }}
                >
                  <td className="p-2.5 pl-12 font-extrabold flex justify-center items-center gap-1">
                    <img
                      src={userimg}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <p>{user.first_name}</p>
                  </td>
                  <td className="p-2.5 pl-13">{user.mobile}</td>
                  <td className="p-2.5 pl-12 text-meta-3">{user.email}</td>
                  <td className="p-2.5 pl-13">NA</td>
                  <td className="p-2.5 pl-13 text-meta-5">
                    {formatDate(user.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-danger text-base">Not Found</div>
        )}
      </div>
    </div>
  );
};

export default TableOne;
