import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { BACKEND_URL_PRODUCT } from '../../url/url';
import QuillEditor from '../../utils/quillEditor';
import { fetchBlogById, updateBlogById } from '../../Redux/slicer/blogSlice';
import ImageCropper from '../../utils/cropImage';

const BlogEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { blog } = useSelector((state) => state.blogs);
  const [imgcrop, setimgcrop] = useState(null);

  const setimg = (file) => {
    setimgcrop(file);
  };

  useEffect(() => {
    dispatch(fetchBlogById({ blogId }));
  }, []);

  useEffect(() => {
    setFormData({
      title: blog?.title || '',
      bannerImg: blog?.bannerImage || '',
      content: blog?.content || '',
    });
  }, [blog]);

  const initialFormData = {
    title: '',
    bannerImg: '',
    content: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const renderImage = (imageUrl) => {
    if (imageUrl.startsWith('https://')) {
      return imageUrl;
    } else {
      return `${BACKEND_URL_PRODUCT}${imageUrl}`;
    }
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleGalleryUrlChange = (event) => {
    setGalleryUrl(event.target.value);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  //updating details
  const handleUpdateBlog = () => {
    const data = {
      blogId: blog._id,
      title: formData.title,
      content: formData.content,
      bannerImg: imgcrop === null ? renderImage(blog.bannerImage) : imgcrop,
    };

    dispatch(updateBlogById(data))
      .then(() => {
        alert('Operation Successful');
        navigate(`/blogs/blogView/${blog.userId}`);
      })
      .catch((error) => {
        alert(`Error updating product: ${error.message}`);
      });
  };

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
          <div className="relative w-full">
            <label class="text-black dark:text-white md:whitespace-nowrap">
              Banner Image (200 X 200 px){' '}
              <span>
                <a className="text-meta-5 text-sm cursor-pointer hover:underline">
                  Click here to remove background
                </a>
              </span>
            </label>
            <div className="relative">
              {/* <div className="relative ">
                <div className="flex">
                  <input
                    type="file"
                    accept="image/*"
                    id="galleryInput" // Assign an id to the file input
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <input
                    type="text"
                    name="galleryImage"
                    id="galleryImage"
                    placeholder="Browse or input image URL"
                    value=""
                    onChange={handleGalleryUrlChange} // Handle the change event
                    className="relative z-20 h-10 mt-1.5 text-sm text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById('galleryInput').click()
                    } // Trigger click event on file input
                    className="absolute top-[2%] right-[0%] z-40 w-[100px] h-[39px] bg-[#E9ECEF] "
                  >
                    Browse
                  </button>
                </div>
                {(selectedImage || blog.bannerImage) && (
                  <img
                    className="w-[200px] h-[200px] mt-6 mx-1 "
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : renderImage(blog.bannerImage)
                    }
                    alt="Gallery Image"
                  />
                )}
              </div> */}
              <div className="relative mt-[10px]  ">
                <ImageCropper
                  setimg={setimg}
                  src={renderImage(blog.bannerImage)}
                  maxHeight={300}
                  maxWidth={300}
                  minHeight={50}
                  minWidth={50}
                />
              </div>
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
