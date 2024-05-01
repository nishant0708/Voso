import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { BACKEND_URL_PRODUCT } from '../../url/url';
import QuillEditor from '../../utils/quillEditor';
import {
  fetchServiceById,
  updateServiceById,
} from '../../Redux/slicer/blogSlice';
import ImageCropper from '../../utils/cropImage';

const ServiceEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const { service } = useSelector((state) => state.blogs);
  const [imgcrop, setimgcrop] = useState('');

  const setimg = (file) => {
    setimgcrop(file);
  };

  useEffect(() => {
    dispatch(fetchServiceById({ serviceId }));
  }, []);

  useEffect(() => {
    setFormData({
      serviceName: service?.service_name || '',
      servicePrice: service?.service_price || '',
      serviceDescription: service?.service_description || '',
      serviceUrl: service?.service_url || '',
      serviceImage: service?.service_image || '',
    });
  }, [service]);

  const initialFormData = {
    serviceName: '',
    servicePrice: '',
    serviceDescription: '',
    serviceUrl: '',
    serviceImage: '',
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
  const [showAddUrl, setShowAddUrl] = useState(true);

  const handleGalleryUrlChange = (event) => {
    setGalleryUrl(event.target.value);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  //updating details
  const handleUpdateService = () => {
    const data = {
      serviceId: service._id,
      serviceName: formData.serviceName,
      servicePrice: formData.servicePrice,
      serviceDescription: formData.serviceDescription,
      serviceImage: showAddUrl === true ? imgcrop : formData.serviceImage,
      serviceUrl: formData.serviceUrl,
    };

    dispatch(updateServiceById(data))
      .then(() => {
        alert('Operation Successful');
        navigate(`/blogs/serviceView/${service.userId}`);
      })
      .catch((error) => {
        alert(`Error updating product: ${error.message}`);
      });
  };

  return (
    <DefaultLayout>
      <div className="px-0 sm:px-3 mb-10 flex justify-between items-center">
        <h1 className="mb-1 text-2xl sm:text-3xl font-medium text-black dark:text-white">
          Service Update
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
            <label className="text-black dark:text-white">Service Name</label>
            <input
              type="text"
              name="serviceName"
              onChange={handleOnChange}
              value={formData.serviceName}
              id="serviceName"
              className="relative z-20 h-10 mt-1.5 text-sm  dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></input>
          </div>
          <div className="w-full">
            <label className="text-black dark:text-white">Service Price</label>
            <input
              type="text"
              name="servicePrice"
              id="servicePrice"
              onChange={handleOnChange}
              value={formData.servicePrice}
              className="relative z-20 h-10 mt-1.5 text-sm  dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></input>
          </div>
        </div>
        <div className="w-full mb-5">
          <label className="text-black dark:text-white">
            Service Description
          </label>
          <QuillEditor
            name="serviceDescription"
            value={formData.serviceDescription}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-5">
          <div className={`relative w-full ${showAddUrl ? 'block' : 'hidden'}`}>
            <label class="text-black dark:text-white md:whitespace-nowrap">
              Service Image (200 X 200 px){' '}
              <span>
                <a className="text-meta-5 text-sm cursor-pointer hover:underline">
                  Click here to remove background
                </a>
              </span>
            </label>
            <p
              className="w-fit mt-1 py-1 px-4 ml-[10px] cursor-pointer whitespace-nowrap rounded-md border border-[#727CF5] text-[#727CF5] bg-white hover:text-white hover:bg-[#727CF5]"
              onClick={() => setShowAddUrl((prev) => !prev)}
            >
              Add url
            </p>
            <div className="relative mt-[10px]  ">
              <ImageCropper
                setimg={setimg}
                src={renderImage(service.service_image)}
                maxHeight={300}
                maxWidth={300}
                minHeight={50}
                minWidth={50}
              />
            </div>
          </div>
          <div className={`w-full ${showAddUrl ? 'hidden' : 'block'}`}>
            <label className="text-black dark:text-white w-full">
              Service Image Url
            </label>
            <div className="relative flex flex-col">
              <div>
                <input
                  id="serviceImage"
                  name="serviceImage"
                  className="sm:relative z-20 h-10 mt-1.5 text-sm dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={formData.serviceImage}
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <button
                  className="w-fit text-sm py-2 px-3 cursor-pointer sm:ml-[10px] whitespace-nowrap z-40 sm:absolute top-[14%] right-[0%]  border rounded-md border-[#727CF5] text-[#727CF5] bg-white hover:text-white hover:bg-[#727CF5]"
                  onClick={() => setShowAddUrl((prev) => !prev)}
                >
                  Change to upload Image
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-black dark:text-white">Service Url (External)</p>
            <input
              type="text"
              name="serviceUrl"
              onChange={handleOnChange}
              value={formData.serviceUrl}
              id="serviceUrl"
              className="mt-2 relative z-20 h-10 text-sm  dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>
        <button
          onClick={handleUpdateService}
          className="relative mt-[20px] w-[100%] text-white justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
        >
          Update
        </button>
      </div>
    </DefaultLayout>
  );
};

export default ServiceEdit;
