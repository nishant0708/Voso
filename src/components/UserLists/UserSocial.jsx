import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchUserSEODetails } from '../../Redux/slicer/userDetails';
import { updateUserSocial } from '../../Redux/slicer/updateDetailsSlice';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import UserSocialSkeleton from '../Skeletons/UserSocialSkeleton';

const UserSocial = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { userSEO, status } = useSelector((state) => state.userDetails);
  const { isLoading } = useSelector((state) => state.updateDetails);
  const [formData, setFormData] = useState({
    Facebook: '',
    Twitter: '',
    Instagram: '',
    LinkedIn: '',
    YouTube: '',
    WhatsApp: '',
    Amazon: '',
    Flipkart: '',
    Swiggy: '',
    Zomato: '',
  });

  // calling api to fetch user social details
  useEffect(() => {
    dispatch(fetchUserSEODetails({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    setFormData({
      Facebook:
        userSEO?.social_media?.filter((prev) => prev.name === 'Facebook')[0]
          ?.url || '',
      Twitter:
        userSEO?.social_media?.filter((prev) => prev.name === 'Twitter')[0]
          ?.url || '',
      Instagram:
        userSEO?.social_media?.filter((prev) => prev.name === 'Instagram')[0]
          ?.url || '',
      LinkedIn:
        userSEO?.social_media?.filter((prev) => prev.name === 'LinkedIn')[0]
          ?.url || '',
      YouTube:
        userSEO?.social_media?.filter((prev) => prev.name === 'YouTube')[0]
          ?.url || '',
      WhatsApp:
        userSEO?.social_media?.filter((prev) => prev.name === 'WhatsApp')[0]
          ?.url || '',
      Amazon:
        userSEO?.social_media?.filter((prev) => prev.name === 'Amazon')[0]
          ?.url || '',
      Flipkart:
        userSEO?.social_media?.filter((prev) => prev.name === 'Flipkart')[0]
          ?.url || '',
      Swiggy:
        userSEO?.social_media?.filter((prev) => prev.name === 'Swiggy')[0]
          ?.url || '',
      Zomato:
        userSEO?.social_media?.filter((prev) => prev.name === 'Zomato')[0]
          ?.url || '',
    });
  }, [userSEO]);

  const handleOnChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  // calling api to update user social details
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        updateUserSocial({
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
          <h1 className="text-xl sm:text-2xl font-semibold text-black dark:text-white">
            Social Media Information
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
          {status === 'loading' ? (
            <UserSocialSkeleton />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="p-5.5 pb-5 flex flex-col gap-6 sm:gap-7">
                <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-10">
                  <div className="w-full xl:w-[48%] flex gap-2 text-sm">
                    <img
                      width={35}
                      src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-1024.png"
                      alt="Facebook"
                    />
                    <input
                      type="text"
                      name="Facebook"
                      id="Facebook"
                      value={formData.Facebook}
                      onChange={handleOnChange}
                      placeholder="Facebook URL"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-[48%] flex gap-2 text-sm">
                    <img
                      width={35}
                      src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter2_colored_svg-512.png"
                      alt="Twitter"
                    />
                    <input
                      type="text"
                      name="Twitter"
                      id="Twitter"
                      value={formData.Twitter}
                      onChange={handleOnChange}
                      placeholder="Twitter URL"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-10">
                  <div className="w-full xl:w-[48%] flex gap-2 text-sm">
                    <img
                      width={35}
                      src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_3-instagram-512.png"
                      alt="Instagram"
                    />
                    <input
                      type="text"
                      name="Instagram"
                      id="Instagram"
                      value={formData.Instagram}
                      onChange={handleOnChange}
                      placeholder="Instagram URL"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-[48%] flex gap-2 text-sm">
                    <img
                      width={35}
                      src="https://cdn1.iconfinder.com/data/icons/logotypes/32/square-linkedin-128.png"
                      alt="LinkedIn"
                    />
                    <input
                      type="text"
                      name="LinkedIn"
                      id="LinkedIn"
                      value={formData.LinkedIn}
                      onChange={handleOnChange}
                      placeholder="LinkedIn URL"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-10">
                  <div className="w-full xl:w-[48%] flex gap-2 text-sm">
                    <img
                      width={35}
                      src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Youtube-128.png"
                      alt="YouTube"
                    />
                    <input
                      type="text"
                      name="YouTube"
                      id="YouTube"
                      value={formData.YouTube}
                      onChange={handleOnChange}
                      placeholder="YouTube URL"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-[48%] flex gap-2 text-sm">
                    <img
                      width={35}
                      src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo-whatsapp-128.png"
                      alt="WhatsApp"
                    />
                    <input
                      type="text"
                      name="WhatsApp"
                      id="WhatsApp"
                      value={formData.WhatsApp}
                      onChange={handleOnChange}
                      placeholder="WhatsApp URL"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-10">
                  <div className="w-full xl:w-[48%] flex gap-2 text-sm">
                    <img
                      width={35}
                      src="https://cdn3.iconfinder.com/data/icons/picons-social/57/27-amazon-512.png"
                      alt="Amazon"
                    />
                    <input
                      type="text"
                      name="Amazon"
                      id="Amazon"
                      value={formData.Amazon}
                      onChange={handleOnChange}
                      placeholder="Amazon URL"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-[48%] flex gap-2 text-sm">
                    <img
                      width={35}
                      src="https://cdn2.iconfinder.com/data/icons/social-icons-circular-color/512/flipkart-512.png"
                      alt="Flipkart"
                    />
                    <input
                      type="text"
                      name="Flipkart"
                      id="Flipkart"
                      value={formData.Flipkart}
                      onChange={handleOnChange}
                      placeholder="Flipkart URL"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-10">
                  <div className="w-full xl:w-[48%] flex gap-2 text-sm">
                    <img
                      width={35}
                      src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-6/24/swiggy-512.png"
                      alt="Swiggy"
                    />
                    <input
                      type="text"
                      name="Swiggy"
                      id="Swiggy"
                      value={formData.Swiggy}
                      onChange={handleOnChange}
                      placeholder="Swiggy URL"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-[48%] flex gap-2 text-sm">
                    <img
                      width={35}
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAdVBMVEXiN0T////jOkfiNULhLTzhJTXiMT/hKzrhKDjgGi3obXTgHjD75+j++/vunqLjQk3309X87e7nZm7gEij64uPfAB7skJXrhIrkUFr98vP0wcT1x8n2ztDvo6fytLf42tvmW2Tpdn3kSVTtl5vxrLDqfYTeABUSA8UYAAAEgklEQVRoge2beXPzJhCHQcslocO65cg6LFv5/h+xiEW27Mzb9o++SaeFyWQkjn2WH+xCnDGhaRZ8d8lSStIQyHcXCFOSfT/WgDMS/ACWGKrneq7neq7neq7neq7neq7neq7neq7neq7neu7/lfvrjwJ/IxdU3f0S/Nu4rFyGZOTfzRXtRClt5LdwAXZdoUsMlhbi73DhpWCVkIrBoYM1BJJjJQilXKtQoRZEhhJsh+uGpVIIZ0fqUKuDF0dul+2fvGfZEpgBoJeoua2zYlszk5B1BRDgSzusm2MMovTWbVpKPjd9FcfxqTGuQbaMlpvNc2ftdO3Yf9xmDl+5Yk7yPMaS50lknA8+znb4VJj9wYeqyhMaCDlsGk4KVFRZMRmBdaJ7iRfQH483OmrCyJjgS0/EFy5r6bFEQhXnx9tVEmcs4BdXFboBJyXm48i8LJ9e0Eax7mnnvC/LkyvTF27Bi+NrsE+i7F1NurfnAmT14vLnE0QLuSSHtg/+zj2KQ+mFBcfudOShnWfyUGXIdy4AH2icFgGsdkxaHwZ2/MUn6v6d8eSG07a6FdIm7twY6gaNExTPrLBb9DOtUPGKASxRLZmActgq7qq42ZamKAqF4096Rsupet/PknNet86U6Fx3UOjvImJ0+Po5OslC7NMb6QQvy2DJ0MlBaeQuJo6kHZZIEY5HoV/zhkbsORAKR0aMoL60W3CaqXYVOWO4wndOeHabElPOtk/LnFihcahwy0TcxPsv8zWhcrVaJIvYaSbs3dOCBsyG1CjAKtnqHnh72EiUzgLX5FyTnbYyIpuHOm9cVSC2M2kC1c1N9uEn2z9Y3eQgsBsq0Sai0SNtLSZTf5msAQml7TKVRkFUtxN77/EL18VZUqgtI1puLAEyayN2wyIBuEGM3yGGVGgD5bSUYalt3xoya+lDP6IkeOi2svd8RRB7rc3+UhiRRlUZoZufaMBk6Gj3O0Tfym26CTOZiNmmvBYonNm64jFf5wtlb3EEHOtPt2EY7kOJ6s4hx9zT1biqNZG49xojhd2qfb15VJm1dKF2CQWuSVPqGXBVh7K824f3vAE6Pm6NS437+XxHXK8lyl0SjgYKAbgud8tNspA7SUbOXMyPkzkZ0ODo0hx5y5P8JVvRlGfHdHXWAg/UXpMS10mCC5HVBes4nqntM6hnqq9AX452W0X+lFsIdTgmzplwq2piFfeqEdyF0SIeCbi3jEaKR2q/cHFMz2lI3rk9PZbFxE/zGByY6MNJpdLdJJJ6F7wmCtNycq+t8A0j2h1IibnosHlfwXx9Xrd2rri216iwJbqu7Xbqq+U+xfH0UWyntZijrSwmruyDucG4KnPsy+U23tuMB2trijnpgQynaerbYJOVQXOq8urSBIp84ZrbBGMCC2MSbzGck0BpPKrBtm6XB9tlqzS/8cFcWTU3Y4BJU+xFh2tpftwlR2lizlF1vNT+xb0O/qF/wsO7of/m3yme67me67me67me67me67me67me67me67me67me67n/Ru5Pfd/qp75f9kPfp/sD6UdEoetr3ikAAAAASUVORK5CYII="
                      alt="Zomato"
                    />
                    <input
                      type="text"
                      name="Zomato"
                      id="Zomato"
                      value={formData.Zomato}
                      onChange={handleOnChange}
                      placeholder="Zomato URL"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="flex justify-center items-center gap-1.5 rounded bg-primary py-1 px-5 font-medium text-gray hover:bg-opacity-90"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserSocial;
