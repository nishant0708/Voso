import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../Redux/slicer/userList';
import { IoIosAddCircle } from 'react-icons/io';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { TbDotsVertical } from 'react-icons/tb';
import { FaCircleUser } from 'react-icons/fa6';
import { FaRupeeSign } from 'react-icons/fa';
import { HiSpeakerphone } from 'react-icons/hi';
import { PiToolboxFill } from 'react-icons/pi';
import { FaShareSquare } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

const UserTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error, pageData } = useSelector((state) => state.usersList);
  
  const limit = 20;
  const [page, setPage] = useState(1);

  const callFetchUsers = (limit, page) => {
    dispatch(fetchUsers({ limit, page }));
    return;
  };

  useEffect(() => {
    // Dispatch the fetchUsers action when the component mounts
    callFetchUsers(limit, page);
  }, [limit, page]);

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

  const calculateDays = (user) => {
    if (user.subscription && user.subscription.endDate) {
      const days = Math.ceil(
        (new Date(user.subscription.endDate) - new Date()) /
          (1000 * 60 * 60 * 24),
      );
      return days;
    } else {
      return 0;
    }
  };

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
    <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center">
        <h4 className="mb-6 text-3xl font-medium text-black dark:text-white">
          Users List
        </h4>
        <div className="flex gap-3 mb-6 text-base font-medium text-white dark:text-white">
          <button className="flex justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200">
            <IoIosAddCircle />
            Create
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
          >
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>
      </div>

      <div className="mb-5 flex justify-center items-center gap-5">
        <button onClick={handlePrev}>
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <div className="flex gap-5">{renderPageNumbers()}</div>
        <button onClick={handleNext}>
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>

      <div className="flex flex-col overflow-x-scroll">
        <div className="grid place-items-center grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
          <div className="p-2.5 xl:p-3">
            <h5 className="text-sm text-center font-semibold uppercase">#</h5>
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
              Plan
            </h5>
          </div>
          <div className="p-2.5 xl:p-3">
            <h5 className="text-sm text-center font-semibold uppercase">
              Remaining Days
            </h5>
          </div>
          <div className="p-2.5 xl:p-3">
            <h5 className="text-sm text-center font-semibold uppercase">
              Created At
            </h5>
          </div>
          <div className="p-2.5 xl:p-3">
            <h5 className="text-sm text-center font-semibold uppercase">
              Actions
            </h5>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : users ? (
          <div>
            {users.map((user, index) => (
              <div
                key={user._id}
                className={`text-sm grid grid-cols-7 sm:grid-cols-7 ${
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
                    {user.first_name + ' ' + user.last_name}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-3">
                  <p className="text-center text-black dark:text-white">
                    {user.mobile}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-3">
                  <p className="text-center text-meta-3">
                    {user?.subscription?.currentPlan
                      ? user?.subscription?.currentPlan
                      : 'NA'}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-3">
                  <p className="text-center text-black dark:text-white">
                    {calculateDays(user)}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-3">
                  <p className="text-center text-meta-5">
                    {formatDate(user.created_at)}
                  </p>
                </div>

                <div className="relative flex items-center justify-center p-2.5 xl:p-3">
                  <p className="text-black dark:text-white cursor-pointer">
                    <TbDotsVertical
                      size={22}
                      onClick={() => clickHandler(index)}
                    />
                  </p>
                  {active[index] && (
                    <div className="w-[158px] sm:w-[178px] flex flex-col gap-4 absolute top-[25%] right-[95%] sm:right-[70%] shadow-[2px_2px_24px_4px_rgba(0,0,0,0.42)] rounded-lg p-7 dark:text-white bg-white dark:bg-meta-4">
                      <div
                        onClick={() =>
                          navigate(`/tables/user/edit/${user._id}`)
                        }
                        className="flex gap-3 cursor-pointer items-center"
                      >
                        <FaCircleUser className="text-sm sm:text-md" />
                        <span className="text-xs sm:text-sm">User Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/tables/user/plan-subscribe/${user._id}`)
                        }
                        className="flex gap-3 cursor-pointer items-center"
                      >
                        <FaRupeeSign className="text-sm sm:text-md" />
                        <span className="text-xs sm:text-sm">
                          Plan Purchase
                        </span>
                      </div>
                      <div
                        onClick={() => navigate(`/tables/user/seo/${user._id}`)}
                        className="flex gap-3 cursor-pointer items-center"
                      >
                        <HiSpeakerphone className="text-sm sm:text-md" />
                        <span className="text-xs sm:text-sm">SEO Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/tables/user/business-edit/${user._id}`)
                        }
                        className="flex gap-3 cursor-pointer items-center"
                      >
                        <PiToolboxFill className="text-sm sm:text-md" />
                        <span className="text-xs sm:text-sm">
                          Business Edit
                        </span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/tables/user/social-edit/${user._id}`)
                        }
                        className="flex gap-3 cursor-pointer items-center"
                      >
                        <FaShareSquare className="text-sm sm:text-md" />
                        <span className="text-xs sm:text-sm">Social Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/tables/user/pages-edit/${user._id}`)
                        }
                        className="flex gap-3 cursor-pointer items-center"
                      >
                        <FaFileAlt className="text-sm sm:text-md" />
                        <span className="text-xs sm:text-sm">Pages Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/tables/user/view/${user._id}`)
                        }
                        className="flex gap-3 cursor-pointer items-center"
                      >
                        <FaEye className="text-sm sm:text-md" />
                        <span className="text-xs sm:text-sm">User View</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/tables/user/contact-us/${user._id}`)
                        }
                        className="flex gap-3 cursor-pointer items-center"
                      >
                        <BsFillQuestionCircleFill className="text-sm sm:text-md" />
                        <span className="text-xs sm:text-sm">
                          User Enquiries
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserTable;
