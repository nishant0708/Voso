import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../Redux/slicer/userList';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { TbDotsVertical } from 'react-icons/tb';
import { FaCircleUser } from 'react-icons/fa6';
import { FaRupeeSign } from 'react-icons/fa';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import Pagination from '../../utils/Pagination';
import ProductlistSkeleton from '../Skeletons/ProductlistSkeleton';

const BlogsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, status, pageData } = useSelector((state) => state.usersList);
  const limit = 20;
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const totalPages = Math.ceil(pageData.total / limit);

  //handling click on 3 dots
  const handlepop = useCallback((val) => {
    setActive(val);
  }, []);

  useOnClickOutside(ref, handlepop);

  const handlePopup = useCallback((id) => {
    setActive(id);
  }, []);

  //fetching user details

  useEffect(() => {
    dispatch(fetchUsers({ limit, page }));
  }, [dispatch, limit, page]);

  //handling page change for pagination
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePrev = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNext = () => {
    setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  return (
    <div className="overflow-x-auto w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-10 flex justify-between items-center">
        <h4 className="text-2xl sm:text-3xl font-medium text-black dark:text-white">
          Users List
        </h4>
        <button
          onClick={() => navigate(-1)}
          className="text-white flex justify-center items-center gap-1 bg-[#727cf5] py-1 sm:py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
        >
          <FaCircleArrowLeft size={14} />
          Back
        </button>
      </div>

      <div className="mb-10 text-sm sm:text-base flex justify-center items-center gap-5 text-black dark:text-white">
        <button onClick={handlePrev}>
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <div className="flex gap-5">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <button onClick={handleNext}>
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>
      {status === 'loading' ? (
        <ProductlistSkeleton />
      ) : (
        <div className="overflow-x-auto min-h-96">
          <table className="w-full text-sm">
            <thead className="font-extrabold text-center">
              <tr className="font-extrabold whitespace-nowrap rounded-sm bg-gray-2 dark:bg-meta-4">
                <th className="p-2.5 lg:p-4 sm:!pl-14 pl-3">#</th>
                <th className="p-2.5 lg:p-4 !pl-13">NAME</th>
                <th className="p-2.5 lg:p-4 !pl-13">MOBILE</th>
                <th className="p-2.5 lg:p-4 !pl-12">EMAIL</th>
                <th className="p-2.5 lg:p-4 !pl-5">ACTION</th>
              </tr>
            </thead>
            {users.length !== 0 ? (
              <tbody className="text-black dark:text-white text-center whitespace-nowrap">
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`${
                      index === users.length - 1
                        ? ''
                        : 'border-b border-stroke dark:border-strokedark'
                    }`}
                  >
                    <td className="p-2.5 lg:p-4 sm:!pl-14 pl-3 font-extrabold">
                      {index + 1}
                    </td>
                    <td className="p-2.5 lg:p-4 !pl-13 capitalize">
                      {user.first_name + ' ' + user.last_name}
                    </td>
                    <td className="p-2.5 lg:p-4 !pl-13">{user.mobile}</td>
                    <td className="p-2.5 lg:p-4 !pl-12 text-meta-5">
                      {user?.email}
                    </td>
                    <td className="relative p-2.5 lg:p-4 !pl-5 flex justify-center items-center">
                      <p className="cursor-pointer">
                        <TbDotsVertical
                          size={22}
                          onClick={() => handlePopup(user?._id)}
                        />
                      </p>
                      {active === user?._id && (
                        <div
                          ref={ref}
                          className="w-[130px] sm:w-[140px] flex flex-col  absolute top-[25%] right-[75%] sm:right-[65%]  shadow-[2px_2px_24px_4px_rgba(0,0,0,0.42)] rounded-lg  dark:text-white bg-white dark:bg-meta-4"
                        >
                          <Link to={`/blogs/blogView/${user._id}`}>
                            <div className=" flex gap-3 cursor-pointer pl-4 pr-3 pt-4 pb-3 items-center hover:bg-slate-200 dark:hover:bg-primary">
                              <FaCircleUser className="text-sm sm:text-md" />
                              <span className="text-xs sm:text-sm">
                                Blogs List
                              </span>
                            </div>
                          </Link>
                          <Link to={`/blogs/serviceView/${user._id}`}>
                            <div className="flex gap-3 pl-4 pr-3 pt-3 pb-4 cursor-pointer items-center  hover:bg-slate-200 dark:hover:bg-primary">
                              <FaRupeeSign className="text-sm sm:text-md" />
                              <span className="text-xs sm:text-sm">
                                Services List
                              </span>
                            </div>
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <p className="text-center text-red-500 font-bold mt-4">
                No User found
              </p>
            )}
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogsTable;
