import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import businessSegmentData from '../../utils/businessSegmentData';
import stateNames from '../../utils/stateNames';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSEODetails } from '../../Redux/slicer/userDetails';
import { BACKEND_URL } from '../../url/url';
import { updateUserBusiness } from '../../Redux/slicer/updateDetailsSlice';
import QuillEditor from '../../utils/quillEditor';

const UserBusiness = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { userSEO } = useSelector((state) => state.userDetails);
  const { isLoading } = useSelector((state) => state.updateDetails);

  useEffect(() => {
    dispatch(fetchUserSEODetails({ userId }));
  }, [userId]);

  useEffect(() => {
    setFormData({
      domainName: userSEO?.domain || '',
      profileImage: userSEO?.business_details?.business_profile_image || '',
      coverImage: userSEO?.business_details?.business_cover_image || '',
      businessName: userSEO?.business_details?.business_name || '',
      businessSegment: userSEO?.business_details?.business_segment || '',
      description: userSEO?.business_details?.business_description || '',
      address1: userSEO?.business_details?.address?.address_1 || '',
      address2: userSEO?.business_details?.address?.address_2 || '',
      city: userSEO?.business_details?.address?.city || '',
      pincode: userSEO?.business_details?.address?.pin || '',
      state: userSEO?.business_details?.address?.state || '',
      country: userSEO?.business_details?.address?.country || '',
      locationURL: userSEO?.business_details?.location_url || '',
      company: userSEO?.business_details?.company || '',
      designation: userSEO?.business_details?.designation || '',
      businessPan: userSEO?.business_details?.car || '',
      businessGST: userSEO?.business_details?.gst_number || '',
    });
  }, [userSEO]);

  const initialFormData = {
    domainName: '',
    profileImage: '',
    coverImage: '',
    businessName: '',
    businessSegment: '',
    description: '',
    address1: '',
    address2: '',
    city: '',
    pincode: '',
    state: '',
    locationURL: '',
    company: '',
    designation: '',
    businessPan: '',
    businessGST: '',
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
    dispatch(
      updateUserBusiness({
        formData,
        email: userSEO?.userId?.email,
        mobile: userSEO?.userId?.mobile,
        userId,
      }),
    );
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-black dark:text-white">
            Business Information
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
          <form onSubmit={handleSubmit}>
            <div className="p-5.5 pb-5">
              <div className="mb-3">
                <div className="w-full">
                  <label
                    htmlFor="domainName"
                    className="text-sm text-black dark:text-white"
                  >
                    Website Link -{' '}
                    <Link
                      to={`https://${formData.domainName}.vosovyapar.in`}
                      target="_blank"
                      className="text-primary"
                    >{`${formData.domainName}.vosovyapar.in`}</Link>
                  </label>
                  <div className="flex gap-0">
                    <input
                      type="text"
                      name="domainName"
                      id="domainName"
                      value={formData.domainName}
                      onChange={handleOnChange}
                      required={true}
                      placeholder="Domain name"
                      className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      disabled={true}
                      className="w-fit rounded text-sm border-[1.5px] border-l-0 border-stroke py-0.5 px-3 text-meta-4 bg-[#e9ecef] disabled:cursor-default dark:border-form-strokedark dark:bg-form-strokedark dark:text-white"
                    >
                      .vosovyapar.in
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        toast.success('Copied');
                        navigator.clipboard.writeText(
                          `${formData.domainName}.vosovyapar.in`,
                        );
                      }}
                      className="w-[170px] rounded bg-[#727cf5] hover:bg-primary text-sm text-gray"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="profileImage"
                    className="text-sm text-black dark:text-white"
                  >
                    Profile Image (200x200 px)
                  </label>
                  <div className="mt-0.5 h-[100px] sm:h-[150px]">
                    <img
                      className="w-5/12 h-full"
                      src={`${BACKEND_URL}website/${formData.profileImage}`}
                      alt="profileImg"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="coverImage"
                    className="text-sm text-black dark:text-white"
                  >
                    Cover Image (576x200 px)
                  </label>
                  <div className="mt-0.5 h-[100px] sm:h-[150px]">
                    <img
                      className="w-full h-full"
                      src={`${BACKEND_URL}website/${formData.coverImage}`}
                      alt="coverImg"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="businessName"
                    className="text-sm text-black dark:text-white"
                  >
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    id="businessName"
                    value={formData.businessName}
                    onChange={handleOnChange}
                    required={true}
                    placeholder="Business Name"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="businessSegment"
                    className="text-sm text-black dark:text-white"
                  >
                    Business Segment
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formData.businessSegment}
                      name="businessSegment"
                      id="businessSegment"
                      onChange={handleOnChange}
                      required={true}
                      className="relative z-20 mt-0.5 text-sm text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        -- Select --
                      </option>
                      {businessSegmentData.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.name}
                          </option>
                        );
                      })}
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

              <div className="mb-3">
                <QuillEditor
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="address1"
                    className="text-sm text-black dark:text-white"
                  >
                    Address 1
                  </label>
                  <input
                    type="text"
                    name="address1"
                    id="address1"
                    value={formData.address1}
                    onChange={handleOnChange}
                    required={true}
                    placeholder="Enter address 1"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="address2"
                    className="text-sm text-black dark:text-white"
                  >
                    Address 2
                  </label>
                  <input
                    type="text"
                    name="address2"
                    id="address2"
                    value={formData.address2}
                    onChange={handleOnChange}
                    required={true}
                    placeholder="Enter address 2"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="city"
                    className="text-sm text-black dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleOnChange}
                    required={true}
                    placeholder="Enter city name"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="pincode"
                    className="text-sm text-black dark:text-white"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    id="pincode"
                    value={formData.pincode}
                    onChange={handleOnChange}
                    required={true}
                    placeholder="Enter pincode"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="state"
                    className="text-sm text-black dark:text-white"
                  >
                    State
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formData.state}
                      name="state"
                      id="state"
                      onChange={handleOnChange}
                      required={true}
                      className="relative z-20 mt-0.5 text-sm text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        -- Select --
                      </option>
                      {stateNames.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.name}
                          </option>
                        );
                      })}
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
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="country"
                    className="text-sm text-black dark:text-white"
                  >
                    Country
                  </label>
                  <input
                    disabled={true}
                    type="text"
                    name="country"
                    id="country"
                    required={true}
                    value={formData.country}
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke py-0.5 px-3 text-black bg-[#e9ecef] outline-none transition disabled:cursor-default dark:border-form-strokedark dark:bg-form-strokedark dark:text-white"
                  />
                </div>
              </div>

              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="location"
                    className="text-sm text-black dark:text-white"
                  >
                    Location Url{' '}
                    <a
                      href="https://www.google.com/maps/"
                      target="blank"
                      className="text-primary"
                    >
                      ( Open Google Map )
                    </a>
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.locationURL}
                    onChange={handleOnChange}
                    required={true}
                    placeholder="https://www.google.com/maps/place/your+business/@lattitude,longitude,15z/"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="company"
                    className="text-sm text-black dark:text-white"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleOnChange}
                    required={true}
                    placeholder="Enter company name"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="designation"
                    className="text-sm text-black dark:text-white"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    value={formData.designation}
                    onChange={handleOnChange}
                    required={true}
                    placeholder="Enter designation"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="language"
                    className="text-sm text-black dark:text-white"
                  >
                    Default language
                  </label>
                  <input
                    defaultValue={'English'}
                    disabled={true}
                    type="text"
                    name="language"
                    id="language"
                    required={true}
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke py-0.5 px-3 text-black bg-[#e9ecef] outline-none transition disabled:cursor-default dark:border-form-strokedark dark:bg-form-strokedark dark:text-white"
                  />
                </div>
              </div>

              <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="businessPan"
                    className="text-sm text-black dark:text-white"
                  >
                    Business Pan
                  </label>
                  <input
                    type="text"
                    name="businessPan"
                    id="businessPan"
                    value={formData.businessPan}
                    onChange={handleOnChange}
                    placeholder="Enter business pan"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="businessGST"
                    className="text-sm text-black dark:text-white"
                  >
                    Business gst
                  </label>
                  <input
                    type="text"
                    name="businessGST"
                    id="businessGST"
                    value={formData.businessGST}
                    onChange={handleOnChange}
                    placeholder="Enter business gst"
                    className="w-full mt-0.5 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mt-5 text-sm flex justify-center">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="flex justify-center items-center gap-1.5 rounded bg-[#727cf5] hover:bg-primary py-1 px-5 font-medium text-gray"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserBusiness;
