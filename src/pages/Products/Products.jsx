import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../Redux/slicer/userList';
import { IoIosAddCircle } from 'react-icons/io';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { TbDotsVertical } from 'react-icons/tb';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import DefaultLayout from '../../layout/DefaultLayout';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error, pageData } = useSelector(
    (state) => state.usersList,
  );
  const limit = 20;
  const [page, setPage] = useState(1);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null); // Track the index of the open menu

  const callFetchUsers = (limit, page) => {
    dispatch(fetchUsers({ limit, page }));
  };

  useEffect(() => {
    callFetchUsers(limit, page);
  }, [limit, page]);

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

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenIndex(null); // Close the menu if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const clickHandler = (index) => {
    // Toggle menu open/close
    setMenuOpenIndex((prevIndex) => (prevIndex === index ? null : index));
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
              page === i ? 'text-primary font-bold' : ''
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
        );
      }
    } else {
      // If total pages are greater than maximum visible pages
      const leftBoundary = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const rightBoundary = Math.min(
        totalPages,
        leftBoundary + maxVisiblePages - 1
      );

      if (leftBoundary > 1) {
        pageNumbers.push(
          <span
            key={1}
            className="cursor-pointer"
            onClick={() => handlePageChange(1)}
          >
            1
          </span>
        );
        pageNumbers.push(<span key="leftDots">...</span>);
      }

      for (let i = leftBoundary; i <= rightBoundary; i++) {
        pageNumbers.push(
          <span
            key={i}
            className={`cursor-pointer ${
              page === i ? 'text-primary font-bold' : ''
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
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
          </span>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <DefaultLayout>
      <div className="flex justify-between items-center">
        <h4 className="mb-6 text-3xl font-medium text-black dark:text-white">
          Products List
        </h4>
        <div className="flex gap-3 mb-6 text-base font-medium text-white dark:text-white">
          <button className="flex justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200">
            <IoIosAddCircle />
            Create
          </button>
          <button className="flex justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200">
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>
      </div>
      <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
          <div className="grid place-items-center grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 md:grid-cols-5">
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
                Email
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
                  className={`text-sm grid grid-cols-5 sm:grid-cols-5 ${
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
                    <p className="text-center text-meta-5">{user.email}</p>
                  </div>

                  <div className="relative flex items-center justify-center p-2.5 xl:p-3">
                    <p className="text-black dark:text-white cursor-pointer">
                      <TbDotsVertical
                        size={22}
                        ref={menuRef}
                        onClick={() => clickHandler(index)}
                      />
                    </p>
                    {menuOpenIndex === index && (
                      <div className="lg:w-[180px] flex flex-col gap-4 top-[80%] right-[55%] absolute z-5 shadow-[2px_2px_24px_4px_rgba(0,0,0,0.42)]  rounded-lg p-7 bg-white text-xl">
                        <div
                          onClick={() => navigate(`/products/product_list/${user._id}`)}//to be added
                          className="flex gap-3 w-30 inline text-sm cursor-pointer"
                          
                        >
                          <svg
                            fill="#646e88"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#646e88"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path d="m15.387 10.21c0-.013.001-.029.001-.045 0-.486-.204-.925-.532-1.234l-.001-.001c-.318-.314-.755-.508-1.237-.508-.008 0-.015 0-.022 0h-3.386v3.581h3.387.015c.489 0 .93-.204 1.243-.531l.001-.001c.328-.314.532-.755.532-1.244 0-.006 0-.012 0-.018v.001zm8.613 1.79c0-.023 0-.05 0-.077 0-2.185-.602-4.229-1.65-5.976l.029.053c-1.075-1.824-2.555-3.304-4.323-4.348l-.056-.031c-1.694-1.019-3.738-1.621-5.923-1.621-.027 0-.054 0-.081 0h.004c-.023 0-.05 0-.077 0-2.185 0-4.229.602-5.976 1.65l.053-.029c-1.824 1.075-3.304 2.555-4.348 4.323l-.031.056c-1.019 1.694-1.621 3.738-1.621 5.923v.081-.004.077c0 2.185.602 4.229 1.65 5.976l-.029-.053c1.075 1.824 2.555 3.304 4.323 4.348l.056.031c1.694 1.019 3.738 1.621 5.923 1.621h.081-.004.077c2.185 0 4.229-.602 5.976-1.65l-.053.029c1.824-1.075 3.304-2.555 4.348-4.323l.031-.056c1.019-1.694 1.621-3.738 1.621-5.923 0-.027 0-.054 0-.081zm-6.194-1.79v.063c0 1.143-.473 2.175-1.233 2.912l-.001.001c-.738.761-1.77 1.234-2.913 1.234-.022 0-.044 0-.066-.001h.003-3.387v3.581h-2.419v-12h5.806c.019 0 .042-.001.064-.001 1.142 0 2.174.472 2.911 1.232l.001.001c.761.738 1.234 1.77 1.234 2.913 0 .023 0 .045-.001.068v-.003z"></path>
                            </g>
                          </svg>
                          Products List
                        </div>
                        <div
                          onClick={() =>
                            navigate(``)//to be added
                          }
                          className="flex gap-3 cursor-pointer"
                        >
                          <svg
                            fill="#646e88"
                            height="20px"
                            width="20px"
                            version="1.1"
                            id="XMLID_69_"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 24 24"
                            xml:space="preserve"
                            stroke="#646e88"
                            transform="matrix(-1, 0, 0, 1, 0, 0)"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {' '}
                              <g id="gallery">
                                {' '}
                                <g>
                                  {' '}
                                  <circle cx="6" cy="6" r="2"></circle>{' '}
                                </g>{' '}
                                <g>
                                  {' '}
                                  <path d="M24,23H4v-4H0V0h20v4h4V23z M6,21h16V6h-2v13H6V21z M3.2,17H18v-1.6l-4-4.8l-3.9,4.9l-3-3L3.2,17z M2,2v13.3l4.9-5.8l3,3 L14,7.4l4,4.8V2H2z"></path>{' '}
                                </g>{' '}
                              </g>{' '}
                            </g>
                          </svg>
                          <span className="text-sm">Gallery List</span>
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
    </DefaultLayout>
  );
};

export default Products;
