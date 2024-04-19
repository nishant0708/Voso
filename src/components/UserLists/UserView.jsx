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
  }, [userId]);

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

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold ">User View</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex gap-2 justify-center items-center py-1.5 px-3 text-white rounded-md bg-[#727cf5] hover:bg-primary transition-all duration-200"
          >
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>
        <div className="w-11/12 sm:w-10/12 mx-auto p-5.5 flex flex-col gap-5.5 text-sm text-center text-black dark:text-white rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col justify-center items-center gap-1.5">
            <h1 className="font-bold capitalize text-base">
              NAME: {user.first_name} {user.last_name}
            </h1>
            <p>MOBILE: {user.mobile}</p>
            <p>EMAIL: {user.email}</p>
            <p>
              MOBILE SEC:{' '}
              {`${user.mobile_secondary === '' ? 'NA' : user.mobile_secondary}`}
            </p>
            <p>DOB: {formatDate(user.dob)}</p>
            <p className='capitalize'>GENDER: {user.gender}</p>
            <p>
              APPROVED:{' '}
              <span
                className={`${user.is_approved ? 'bg-success' : 'bg-danger'} text-white py-0.5 px-2 rounded-sm`}
              >{`${user.is_approved ? 'True' : 'False'}`}</span>
            </p>
            <p>
              EMAIL VERIFIED:{' '}
              <span
                className={`${user.is_email_verified ? 'bg-success' : 'bg-danger'} text-white py-0.5 px-2 rounded-sm`}
              >{`${user.is_email_verified ? 'True' : 'False'}`}</span>
            </p>
            <p>
              MOBILE VERIFIED:{' '}
              <span
                className={`${user.is_mobile_verified ? 'bg-success' : 'text-danger'} text-white py-0.5 px-2 rounded-sm`}
              >{`${user.is_mobile_verified ? 'True' : 'False'}`}</span>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1.5">
            <h1 className="font-bold text-base">SUBSCRIPTION PLAN</h1>
            <p>CURRENT PLAN: {user?.subscription?.currentPlan}</p>
            <p>START DATE: {formatDate(user?.subscription?.startDate)}</p>
            <p>END DATE: {formatDate(user?.subscription?.endDate)}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1.5">
            <h1 className="font-bold text-base">FEATURED COUNT</h1>
            <p>GALLERY COUNT: {user?.featuredCount?.featureGalleryCount}</p>
            <p>PRODUCT COUNT: {user?.featuredCount?.featureProductCount}</p>
            <p>BLOGS COUNT: {user?.featuredCount?.featureBlogsCount}</p>
            <p>PAGES COUNT: {user?.featuredCount?.featurePagesCount}</p>
            <p>SERVICES COUNT: {user?.featuredCount?.featureServicesCount}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1.5">
            <h1 className="font-bold text-base">LISTING COUNT</h1>
            <p>BLOG COUNT: {user?.listingCount?.blogsCount}</p>
            <p>GALLERY COUNT: {user?.listingCount?.galleryCount}</p>
            <p>PAGES COUNT: {user?.listingCount?.pagesCount}</p>
            <p>PRODUCT COUNT: {user?.listingCount?.productCount}</p>
            <p>SERVICES COUNT: {user?.listingCount?.servicesCount}</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserView;
