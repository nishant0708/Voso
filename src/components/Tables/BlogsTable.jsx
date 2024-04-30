import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../Redux/slicer/userList';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { TbDotsVertical } from 'react-icons/tb';
import { FaCircleUser } from 'react-icons/fa6';
import { FaRupeeSign } from 'react-icons/fa';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

const BlogsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, pageData } = useSelector((state) => state.usersList);

  const ref = useRef(null);
  useOnClickOutside(ref, (index) => clickHandler(index));

  const limit = 20;
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers({ limit, page }));
  }, [limit, page]);

  const [active, setActive] = useState(Array(users.length).fill(false));
  const clickHandler = (index) => {
    const newArray = new Array(users.length).fill(false);
    newArray[index] = active[index];
    newArray[index] = !newArray[index];
    setActive(newArray);
  };

  const totalPages = Math.ceil(pageData.total / limit);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePrev = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const handleNext = () => {
    if (page === totalPages) {
      return;
    }
    setPage(page + 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Define the maximum visible page numbers
    const startIndex = (page - 1) * limit + 1; // Calculate the starting index for the current page

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than or equal to the maximum visible pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <span
            key={i}
            className={`cursor-pointer ${
              page === i ? 'text-primary bg-primary font-bold' : ''
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>,
        );
      }
    } else {
      // If total pages are greater than maximum visible pages
      const leftBoundary = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const rightBoundary = Math.min(
        totalPages,
        leftBoundary + maxVisiblePages - 1,
      );

      if (leftBoundary > 1) {
        pageNumbers.push(
          <span
            key={1}
            className="cursor-pointer"
            onClick={() => handlePageChange(1)}
          >
            1
          </span>,
        );
        pageNumbers.push(<span key="leftDots">...</span>);
      }

      for (let i = leftBoundary; i <= rightBoundary; i++) {
        pageNumbers.push(
          <span
            key={i}
            className={`cursor-pointer ${
              page === i ? 'text-primary text-center font-bold' : ''
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>,
        );
      }

      if (rightBoundary < totalPages) {
        pageNumbers.push(<span key="rightDots">...</span>);
        pageNumbers.push(
          <span
            key={totalPages}
            className="cursor-pointer"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </span>,
        );
      }
    }

    return pageNumbers;
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
        <div className="flex gap-5">{renderPageNumbers()}</div>
        <button onClick={handleNext}>
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="font-extrabold text-center">
          <tr className="font-extrabold whitespace-nowrap rounded-sm bg-gray-2 dark:bg-meta-4">
            <th className="p-2.5 lg:p-4 !pl-12">#</th>
            <th className="p-2.5 lg:p-4 !pl-13">NAME</th>
            <th className="p-2.5 lg:p-4 !pl-13">MOBILE</th>
            <th className="p-2.5 lg:p-4 !pl-12">EMAIL</th>
            <th className="p-2.5 lg:p-4 !pl-5">ACTION</th>
          </tr>
        </thead>
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
              <td className="p-2.5 lg:p-4 !pl-12 font-extrabold">
                {index + 1}
              </td>
              <td className="p-2.5 lg:p-4 !pl-13 capitalize">
                {user.first_name + ' ' + user.last_name}
              </td>
              <td className="p-2.5 lg:p-4 !pl-13">{user.mobile}</td>
              <td className="p-2.5 lg:p-4 !pl-12 text-meta-5">{user?.email}</td>
              <td className="relative p-2.5 lg:p-4 !pl-5 flex justify-center items-center">
                <p className="cursor-pointer">
                  <TbDotsVertical
                    size={22}
                    onClick={() => clickHandler(index)}
                  />
                </p>
                {active[index] && (
                  <div
                    // onClick={(e) => e.stopPropagation()}
                    ref={ref}
                    className="w-[150px] sm:w-[160px] flex flex-col gap-4 absolute top-[25%] right-[75%] sm:right-[65%] shadow-[2px_2px_24px_4px_rgba(0,0,0,0.42)] rounded-lg p-7 dark:text-white bg-white dark:bg-meta-4"
                  >
                    <div
                      onClick={() => navigate(`/blogs/blogView/${user._id}`)}
                      className="flex gap-3 cursor-pointer items-center"
                    >
                      <FaCircleUser className="text-sm sm:text-md" />
                      <span className="text-xs sm:text-sm">Blogs List</span>
                    </div>
                    <div
                      onClick={() => navigate(`/blogs/serviceView/${user._id}`)}
                      className="flex gap-3 cursor-pointer items-center"
                    >
                      <FaRupeeSign className="text-sm sm:text-md" />
                      <span className="text-xs sm:text-sm">Services List</span>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogsTable;
