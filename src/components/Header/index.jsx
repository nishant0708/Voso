import React, { useEffect, useState, useCallback } from 'react';
import DropdownUser from './DropdownUser';
import DarkModeSwitcher from './DarkModeSwitcher';
import { searchApi, fetchUsers } from '../../Redux/slicer/userList';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
const Header = (props) => {
  // Custom debounce function
  const debounce = (callback, delay) => {
    let timeoutId;
    return (arg) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(arg);
      }, delay);
    };
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  // Memoize the debounced function using useCallback
  const debouncedDispatch = useCallback(
    debounce((query) => {
      dispatch(searchApi({ query }));
    }, 300), // 300 ms delay
    [dispatch], // Dependencies: update if dispatch changes
  );
  // Memoize the debounced function using useCallback
  const debouncedFetchUser = useCallback(
    debounce(() => {
      dispatch(fetchUsers({ page: 1, limit: 20 }));
    }, 500), // 300 ms delay
    [dispatch], // Dependencies: update if dispatch changes
  );
  useEffect(() => {
    if (searchQuery === '') {
      debouncedFetchUser();
    }
  }, [searchQuery, debouncedFetchUser]);
  useEffect(() => {
    if (searchQuery) debouncedDispatch(searchQuery); // Call the debounced function when searchQuery changes
  }, [searchQuery, debouncedDispatch]);

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };
  const handleCloseMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSearchQuery(''); // Clear search query when closing mobile search
  };
  // Define the paths to check against
  const checkPaths = ['/users', '/blogs', '/products'];

  const isMatchingPath = checkPaths.includes(location.pathname);
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>
        {isMatchingPath ? (
          <div className=" ">
            <div className="relative border rounded-sm py-2">
              <button
                className="absolute left-1 top-1/2 -translate-y-1/2"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={handleChange}
                className=" hidden sm:block w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {window.innerWidth < 500 && isMobileSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md z-10 py-2 px-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Search</h2>
              <button onClick={handleCloseMobileSearch} className="w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  class="text-black dark:text-white"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={handleChange}
              className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
            />
          </div>
        )}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
