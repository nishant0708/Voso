import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBlogs } from '../../Redux/slicer/blogSlice';
import DefaultLayout from '../../layout/DefaultLayout';
import { BACKEND_URL_PRODUCT } from '../../url/url';
import { FaCircleArrowLeft } from 'react-icons/fa6';

const ProductTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { blogs, status, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs({ userId }));
  }, [dispatch, userId]);

  const renderImage = (imageUrl) => {
    if (imageUrl.startsWith('https://')) {
      return imageUrl;
    } else {
      return `${BACKEND_URL_PRODUCT}${imageUrl}`;
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

  if (status === 'loading') {
    return (
      <div className="text-2xl flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (blogs.length === 0) {
    return (
      <DefaultLayout>
        <div className="overflow-auto w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-between items-center">
            <h1 className="mb-6 text-2xl sm:text-3xl font-medium text-black dark:text-white">
              Blogs {blogs.length}
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="-mt-5 flex text-white justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
            >
              <FaCircleArrowLeft size={14} />
              Back
            </button>
          </div>
          <p className="text-danger text-lg text-center pb-5">No Blogs Found</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="overflow-auto w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:pb-1">
        <div className="px-0 sm:px-3 mb-10 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-medium text-black dark:text-white">
            Blogs - {blogs.length}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-white flex justify-center items-center gap-1 bg-[#727cf5] py-1 sm:py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
          >
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="font-extrabold text-left whitespace-nowrap">
            <tr style={{ borderBottom: '2px solid rgb(159 157 157 / 33%)' }}>
              <th className="p-2.5 pl-5 sm:pl-12">TITLE</th>
              <th className="p-2.5 pl-5">ACTIVE</th>
              <th className="p-2.5 pl-13">CREATED AT</th>
              <th className="p-2.5 pl-5">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-black dark:text-white text-left whitespace-nowrap">
            {blogs.map((blog) => (
              <tr
                key={blog._id}
                style={{ borderBottom: '1px solid rgb(159 157 157 / 13%)' }}
              >
                <td className="p-2.5 w-[280px] pl-5 sm:pl-12 flex gap-5 items-center font-bold">
                  <a href={blog.blog}>
                    <span>
                      <img
                        className="w-[7vh] h-[7vh] rounded-[50%]"
                        src={renderImage(blog?.bannerImage)}
                      />
                    </span>
                  </a>
                  {blog.title}
                </td>
                <td className="p-2.5 pl-5">
                  {blog.is_active ? 'Active' : 'Inactive'}
                </td>
                <td className="p-2.5 pl-13">{formatDate(blog.created_at)}</td>
                <td className="p-2.5 pl-5">
                  <p className="w-fit whitespace-nowrap py-1 px-3 text-center bg-green-600 text-white rounded-3xl cursor-pointer hover:bg-green-700">
                    Blog Edit
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default ProductTable;
