import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useDispatch } from 'react-redux';
import { userChangePassword } from '../Redux/slicer/updateDetailsSlice';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('userData'));

  const initialFormData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
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
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New Password and Confirm Password don't match");
      return;
    }
    dispatch(userChangePassword({ userId: user.id, oldPassword:formData.oldPassword, newPassword:formData.newPassword }));
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Change Password" />
      <div className="p-7 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <h2 className="mt-5 text-center text-title-md2 font-semibold text-black dark:text-white">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-10 flex flex-col justify-center items-center gap-3">
            <div className="mb-3 w-full sm:w-7/12 text-sm">
              <label
                htmlFor="oldPassword"
                className="text-black dark:text-white"
              >
                Old Password
              </label>
              <input
                type="text"
                name="oldPassword"
                id="oldPassword"
                value={formData.oldPassword}
                onChange={handleOnChange}
                placeholder="Enter your old password"
                required={true}
                className="w-full mt-1 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-3 w-full sm:w-7/12 text-sm">
              <label
                htmlFor="newPassword"
                className="text-black dark:text-white"
              >
                New Password
              </label>
              <input
                type="text"
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleOnChange}
                placeholder="Enter your new password"
                required={true}
                className="w-full mt-1 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-3 w-full sm:w-7/12 text-sm">
              <label
                htmlFor="confirmPassword"
                className="text-black dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleOnChange}
                placeholder="Enter your confirm password"
                required={true}
                className="w-full mt-1 text-sm rounded border-[1.5px] border-stroke bg-transparent py-0.5 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="text-sm flex justify-center items-center gap-5">
              <button
                type="submit"
                className="flex gap-3 justify-center items-center py-1.5 px-5 text-white rounded-md bg-[#727cf5] hover:bg-primary transition-all duration-200"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default ChangePassword;
