import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopUsers } from '../../Redux/slicer/topUsersSlice';
import userimg from '../../images/icon/icons8-user-40.png';
const TableOne = () => {
  const dispatch = useDispatch();
  const limit = 10;
  const page = 1;
  const { topUsers, loading, error } = useSelector((state) => state.topUsers);

  useEffect(() => {
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

      <div className="w-full flex flex-col gap-5.5 text-center">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : topUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="font-extrabold text-center whitespace-nowrap rounded-sm bg-gray-2 dark:bg-meta-4">
                <tr>
                  <th className="p-2.5 lg:p-5 !pl-7">NAME</th>
                  <th className="p-2.5 lg:p-5 !pl-22">MOBILE</th>
                  <th className="p-2.5 lg:p-5 !pl-12">EMAIL</th>
                  <th className="p-2.5 lg:p-5 !pl-8">PLAN</th>
                  <th className="p-2.5 lg:p-5 !pl-8 pr-8">CREATED AT</th>
                </tr>
              </thead>
              <tbody className="text-center text-black dark:text-white whitespace-nowrap">
                {topUsers.map((user, index) => (
                  <tr
                    className={`${
                      index === topUsers.length - 1
                        ? ''
                        : 'border-b border-stroke dark:border-strokedark'
                    }`}
                    key={user._id}
                  >
                    <td className="p-2.5 lg:p-5 !pl-5 flex items-center gap-1">
                      <img
                        src={userimg}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <p>{user.first_name}</p>
                    </td>
                    <td className="p-2.5 lg:p-5 !pl-22">{user.mobile}</td>
                    <td className="p-2.5 lg:p-5 !pl-12 text-meta-3">
                      {user.email}
                    </td>
                    <td className="p-2.5 lg:p-5 !pl-8">NA</td>
                    <td className="p-2.5 lg:p-5 !pl-8 pr-8 text-meta-5">
                      {formatDate(user.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-danger text-base">No User Found</div>
        )}
      </div>
    </div>
  );
};

export default TableOne;
