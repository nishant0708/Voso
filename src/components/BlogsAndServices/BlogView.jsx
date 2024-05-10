import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBlogs } from '../../Redux/slicer/blogSlice';
import DefaultLayout from '../../layout/DefaultLayout';
import formatDate from '../../utils/formatDate';
import { FaCircleArrowLeft } from 'react-icons/fa6';

import renderImage from '../../common/renderImage';
import Blogviewskeleton from '../Skeletons/Blogviewskeleton';

const ProductTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { blogs, status, error } = useSelector((state) => state.blogs);

  //fetching users list 
  useEffect(() => {
    dispatch(fetchBlogs({ userId }));
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <Blogviewskeleton/>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!blogs.length) {
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
      <div className=" w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:pb-1">
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="font-extrabold text-left whitespace-nowrap rounded-sm bg-gray-2 dark:bg-meta-4">
              <tr>
                <th className="p-3 lg:p-4 pl-5 sm:!pl-14">TITLE</th>
                <th className="p-3 lg:p-4 !pl-5">ACTIVE</th>
                <th className="p-3 lg:p-4 !pl-13">CREATED AT</th>
                <th className="p-3 lg:p-4 !pl-5">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-black dark:text-white text-left whitespace-nowrap">
              {blogs.map((blog, index) => (
                <tr
                  key={blog._id}
                  className={`${
                    index === blogs.length - 1
                      ? ''
                      : 'border-b border-stroke dark:border-strokedark'
                  }`}
                >
                  <td className="p-2.5 w-[300px] lg:p-4 pl-5 sm:!pl-14 flex gap-5 items-center font-bold">
                    <a href={blog.blog}>
                      <span>
                        <img
                          className="w-[7vh] h-[7vh] rounded-[50%]"
                          src={renderImage(blog?.bannerImage)}
                          alt="blogImg"
                        />
                      </span>
                    </a>
                    {blog.title}
                  </td>
                  <td className="p-2.5 lg:p-4 !pl-5">
                    {blog.is_active ? 'Active' : 'Inactive'}
                  </td>
                  <td className="p-2.5 lg:p-4 !pl-13">
                    {formatDate(blog.created_at)}
                  </td>
                  <td className="p-2.5 lg:p-4 !pl-5">
                    <p
                      onClick={() => navigate(`/blogs/blogEdit/${blog._id}`)}
                      className="w-fit whitespace-nowrap py-1 px-3 text-center bg-green-600 text-white rounded-3xl cursor-pointer hover:bg-green-700"
                    >
                      Blog Edit
                    </p>
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

export default ProductTable;
