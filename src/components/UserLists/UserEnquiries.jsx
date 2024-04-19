import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchEnquiriesList } from '../../Redux/slicer/enquiriesList';
import { FaCircleArrowLeft } from 'react-icons/fa6';

const UserEnquiries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { users, loading, error } = useSelector((state) => state.usersList);
  const limit = 10;
  const page = 1;

  const callFetchUsers = (limit, page, userId) => {
    dispatch(fetchEnquiriesList({ limit, page, userId }));
    return;
  };

  useEffect(() => {
    // Dispatch the fetchUsers action when the component mounts
    callFetchUsers(limit, page, userId);
  }, [limit, page, userId]);

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
    <DefaultLayout>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl font-semibold text-black dark:text-white">
            Enquiries List
          </h4>
          <button
            onClick={() => navigate(-1)}
            className="flex gap-2 justify-center items-center py-1.5 px-3 text-white rounded-md bg-[#727cf5] hover:bg-primary transition-all duration-200"
          >
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>

        <div className="p-5.5 flex flex-col gap-5.5 text-sm text-center text-black dark:text-white rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : users.length > 0 ? (
            <div>
              <div className="grid auto-cols-max grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4">
                <div className="p-2.5 xl:p-3">
                  <h5 className="text-sm text-center font-semibold uppercase">
                    #
                  </h5>
                </div>
                <div className="p-2.5 xl:p-3">
                  <h5 className="text-sm  text-center font-semibold uppercase">
                    Name
                  </h5>
                </div>
                <div className="p-2.5 xl:p-3">
                  <h5 className="text-sm text-center font-semibold uppercase">
                    Mobile
                  </h5>
                </div>
                <div className="p-2.5 xl:p-3">
                  <h5 className="text-sm text-center font-semibold uppercase">
                    EMAIL
                  </h5>
                </div>
                <div className="p-2.5 xl:p-3">
                  <h5 className="text-sm text-center font-semibold uppercase">
                    DESCRIPTION
                  </h5>
                </div>
                <div className="p-2.5 xl:p-3">
                  <h5 className="text-sm text-center font-semibold uppercase">
                    Created At
                  </h5>
                </div>
              </div>
              {users.map((user, index) => (
                <div
                  key={user._id}
                  className={`text-sm grid grid-cols-6 ${
                    index === users.length - 1
                      ? ''
                      : 'border-b border-stroke dark:border-strokedark'
                  }`}
                >
                  {/* Render user information */}
                  <div className="flex justify-center items-center p-2.5 xl:p-3">
                    <p className="text-center font-extrabold text-black dark:text-white">
                      {index + 1}
                    </p>
                  </div>

                  <div className="flex justify-center items-center p-2.5 xl:p-3">
                    <p className="capitalize text-center text-black dark:text-white">
                      {user.fullName}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-3">
                    <p className="text-center text-black dark:text-white">
                      {user.mobile}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-3">
                    <p className="text-center text-meta-3">{user.email}</p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-3">
                    <p className="text-center text-black dark:text-white">
                      {user.message}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-3">
                    <p className="text-center text-meta-5">
                      {formatDate(user.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : <div className='text-danger text-base'>Not Found</div> }
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserEnquiries;
