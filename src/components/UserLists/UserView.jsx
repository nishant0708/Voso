import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { fetchUserDetails } from '../../Redux/slicer/userDetails';

const UserView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user } = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(fetchUserDetails({ userId }));
  }, [dispatch, userId]);

  const formatDate = (dateString) => {
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      'en-US',
      options,
    );
    return formattedDate;
  };

  const format = (dateString) => {
    const date = new Date(dateString);

    // Extract year, month, and day from the date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Construct the date string in "yyyy-MM-dd" format
    return `${year}-${month}-${day}`;
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            User View
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex gap-2 justify-center items-center py-1 sm:py-1.5 px-3 text-white rounded-md bg-[#727cf5] hover:bg-primary transition-all duration-200"
          >
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="mt-5 rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Info
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        disabled={true}
                        value={user.first_name + ' ' + user.last_name}
                        type="text"
                        name="name"
                        id="name"
                        className="w-full capitalize rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="mobile"
                      >
                        Mobile
                      </label>
                      <input
                        disabled={true}
                        value={user.mobile}
                        type="text"
                        name="mobile"
                        id="mobile"
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        disabled={true}
                        value={user.email}
                        type="email"
                        name="email"
                        id="email"
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="mobileSec"
                      >
                        Mobile Sec
                      </label>
                      <input
                        disabled={true}
                        value={`${user.mobile_secondary === '' ? 'NA' : user.mobile_secondary}`}
                        type="text"
                        name="mobile"
                        id="mobile"
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="dob"
                      >
                        DOB
                      </label>
                      <input
                        disabled={true}
                        value={format(user.dob)}
                        type="text"
                        name="dob"
                        id="dob"
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="gender"
                      >
                        Gender
                      </label>
                      <input
                        disabled={true}
                        value={user.gender}
                        type="text"
                        name="gender"
                        id="gender"
                        className="w-full capitalize rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="approved"
                      >
                        Approved
                      </label>
                      <input
                        disabled={true}
                        value={user.is_approved}
                        type="text"
                        name="approved"
                        id="approved"
                        className="w-full capitalize rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="emailVerified"
                      >
                        Email Verified
                      </label>
                      <input
                        disabled={true}
                        value={user.is_email_verified}
                        type="text"
                        name="emailVerified"
                        id="emailVerified"
                        className="w-full capitalize rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="mobileVerified"
                      >
                        Mobile Verified
                      </label>
                      <input
                        disabled={true}
                        value={user.is_mobile_verified}
                        type="text"
                        name="mobileVerified"
                        id="mobileVerified"
                        className="w-full capitalize rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="mt-5 rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Subscription Plan
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5 flex flex-col gap-5.5">
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="plan"
                      >
                        CURRENT PLAN
                      </label>
                      <input
                        disabled={true}
                        value={`${user?.subscription ? 'NA' : user?.subscription?.currentPlan}`}
                        type="text"
                        name="plan"
                        id="plan"
                        className="w-full capitalize rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="startDate"
                      >
                        START DATE
                      </label>
                      <input
                        disabled={true}
                        value={`${user?.subscription ? 'NA' : formatDate(user?.subscription?.startDate)}`}
                        type="text"
                        name="startDate"
                        id="startDate"
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="endDate"
                      >
                        END DATE
                      </label>
                      <input
                        disabled={true}
                        value={`${user?.subscription ? 'NA' : formatDate(user?.subscription?.endDate)}`}
                        type="text"
                        name="endDate"
                        id="endDate"
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="mt-5 rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Featured Count
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="galleryCount"
                      >
                        Gallery Count
                      </label>
                      <input
                        disabled={true}
                        value={user?.featuredCount?.featureGalleryCount}
                        type="text"
                        name="galleryCount"
                        id="galleryCount"
                        className="w-full capitalize rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="productCount"
                      >
                        Product Count
                      </label>
                      <input
                        disabled={true}
                        value={user?.featuredCount?.featureProductCount}
                        type="text"
                        name="productCount"
                        id="productCount"
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="blogsCount"
                      >
                        Blogs Count
                      </label>
                      <input
                        disabled={true}
                        value={user?.featuredCount?.featureBlogsCount}
                        type="text"
                        name="blogsCount"
                        id="blogsCount"
                        className="w-full capitalize rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="pagesCount"
                      >
                        Pages Count
                      </label>
                      <input
                        disabled={true}
                        value={user?.featuredCount?.featurePagesCount}
                        type="text"
                        name="pagesCount"
                        id="pagesCount"
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="servicesCount"
                      >
                        Services Count
                      </label>
                      <input
                        disabled={true}
                        value={user?.featuredCount?.featureServicesCount}
                        type="text"
                        name="servicesCount"
                        id="servicesCount"
                        className="w-full capitalize rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="mt-5 rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Listing Count
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="blogCount"
                      >
                        Blog Count
                      </label>
                      <input
                        disabled={true}
                        value={user?.listingCount?.blogsCount}
                        type="text"
                        name="blogCount"
                        id="blogCount"
                        className="w-full capitalize rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="galleryCount"
                      >
                        Gallery Count
                      </label>
                      <input
                        disabled={true}
                        value={user?.listingCount?.galleryCount}
                        type="text"
                        name="galleryCount"
                        id="galleryCount"
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="pagesCount"
                      >
                        Pages Count
                      </label>
                      <input
                        disabled={true}
                        value={user?.listingCount?.pagesCount}
                        type="text"
                        name="pagesCount"
                        id="pagesCount"
                        className="w-full capitalize rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="productCount"
                      >
                        Product Count
                      </label>
                      <input
                        disabled={true}
                        value={user?.listingCount?.productCount}
                        type="text"
                        name="productCount"
                        id="productCount"
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm text-start font-medium text-black dark:text-white"
                        htmlFor="servicesCount"
                      >
                        Services Count
                      </label>
                      <input
                        disabled={true}
                        value={user?.listingCount?.servicesCount}
                        type="text"
                        name="servicesCount"
                        id="servicesCount"
                        className="w-full capitalize rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserView;
