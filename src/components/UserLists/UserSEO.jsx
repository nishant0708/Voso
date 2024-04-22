import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { FaItalic } from 'react-icons/fa';

const UserSEO = () => {
  const navigate = useNavigate();
  const [boldbtn, setBold] = useState(false);
  const [italicbtn, setItalic] = useState(false);

  const initialFormData = {
    homeTitle: '',
    siteTitle: '',
    metaKeyword: '',
    googleAnalytics: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            SEO
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex gap-2 justify-center items-center py-1.5 px-3 text-white rounded-md bg-[#727cf5] hover:bg-primary transition-all duration-200"
          >
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
            <div className="p-5.5 pb-5">
              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="homeTitle"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Home Title
                  </label>
                  <input
                    type="text"
                    name="homeTitle"
                    id="homeTitle"
                    value={formData.homeTitle}
                    onChange={handleOnChange}
                    required={true}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="siteTitle"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Site Title
                  </label>
                  <input
                    type="text"
                    name="siteTitle"
                    id="siteTitle"
                    value={formData.siteTitle}
                    onChange={handleOnChange}
                    required={true}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="metaKeyword"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Meta Keyword
                  </label>
                  <input
                    type="text"
                    name="metaKeyword"
                    id="metaKeyword"
                    value={formData.metaKeyword}
                    onChange={handleOnChange}
                    required={true}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="googleAnalytics"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Google Analytics
                  </label>
                  <input
                    type="text"
                    name="googleAnalytics"
                    id="googleAnalytics"
                    value={formData.googleAnalytics}
                    onChange={handleOnChange}
                    required={true}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="w-full">
                  <label
                    htmlFor="description"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Description
                  </label>
                  <div className="px-3 flex gap-3.5 items-center border-stroke rounded-t border-[1.5px] border-b-0 bg-transparent dark:border-form-strokedark dark:bg-form-input">
                    <button
                      onClick={() => setBold(!boldbtn)}
                      className="text-black dark:text-white font-bold cursor-pointer"
                    >
                      B
                    </button>
                    <FaItalic
                      onClick={() => setItalic(!italicbtn)}
                      size={14}
                      className="text-black dark:text-white font-bold cursor-pointer"
                    />
                  </div>
                  <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleOnChange}
                    required={true}
                    className={`${boldbtn && 'font-bold'} ${italicbtn && 'italic'} overflow-y-auto w-full border-[1.5px] rounded-b border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    style={{ minHeight: '150px', maxHeight: '250px' }}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex justify-center items-center gap-1.5 rounded bg-[#727cf5] py-1 px-5 font-medium text-gray hover:bg-primary"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserSEO;
