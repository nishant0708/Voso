import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchEnquiriesList } from '../../Redux/slicer/userList';
import formatDate from '../../utils/formatDate';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import UserlistSkeleton from '../Skeletons/UserlistSkeleton';

const UserEnquiries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { enquires, status } = useSelector((state) => state.usersList);
  const limit = 10;
  const page = 1;
  console.log(enquires);
//calling api to fetch user enquiry
  const callFetchUsers = useCallback(
    (limit, page, userId) => {
      dispatch(fetchEnquiriesList({ limit, page, userId }));
      
      return;
     
    },
    [dispatch],
  );
//calling api to fetch users
  useEffect(() => {
    callFetchUsers(limit, page, userId);
  }, [callFetchUsers, limit, page, userId]);

  return (
    <DefaultLayout>
      <div className=" w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-10 flex justify-between items-center">
          <h4 className="text-2xl sm:text-3xl font-medium text-black dark:text-white">
            Enquiries List
          </h4>
          <button
            onClick={() => navigate(-1)}
            className="flex gap-1 justify-center items-center py-1 sm:py-1.5 px-3 text-white rounded-md bg-[#727cf5] hover:bg-primary transition-all duration-200"
          >
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>
        <div className="overflow-x-auto">
          {status==="loading" ? <UserlistSkeleton/>:
          <table className="w-full text-sm">
            <thead className="font-extrabold text-center">
              <tr className="font-extrabold whitespace-nowrap rounded-sm bg-gray-2 dark:bg-meta-4">
                <th className="p-2.5 lg:p-4 sm:pl-12 pl-5">#</th>
                <th className="p-2.5 lg:p-4 !pl-10">NAME</th>
                <th className="p-2.5 lg:p-4 !pl-10">MOBILE</th>
                <th className="p-2.5 lg:p-4 !pl-8">EMAIL</th>
                <th className="p-2.5 lg:p-4 !pl-5">DESCRIPTION</th>
                <th className="p-2.5 lg:p-4 !pl-8 pr-5">CREATED AT</th>
              </tr>
            </thead>
            <tbody className="text-black dark:text-white text-center whitespace-nowrap">
                {enquires.length > 0 ? (
                  enquires.map((enquiry, index) => (
                    <tr
                      key={enquiry._id}
                      className={`${
                        index === enquiry.length - 1
                          ? ''
                          : 'border-b border-stroke dark:border-strokedark'
                      }`}
                    >
                      <td className="p-2.5 lg:p-4 sm:pl-12 pl-5 font-extrabold">
                        {index + 1}
                      </td>
                      <td className="p-2.5 lg:p-4 !pl-10 capitalize">
                        {enquiry.fullName}
                      </td>
                      <td className="p-2.5 lg:p-4 !pl-10">{enquiry.mobile}</td>
                      <td className="p-2.5 lg:p-4 !pl-8 text-meta-3">
                        {enquiry.email}
                      </td>
                      <td className="p-2.5 lg:p-4 !pl-5">{enquiry.message}</td>
                      <td className="p-2.5 lg:p-4 !pl-8 pr-5 text-meta-5">
                        {formatDate(enquiry.created_at)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-red-400 text-[18px] font-bold">
                      No enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
          </table>}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserEnquiries;
