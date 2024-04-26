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
    return <div>Loading...</div>;
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
      <div className="overflow-auto w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-8 ml-5 w-full flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-medium text-black dark:text-white">
            Blogs - {blogs.length}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="mr-5 flex text-white justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
          >
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>
        <table className="w-full ml-5 text-left text-sm">
          <thead>
            <tr style={{ borderBottom: '2px solid rgb(159 157 157 / 33%)' }}>
              <th className="w-[320px] font-extrabold p-2.5 pl-3.5">
                TITLE
              </th>
              <th className="w-[120px] font-extrabold p-2.5 pl-1.5">
                ACTIVE
              </th>
              <th className="w-[320px] font-extrabold p-2.5 pl-10">
                CREATED AT
              </th>
              <th className="w-[150px] font-extrabold p-2.5 pl-5">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr
                key={blog._id}
                style={{ borderBottom: '1px solid rgb(159 157 157 / 13%)' }}
              >
                <td className="w-[320px] p-2.5 flex items-center gap-5 font-bold">
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
                <td className="w-[120px] p-2.5">
                  {blog.is_active ? 'Active' : 'Inactive'}
                </td>
                <td className="w-[320px] p-2.5 pl-10 whitespace-nowrap">
                  {formatDate(blog.created_at)}
                </td>
                <td className="w-[150px] p-2.5">
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

const ToggleSwitch = ({ isActive }) => {
  const [isToggled, setIsToggled] = useState(isActive);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div>
      <div
        className={`toggle-switch ${isToggled ? 'active' : ''}`}
        onClick={handleToggle}
      >
        <div className="slider"></div>
      </div>
      <div
        className="toggle-text"
        style={{
          whiteSpace: 'nowrap',
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'black',
          transform: 'translate(-5px,0px)',
        }}
      >
        {isToggled ? 'Featured' : 'Not Featured'}
      </div>
    </div>
  );
};

export default ProductTable;
