import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../../layout/DefaultLayout';
import { getNewsApi, deleteNewsByIdApi } from '../../Redux/slicer/newsSlice';
import { BACKEND_URL } from '../../url/url';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { TbDotsVertical } from 'react-icons/tb';
import { FaCircleUser } from 'react-icons/fa6';
import { FaRupeeSign } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const News_page_table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const limit = 10;
  const { data, isLoading } = useSelector((state) => state.news);
  const [page, setPage] = useState(1);
  const [popup, setPopup] = useState();
  useEffect(() => {
    if (page) dispatch(getNewsApi({ limit, page }));
  }, [page, limit, dispatch]);

  const handlepop = (val) => {
    setPopup(val);
  };
  useOnClickOutside(ref, handlepop);
  const renderImage = (imageUrl) => {
    if (imageUrl?.startsWith('https://')) {
      return imageUrl;
    } else {
      return `${BACKEND_URL}news/${imageUrl}`;
    }
  };
  const handleDeleteNews = (id) => {
    const value = window.confirm('Are you sure you want to delete this?');
    if (value) {
      if (!id) {
        toast.error('Somthing gone Wrong!.Please try again');
      }
      dispatch(deleteNewsByIdApi(id));
    }
  };
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  const handlePopup = useCallback((id) => {
    setPopup(id);
  }, []);
  return (
    <DefaultLayout>
      <div className="mb-10 flex justify-between items-center">
        <h4 className="text-2xl sm:text-3xl font-medium text-black dark:text-white">
          News List
        </h4>
        <Link to={'/create-news'}>
          <button className="text-white flex justify-center items-center gap-1 bg-[#727cf5] py-1 sm:py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200">
            <FaCircleArrowLeft size={14} />
            News Create
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="font-extrabold text-center">
            <tr className="font-extrabold whitespace-nowrap rounded-sm bg-gray-2 dark:bg-meta-4">
              <th className="p-2.5 lg:p-4 sm:!pl-14 pl-3">Image</th>
              <th className="p-3.5 lg:p-4 !pl-13">Title</th>
              <th className="p-3.5 lg:p-4 !pl-13">Category</th>
              <th className="p-3.5 lg:p-4 !pl-13">Date</th>
              <th className="p-3.5 lg:p-4 !pl-13">Action</th>
            </tr>
          </thead>
          <tbody className="text-black dark:text-white text-center whitespace-nowrap">
            {data?.map((news, index) => (
              <tr key={index}>
                <td
                  style={{
                    padding: '10px', // Adjust padding as needed
                    alignItems: 'center',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    gap: '20px',
                  }}
                >
                  <span>
                    <img
                      style={{
                        width: '7vh',
                        height: '7vh',
                        borderRadius: '50%',
                      }}
                      alt=""
                      src={renderImage(news?.Image)}
                    />
                  </span>
                </td>
                <td className="p-2.5 lg:p-4 sm:!pl-14 pl-3 font-extrabold">
                  {news?.title}
                </td>

                <td className="p-2.5 lg:p-4 !pl-13">{news?.category}</td>
                <td className="p-2.5 lg:p-4 !pl-12 text-meta-5">
                  {formatDate(news?.createdAt)}
                </td>
                <td className="relative p-2.5 lg:p-4 !pl-5 flex justify-center items-center">
                  <p className="cursor-pointer">
                    <TbDotsVertical
                      size={22}
                      onClick={() => handlePopup(news?._id)}
                    />
                  </p>
                  {popup === news?._id && (
                    <div
                      ref={ref}
                      className="w-[150px] sm:w-[160px] flex flex-col gap-4 absolute top-[25%] right-[75%] sm:right-[65%] shadow-[2px_2px_24px_4px_rgba(0,0,0,0.42)] rounded-lg p-7 dark:text-white bg-white dark:bg-meta-4"
                    >
                      <div
                        onClick={() => navigate(`/update-news/${news._id}`)}
                        className="flex gap-3 cursor-pointer items-center"
                      >
                        <FaCircleUser className="text-sm sm:text-md" />
                        <span className="text-xs sm:text-sm">Update News</span>
                      </div>
                      <div
                        onClick={() => handleDeleteNews(news._id)}
                        className="flex gap-3 cursor-pointer items-center"
                      >
                        <FaRupeeSign className="text-sm sm:text-md" />
                        <span className="text-xs sm:text-sm">Delete</span>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default News_page_table;
