import React from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaCircleArrowLeft } from 'react-icons/fa6';

const UserPageEdit = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-black dark:text-white">Pages</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex gap-2 justify-center items-center py-1.5 px-3 text-white rounded-md bg-[#727cf5] hover:bg-primary transition-all duration-200"
          >
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>
        <div className="p-5.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <p className="text-base text-center text-[#f36]">
            Content to render when user have data.
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserPageEdit;
