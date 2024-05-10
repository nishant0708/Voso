import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../../layout/DefaultLayout';
import QuillEditor from '../../utils/QuillEditor';
import { fetchUserSEODetails } from '../../Redux/slicer/userDetails';
import { updateUserSEO } from '../../Redux/slicer/updateDetailsSlice';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import SeoEditSkeleton from '../Skeletons/SeoEditSkeleton';

const UserSEO = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { userSEO ,status} = useSelector((state) => state.userDetails);
  const { isLoading } = useSelector((state) => state.updateDetails);
  const [formData, setFormData] = useState({
    homeTitle: '',
    siteTitle: '',
    metaKeyword: '',
    googleAnalytics: '',
    description: '',
  });

  // calling api to fetch user seo details
  useEffect(() => {
    dispatch(fetchUserSEODetails({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    setFormData({
      homeTitle: userSEO?.seo?.homeTitle || '',
      siteTitle: userSEO?.seo?.siteTitle || '',
      metaKeyword: userSEO?.seo?.metaKeyword || '',
      googleAnalytics: userSEO?.seo?.googleAnalytics || '',
      description: userSEO?.seo?.metaDescription || '',
    });
  }, [userSEO]);

  const handleOnChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  // calling api to update user seo details
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        updateUserSEO({
          formData,
          email: userSEO?.userId?.email,
          mobile: userSEO?.userId?.mobile,
          userId,
        }),
      );
    },
    [dispatch, formData, userId, userSEO],
  );

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            SEO
          </h1>
          <div className="w-fit">
            <button
              onClick={() => navigate(-1)}
              className="flex gap-2 justify-center items-center py-1 sm:py-1.5 px-3 text-white rounded-md bg-[#727cf5] hover:bg-primary transition-all duration-200"
            >
              <FaCircleArrowLeft size={14} />
              Back
            </button>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          { status==="loading"? <SeoEditSkeleton/>:
          <form onSubmit={handleSubmit}>
            <div className="p-5.5 pb-5">
              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="homeTitle"
                    className="text-sm text-black dark:text-white"
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
                    placeholder="Enter home title"
                    className="w-full mt-1 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="siteTitle"
                    className="text-sm text-black dark:text-white"
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
                    placeholder="Enter site title"
                    className="w-full mt-1 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="metaKeyword"
                    className="text-sm text-black dark:text-white"
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
                    placeholder="Enter meta keyword"
                    className="w-full mt-1 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="googleAnalytics"
                    className="text-sm text-black dark:text-white"
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
                    placeholder="Enter google analytics"
                    className="w-full mt-1 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-3">
                <QuillEditor
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex justify-center">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="flex justify-center items-center gap-1.5 rounded bg-[#727cf5] py-1 px-5 font-medium text-gray hover:bg-primary"
                >
                  Update
                </button>
              </div>
            </div>
          </form>}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserSEO;
