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
import { GrGallery } from "react-icons/gr";
import { FaProductHunt } from "react-icons/fa6";

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
                        className="w-[160px] items-start flex flex-col  absolute top-[25%] right-[75%] sm:right-[65%] shadow-[2px_2px_24px_4px_rgba(0,0,0,0.42)] rounded-lg  dark:text-white bg-white dark:bg-meta-4"
                      >
                        <div
                          onClick={() =>
                            navigate(`/products/product_list/${user._id}`)
                          } //to be added
                          className="w-full flex gap-3 pt-4 pb-2  pr-3 pl-4 text-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-primary"
                        >
                      <FaProductHunt size={20} />
                          Products List
                        </div>
                        <div
                          onClick={
                            () => navigate(`/products/Gallery/${user._id}`) //to be added
                          }
                          className="w-full flex gap-3 pt-3 pb-3  pr-3 pl-4 cursor-pointer hover:bg-slate-200  dark:hover:bg-primary"
                        >
                         <GrGallery size={18} className='-scale-x-100'/>
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
