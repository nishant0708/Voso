import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchgalleryedit } from '../../Redux/slicer/galleryeditSlice';
import { updateGalleryUrl } from '../../Redux/slicer/updateGallerySlice';
import ImageCropper from '../../utils/cropImage';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import renderImage from '../../common/renderImage';

const GalleryEdit = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { gallery } = useSelector((state) => state.Editgallery);
  const [selectedOption, setSelectedOption] = useState(gallery.itemType);
  const [galleryUrl, setGalleryUrl] = useState(gallery.url || '');
  const [imgcrop, setimgcrop] = useState('');

  useEffect(() => {
    dispatch(fetchgalleryedit({ productId }));
  }, [dispatch, productId]);


  // Set the initial selected option once the gallery is loaded
  useEffect(() => {
    setSelectedOption(gallery.itemType);
    setGalleryUrl(gallery.url || '');
  }, [gallery]);

  const setimg = useCallback((file) => {
    setimgcrop(file);
  }, []);

  // Function to handle option change
  const handleOptionChange = useCallback((event) => {
    setSelectedOption(event.target.value);
  }, []);

  // Function to handle gallery URL change
  const handleGalleryUrlChange = useCallback(
    (event) => {
      if (selectedOption === 'youtube') {
        // If the selected option is 'youtube', set galleryUrl to the input value
        setGalleryUrl(event.target.value);
      } else {
        // For other options, update the gallery URL state normally
        setGalleryUrl(event.target.value);
      }
    },
    [selectedOption],
  );

  // Function to handle update button click
  const handleUpdateClick = useCallback(() => {
    // Prepare the data payload for the updateGalleryUrl action
    const data = {
      url: imgcrop,
      itemType: selectedOption,
      id: productId,
    };
    // Dispatch the updateGalleryUrl action with the data payload
    dispatch(updateGalleryUrl(data))
      .then(() => {
       toast('Operation Successful');
        window.location.href = `/products/Gallery/${gallery.userId}`;
      })
      .catch((error) => {
       toast(`Error updating product: ${error.message}`);
      });
  }, [dispatch, imgcrop, selectedOption, productId, gallery]);

  return (
    <DefaultLayout>
      <div className="px-0 sm:px-3 mb-10 flex justify-between items-center">
        <h1 className=" text-3xl font-medium text-black dark:text-white">
          Gallery Update
        </h1>
        <button
          onClick={() =>
            (window.location.href = `/products/Gallery/${gallery.userId}`)
          }
          className="text-white flex justify-center items-center gap-1 bg-[#727cf5] py-1 sm:py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
        >
          <FaCircleArrowLeft size={14} />
          Back
        </button>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
        <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
          <div className="w-full md:w-1/2">
            <label className="text-sm text-black dark:text-white">Type</label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                name="type"
                id="type"
                value={selectedOption}
                onChange={handleOptionChange}
                required={true}
                className="relative z-20 t-[20px] h-10 mt-1.5  text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="image">Image</option>
                <option value="image_link">Image Link</option>
                <option value="youtube">Youtube</option>
              </select>
              <span className="absolute top-[60%] right-4 z-30 -translate-y-1/2">
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
          {/* Conditionally render label and input based on selected option */}
          {selectedOption === 'image' && (
            <div className="w-full md:w-1/2">
              <label className="text-sm text-black dark:text-white">
                Gallery Image (200x200 px)
              </label>
              <div className="relative">
                <div style={{ position: 'relative' }}>
                  <ImageCropper
                    setimg={setimg}
                    src={renderImage(galleryUrl)}
                    maxHeight={300}
                    maxWidth={300}
                    minHeight={50}
                    minWidth={50}
                  />
                </div>
              </div>
            </div>
          )}
          {selectedOption === 'image_link' && (
            <div className="w-full md:w-1/2">
              <label className="text-sm text-black dark:text-white">
                Product Image Url
              </label>
              <input
                type="text"
                name="productUrl"
                value={galleryUrl}
                onChange={handleGalleryUrlChange} // Handle the change event
                id="productUrl"
                placeholder="Add image link"
                className="relative z-20 h-10 mt-1.5 text-sm text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          )}
          {selectedOption === 'youtube' && (
            <div className="w-full md:w-1/2">
              <label className="text-sm text-black dark:text-white">
                Youtube Link
              </label>
              <input
                type="text"
                name="youtubeLink"
                value={galleryUrl}
                onChange={handleGalleryUrlChange} // Handle the change event
                id="youtubeLink"
                placeholder="Add Youtube link"
                className="relative z-20 h-10 mt-1.5 text-sm text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          )}
        </div>
        <button
          onClick={handleUpdateClick}
          style={{ position: 'relative' }}
          className="w-[100%] text-white justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
        >
          Update
        </button>
      </div>
    </DefaultLayout>
  );
};

export default GalleryEdit;
