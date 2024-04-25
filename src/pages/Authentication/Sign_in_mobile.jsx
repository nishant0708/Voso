import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP, verifyOTP } from '../../Redux/slicer/login_mobileSlice';
import voso_logo from '../../images/logo/vosovyapar_icon.png';
import mobile_logo_light from '../../images/icon/icons8-smartphone-50.png';

const Sign_in_mobile = () => {
  const [showLabel, setShowLabel] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [otp, setOTP] = useState('');
  const dispatch = useDispatch();
  const sendingOTP = useSelector((state) => state.login_mobile.sendingOTP);
  const verifyingOTP = useSelector((state) => state.login_mobile.verifyingOTP);
  const error = useSelector((state) => state.login_mobile.error);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (mobileNo.length === 10) {
      try {
        const actionResult = await dispatch(sendOTP(mobileNo));
        if (sendOTP.fulfilled.match(actionResult)) {
          setShowLabel(true);
        } else if (sendOTP.rejected.match(actionResult)) {
          const errorMessage =
            actionResult.error.message || 'Unknown error occurred.';
          alert('Error sending OTP: ' + errorMessage);
        }
      } catch (error) {
        alert('Error sending OTP: ' + error.message);
      }
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }
  };

  const handleVerify = () => {
    dispatch(verifyOTP({ mobileNo, otp }))
      .then((action) => {
        if (verifyOTP.fulfilled.match(action)) {
          // User is verified, navigate to "/"
          navigate('/');
        } else if (verifyOTP.rejected.match(action)) {
          alert('Error verifying OTP: ' + action.error.message);
        }
      })
      .catch((error) => {
        alert('Error verifying OTP: ' + error.message);
      });
  };

  const handleMobileNoChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    setMobileNo(numericValue);
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  return (
    <div className="overflow-hidden">
      <div className="h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center translate-y-[5%]">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img
                  className="w-96 hidden dark:block"
                  src={voso_logo}
                  alt="Logo"
                />
                <span className="flex justify-center items-center gap-1.5 ">
                  <img
                    className="w-20 dark:hidden"
                    src={voso_logo}
                    alt="Logo"
                  />
                  <p className="font-bold text-black text-[54px] translate-y-[10px]">
                    Voso Vyapar
                  </p>
                </span>
              </Link>
              <p className="2xl:px-20 text-[22px]">
                Welcome! Log in to your account.
              </p>
              <span className="mt-15 inline-block"></span>
            </div>
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Voso Vyapar
              </h2>
              <form>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Enter your Mobile No.
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Mobile No.*"
                      value={mobileNo}
                      onChange={handleMobileNoChange}
                      readOnly={showLabel}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute right-4 top-4">
                      <img
                        className="w-8"
                        src={mobile_logo_light}
                        alt="Mobile icon"
                      />
                    </span>
                  </div>
                </div>
                <div
                  className=""
                  style={{ display: showLabel ? 'block' : 'none' }}
                >
                  <label className="block font-medium text-black dark:text-white">
                    Verify Your OTP:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter OTP*"
                      value={otp}
                      onChange={handleOTPChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div
                  className="mb-6 text-right"
                  style={{ display: showLabel ? 'block' : 'none' }}
                >
                  <p
                    style={{
                      display: showLabel ? 'block' : 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {' '}
                    <a onClick={sendOTP} className="text-primary">
                      Resend OTP
                    </a>
                  </p>
                </div>
                <input
                  type="button"
                  onClick={handleClick}
                  value="Submit"
                  className="mb-6 w-full bg-primary hover:bg-primary-hover py-4 text-white font-bold rounded-lg transition duration-200 ease-in-out"
                  style={{ display: showLabel ? 'none' : 'block' }}
                />
                <input
                  type="button"
                  onClick={handleVerify}
                  value="Verify OTP"
                  className="mb-6 w-full bg-primary hover:bg-primary-hover py-4 text-white font-bold rounded-lg transition duration-200 ease-in-out"
                  style={{ display: showLabel ? 'block' : 'none' }}
                />
              </form>
              <Link to="/auth/signin">
                <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <span className="flex justify-center items-center gap-3">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                    Sign in with Email
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign_in_mobile;
