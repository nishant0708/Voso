import React, { useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../Redux/slicer/userList';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { TbDotsVertical } from 'react-icons/tb';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import DefaultLayout from '../../layout/DefaultLayout';
import Pagination from '../../utils/Pagination';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, pageData } = useSelector((state) => state.usersList);
  const limit = 20;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(pageData.total / limit);
  const [active, setActive] = useState(null);


//for handling 3 dots click
  const handlepop = (val) => {
    setActive(val);
  };

  const ref = useRef(null);
  useOnClickOutside(ref, handlepop);

  const handlePopup = (id) => {
    setActive(id);
  };

//fetching user details
  useEffect(() => {
    dispatch(fetchUsers({ limit, page }));
  }, [dispatch, limit, page]);

  //changing page change for pagination 
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
    <DefaultLayout>
      <div className=" w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-10 flex justify-between items-center">
          <h4 className="text-2xl sm:text-3xl font-medium text-black dark:text-white">
            Products List
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
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            

          </div>
          <button onClick={handleNext}>
            <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className=" w-full text-sm">
            <thead className="font-extrabold text-center">
              <tr className="font-extrabold whitespace-nowrap rounded-sm bg-gray-2 dark:bg-meta-4">
                <th className="p-2.5 lg:p-4 sm:!pl-14 pl-3">#</th>
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
                        className="w-[160px] items-start flex flex-col gap-4 absolute top-[25%] right-[75%] sm:right-[65%] shadow-[2px_2px_24px_4px_rgba(0,0,0,0.42)] rounded-lg p-7 dark:text-white bg-white dark:bg-meta-4"
                      >
                        <div
                          onClick={() =>
                            navigate(`/products/product_list/${user._id}`)
                          } //to be added
                          className="flex gap-3 w-30 text-sm cursor-pointer"
                        >
                          <svg
                            fill="#646e88"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#646e88"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path d="m15.387 10.21c0-.013.001-.029.001-.045 0-.486-.204-.925-.532-1.234l-.001-.001c-.318-.314-.755-.508-1.237-.508-.008 0-.015 0-.022 0h-3.386v3.581h3.387.015c.489 0 .93-.204 1.243-.531l.001-.001c.328-.314.532-.755.532-1.244 0-.006 0-.012 0-.018v.001zm8.613 1.79c0-.023 0-.05 0-.077 0-2.185-.602-4.229-1.65-5.976l.029.053c-1.075-1.824-2.555-3.304-4.323-4.348l-.056-.031c-1.694-1.019-3.738-1.621-5.923-1.621-.027 0-.054 0-.081 0h.004c-.023 0-.05 0-.077 0-2.185 0-4.229.602-5.976 1.65l.053-.029c-1.824 1.075-3.304 2.555-4.348 4.323l-.031.056c-1.019 1.694-1.621 3.738-1.621 5.923v.081-.004.077c0 2.185.602 4.229 1.65 5.976l-.029-.053c1.075 1.824 2.555 3.304 4.323 4.348l.056.031c1.694 1.019 3.738 1.621 5.923 1.621h.081-.004.077c2.185 0 4.229-.602 5.976-1.65l-.053.029c1.824-1.075 3.304-2.555 4.348-4.323l.031-.056c1.019-1.694 1.621-3.738 1.621-5.923 0-.027 0-.054 0-.081zm-6.194-1.79v.063c0 1.143-.473 2.175-1.233 2.912l-.001.001c-.738.761-1.77 1.234-2.913 1.234-.022 0-.044 0-.066-.001h.003-3.387v3.581h-2.419v-12h5.806c.019 0 .042-.001.064-.001 1.142 0 2.174.472 2.911 1.232l.001.001c.761.738 1.234 1.77 1.234 2.913 0 .023 0 .045-.001.068v-.003z"></path>
                            </g>
                          </svg>
                          Products List
                        </div>
                        <div
                          onClick={
                            () => navigate(`/products/Gallery/${user._id}`) //to be added
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
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 24 24"
                            xmlSpace="preserve"
                            stroke="#646e88"
                            transform="matrix(-1, 0, 0, 1, 0, 0)"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Products;
