import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchUserDetails } from '../../Redux/slicer/userDetails';
import { updateUserDetails } from '../../Redux/slicer/updateDetailsSlice';
import { FaListUl } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import { FaStopCircle } from 'react-icons/fa';

const UserEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user } = useSelector((state) => state.userDetails);
  const { isLoading } = useSelector((state) => state.updateDetails);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    mobile: '',
    isApproved: '',
    isEmail: '',
    isMobile: '',
    isUnactive: '',
  });

  //formating date
  const format = useCallback((dateString) => {
    const date = new Date(dateString);

    // Extract year, month, and day from the date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Construct the date string in "yyyy-MM-dd" format
    return `${year}-${month}-${day}`;
  }, []);

  //calling api to fetch user detals
  useEffect(() => {
    dispatch(fetchUserDetails({ userId }));
  }, [dispatch, userId]);

  //setting form data
  const setData = useCallback(() => {
    setFormData({
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      dateOfBirth: format(user?.dob) || '',
      gender: user?.gender || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      isApproved: user?.is_approved ? 'true' : 'false' || '',
      isEmail: user?.is_email_verified ? 'true' : 'false' || '',
      isMobile: user?.is_mobile_verified ? 'true' : 'false' || '',
      isUnactive: user?.is_inactive ? 'true' : 'false' || '',
    });
  }, [user, format]);

  //calling set data
  useEffect(() => {
    setData();
  }, [setData, user]);

//handling changes
  const handleOnChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  //handling submit button

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUserDetails({ formData, userId }));
    },
    [dispatch, formData, userId],
  );
//resetting form data
  const resetForm = useCallback(() => {
    setData();
  }, [setData]);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            User Update
          </h1>
          <div className="w-fit">
            <button
              onClick={() => navigate(-1)}
              className="flex gap-3 justify-center items-center py-1 sm:py-1.5 px-3 text-white rounded-md bg-[#727cf5] hover:bg-primary transition-all duration-200"
            >
              <FaListUl />
              <span>List</span>
            </button>
          </div>
        </div>
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
            <div className="p-5.5 pb-5">
              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full lg:w-1/2 text-sm">
                  <label
                    htmlFor="firstName"
                    className="text-black dark:text-white"
                  >
                    First Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleOnChange}
                    placeholder="Enter your first name"
                    required={true}
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full lg:w-1/2 text-sm">
                  <label
                    htmlFor="lastName"
                    className="text-black dark:text-white"
                  >
                    Last Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleOnChange}
                    required={true}
                    placeholder="Enter your last name"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full lg:w-1/2 text-sm">
                  <label
                    htmlFor="gender"
                    className="text-black dark:text-white"
                  >
                    {' '}
                    Gender <span className="text-meta-1">*</span>
                  </label>

                  <div className="mt-0.5 relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formData.gender}
                      name="gender"
                      id="gender"
                      onChange={handleOnChange}
                      required={true}
                      className="relative z-20 text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        Select your gender
                      </option>
                      <option
                        value="male"
                        className="text-body dark:text-bodydark"
                      >
                        Male
                      </option>
                      <option
                        value="female"
                        className="text-body dark:text-bodydark"
                      >
                        Female
                      </option>
                      <option
                        value="other"
                        className="text-body dark:text-bodydark"
                      >
                        Other
                      </option>
                    </select>

                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 text-sm">
                  <label
                    htmlFor="dateOfBirth"
                    className="text-black dark:text-white"
                  >
                    Date picker <span className="text-meta-1">*</span>
                  </label>
                  <div className="mt-0.5 relative">
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleOnChange}
                      required={true}
                      placeholder="mm/dd/yyyy"
                      className="text-black dark:text-white w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-0.5 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full lg:w-1/2 text-sm">
                  <label htmlFor="email" className="text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    required={true}
                    placeholder="Enter your email address"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full lg:w-1/2 text-sm">
                  <label
                    htmlFor="mobile"
                    className="text-black dark:text-white"
                  >
                    Mobile <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleOnChange}
                    required={true}
                    placeholder="Enter your mobile number"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full lg:w-1/2 text-sm">
                  <label
                    htmlFor="isApproved"
                    className="text-black dark:text-white"
                  >
                    {' '}
                    Is Approved{' '}
                  </label>

                  <div className="mt-0.5 relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      name="isApproved"
                      id="isApproved"
                      value={formData.isApproved}
                      onChange={handleOnChange}
                      className="relative text-black dark:text-white z-20 w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        -- Select --
                      </option>
                      <option
                        value="true"
                        className="text-body dark:text-bodydark"
                      >
                        Yes
                      </option>
                      <option
                        value="false"
                        className="text-body dark:text-bodydark"
                      >
                        No
                      </option>
                    </select>

                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 text-sm">
                  <label
                    htmlFor="isEmail"
                    className="text-black dark:text-white"
                  >
                    {' '}
                    Is Email{' '}
                  </label>

                  <div className="mt-0.5 relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      name="isEmail"
                      id="isEmail"
                      value={formData.isEmail}
                      onChange={handleOnChange}
                      className="relative text-black dark:text-white z-20 w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        -- Select --
                      </option>
                      <option
                        value="true"
                        className="text-body dark:text-bodydark"
                      >
                        Yes
                      </option>
                      <option
                        value="false"
                        className="text-body dark:text-bodydark"
                      >
                        No
                      </option>
                    </select>

                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-4 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full lg:w-1/2 text-sm">
                  <label
                    htmlFor="isMobile"
                    className="text-black dark:text-white"
                  >
                    {' '}
                    Is Mobile{' '}
                  </label>

                  <div className="mt-0.5 relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      name="isMobile"
                      id="isMobile"
                      value={formData.isMobile}
                      onChange={handleOnChange}
                      className="relative text-black dark:text-white z-20 w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        -- Select --
                      </option>
                      <option
                        value="true"
                        className="text-body dark:text-bodydark"
                      >
                        Yes
                      </option>
                      <option
                        value="false"
                        className="text-body dark:text-bodydark"
                      >
                        No
                      </option>
                    </select>

                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 text-sm">
                  <label
                    htmlFor="isUnactive"
                    className="text-black dark:text-white"
                  >
                    {' '}
                    Is Unactive{' '}
                  </label>

                  <div className="mt-0.5 relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      name="isUnactive"
                      id="isUnactive"
                      value={formData.isUnactive}
                      onChange={handleOnChange}
                      className="relative text-black dark:text-white z-20 w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        -- Select --
                      </option>
                      <option
                        value="true"
                        className="text-body dark:text-bodydark"
                      >
                        Yes
                      </option>
                      <option
                        value="false"
                        className="text-body dark:text-bodydark"
                      >
                        No
                      </option>
                    </select>

                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-7 text-sm flex justify-center items-center gap-5">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="flex justify-center items-center gap-1.5 rounded bg-success py-1 px-3 font-medium text-gray hover:bg-opacity-90"
                >
                  <FaCheckCircle />
                  Submit
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex justify-center items-center gap-1.5 rounded bg-danger py-1 px-3 font-medium text-gray hover:bg-opacity-90"
                >
                  <FaStopCircle />
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserEdit;
