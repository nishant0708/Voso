import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchServices } from '../../Redux/slicer/blogSlice';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import DefaultLayout from '../../layout/DefaultLayout';
import { BACKEND_URL_PRODUCT } from '../../url/url'; // Assuming you only need BACKEND_URL_PRODUCT

const ServiceView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { services, status, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchServices({ userId }));
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

  if (services.length === 0) {
    return (
      <DefaultLayout>
        <div className="overflow-auto w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-between items-center">
            <h1 className="mb-6 text-2xl sm:text-3xl font-medium text-black dark:text-white">
              Services - {services.length}
            </h1>
            <button
              onClick={() => (window.location.href = '/products')}
              className="-mt-5 flex text-white justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
            >
              <FaCircleArrowLeft size={14} />
              Back
            </button>
          </div>
          <p className="text-danger text-lg text-center pb-5">
            No Services Found
          </p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="overflow-x-auto w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:pb-1">
        <div className="px-0 sm:px-3 mb-10 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-medium text-black dark:text-white">
            Services - {services.length}
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
          <thead className="font-extrabold text-[13px] text-left whitespace-nowrap">
            <tr style={{ borderBottom: '2px solid rgb(159 157 157 / 33%)' }}>
              <th className="p-2.5">SERVICE NAME</th>
              <th className="p-2.5 pl-10">SERVICE PRICE</th>
              <th className="p-2.5 pl-6">FEATURED</th>
              <th className="p-2.5 pl-10">ACTIVE</th>
              <th className="p-2.5 pl-10">CREATED AT</th>
              <th className="p-2.5 pl-7.5">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-xs text-black dark:text-white text-left whitespace-nowrap">
            {services.map((service) => (
              <tr
                key={service._id}
                style={{ borderBottom: '1px solid rgb(159 157 157 / 13%)' }}
              >
                <td className="p-2.5 w-[280px] flex items-center gap-5 font-bold">
                  <a href={service.service_img}>
                    <span>
                      <img
                        className="bg-red-500 w-[7vh] h-[7vh] rounded-[50%]"
                        src={renderImage(service?.service_image)}
                      />
                    </span>
                  </a>
                  {service.service_name}
                </td>
                <td className="p-2.5 pl-12">
                  {service.currency}
                  {service.service_price}
                </td>
                <td className="p-2.5 pl-6">
                  <ToggleSwitch isActive={service.is_featured} />
                </td>
                <td className="p-2.5 pl-10">
                  {service?.is_active ? 'Active' : 'Inactive'}
                </td>
                <td className="p-2.5 pl-10">
                  {formatDate(service.created_at)}
                </td>
                <td className="p-2.5 pl-7">
                  <p onClick={() => navigate(`/blogs/serviceEdit/${service._id}`)} className="w-fit py-1 px-3 text-center bg-green-600 text-white rounded-3xl cursor-pointer hover:bg-green-700">
                    Service Edit
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
    if (confirm('Do you confirm?') === true) setIsToggled(!isToggled);
  };

  return (
    <div>
      <div
        className={`toggle-switch ${isToggled ? 'active' : ''}`}
        onClick={handleToggle}
      >
        <div className="slider"></div>
      </div>
      <div className="toggle-text whitespace-nowrap text-xs font-bold">
        {isToggled ? 'Featured' : 'Not Featured'}
      </div>
    </div>
  );
};

export default ServiceView;
