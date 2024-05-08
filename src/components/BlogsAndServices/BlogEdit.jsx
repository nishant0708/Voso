import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { BACKEND_URL_PRODUCT } from '../../url/url';
import QuillEditor from '../../utils/QuillEditor';
import ImageCropper from '../../utils/cropImage';
import { fetchBlogById, updateBlogById } from '../../Redux/slicer/blogSlice';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const BlogEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { blog } = useSelector((state) => state.blogs);
  const [imgcrop, setimgcrop] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    bannerImg: '',
    content: '',
  });

  //calling api to fectch user blog
  useEffect(() => {
    dispatch(fetchBlogById({ blogId }));
  }, [dispatch, blogId]);

  //setting image title and content
  useEffect(() => {
    if (blog)
      setFormData({
        title: blog?.title || '',
        bannerImg: blog?.bannerImage || '',
        content: blog?.content || '',
      });
  }, [blog]);

  const setimg = useCallback((file) => {
    setimgcrop(file);
  }, []);

  //handling  data change
  const handleOnChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const renderImage = useCallback((imageUrl) => {
    if (imageUrl?.startsWith('https://')) {
      return imageUrl;
    } else {
      return `${BACKEND_URL_PRODUCT}${imageUrl}`;
    }
  }, []);

  //updating details
  const handleUpdateBlog = useCallback(() => {
    const data = {
      blogId: blog._id,
      title: formData.title,
      content: formData.content,
      bannerImg: imgcrop === null ? renderImage(blog.bannerImage) : imgcrop,
    };

    dispatch(updateBlogById(data))
      .then(() => {
        toast('Operation Successful');
        navigate(`/blogs/blogView/${blog.userId}`);
      })
      .catch((error) => {
        toast(`Error updating product: ${error.message}`);
      });
  }, [dispatch, blog, formData, imgcrop, navigate, renderImage]);

  return (
    <DefaultLayout>
      <div className="px-0 sm:px-3 mb-10 flex justify-between items-center">
        <h1 className="mb-1 text-2xl sm:text-3xl font-medium text-black dark:text-white">
          Blog Update
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-white flex justify-center items-center gap-1 bg-[#727cf5] py-1 sm:py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
        >
          <FaCircleArrowLeft size={14} />
          Back
        </button>
      </div>
      <div className="overflow-x-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
        <div className="flex flex-col sm:flex-row justify-between gap-5 sm:gap-2 mb-5">
          <div className="w-full">
            <label className="text-black dark:text-white">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleOnChange}
              value={formData.title}
              id="title"
              className="relative z-20 h-10 mt-1.5 text-sm  dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div className="w-full">
            <label className="text-black dark:text-white md:whitespace-nowrap">
              Banner Image (200 X 200 px){' '}
              <span>
                <a
                  href="https://www.remove.bg/"
                  target="blank"
                  className="text-meta-5 text-sm cursor-pointer hover:underline"
                >
                  Click here to remove background
                </a>
              </span>
            </label>
            <div className="relative mt-[6px]">
              <ImageCropper
                setimg={setimg}
                src={renderImage(blog?.bannerImage)}
                maxHeight={300}
                maxWidth={300}
                minHeight={50}
                minWidth={50}
              />
            </div>
          </div>
        </div>
        <div className="w-full mb-5">
          <QuillEditor
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleOnChange}
          />
        </div>
        <button
          onClick={handleUpdateBlog}
          className="relative mt-[20px] w-[100%] text-white justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
        >
          Update
        </button>
      </div>
    </DefaultLayout>
  );
};

export default BlogEdit;
