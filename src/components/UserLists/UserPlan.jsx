import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../../layout/DefaultLayout';
import { updateUserPlan } from '../../Redux/slicer/updateDetailsSlice';
import { fetchUserDetails } from '../../Redux/slicer/userDetails';
import { FaListUl } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import { FaStopCircle } from 'react-icons/fa';

const UserPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user } = useSelector((state) => state.userDetails);
  const { isLoading } = useSelector((state) => state.updateDetails);
  const [plan, setPlan] = useState('');

  useEffect(() => {
    dispatch(fetchUserDetails({ userId }));
  }, [dispatch, userId]);

  const handleOnChange = useCallback((e) => {
    setPlan(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUserPlan({ email: user?.email, plan }));
    },
    [dispatch, plan, user],
  );

  const resetForm = useCallback(() => {
    setPlan('');
  }, []);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap-reverse gap-3 justify-between">
          <h1 className="text-base sm:text-2xl font-semibold text-black dark:text-white">
            User Plan Purchase - {user?.email}
          </h1>
          <div className="flex justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex gap-3 justify-center items-center py-1 sm:py-1.5 px-3 text-white rounded-md bg-[#727cf5] hover:bg-primary transition-all duration-200"
            >
              <FaListUl />
              <span>List</span>
            </button>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
            <div className="p-5.5 pb-5">
              <div className="w-full xl:w-1/2 text-sm">
                <label
                  htmlFor="activePlan"
                  className="text-black dark:text-white"
                >
                  {' '}
                  Plan Id <span className="text-meta-1">*</span>
                </label>

                <div className="mt-1 relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={plan}
                    name="activePlan"
                    id="activePlan"
                    onChange={handleOnChange}
                    required={true}
                    className="relative z-20 text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option
                      value=""
                      disabled
                      className="text-body dark:text-bodydark"
                    >
                      -- Select --
                    </option>
                    <option
                      value="Yearly"
                      className="text-body dark:text-bodydark"
                    >
                      Yearly
                    </option>
                    <option
                      value="Half-Yearly"
                      className="text-body dark:text-bodydark"
                    >
                      Half Yearly
                    </option>
                    <option
                      value="Quaterly"
                      className="text-body dark:text-bodydark"
                    >
                      Quaterly
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

              <div className="mt-8 text-sm flex justify-center items-center gap-5">
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

export default UserPlan;
