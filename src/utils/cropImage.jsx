import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// import { Button, Box, Grid } from '@mui/material';
import { getCroppedImg } from './getCropedImage';
import { convertIntoFile } from './blobToBinary';
// import { Button } from '@mui/material';

const ImageCropper = ({
  setimg,
  src,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
}) => {
  const ImageRef = useRef(null);
  const [ImageSrc, setImageSrc] = useState(null);
  const [Crop, setCrop] = useState({
    unit: 'px',
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    aspect: 1,
  });
  const [CroppedImageUrl, setCroppedImageUrl] = useState(null);
  useEffect(() => {
    setCroppedImageUrl(src);
  }, [src]);
  const onSelectImage = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  const onCropComplete = useCallback((crop) => {
    makeClientCrop(ImageRef.current, crop, setCroppedImageUrl);
  }, []);

  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const makeClientCrop = useCallback(async (image, crop) => {
    if (image && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(image, crop, 'newFile.jpeg');
      const file = await convertIntoFile(croppedImageUrl);
      setCroppedImageUrl(croppedImageUrl);
    }
  }, []);
  const handleConfirmCrop = async () => {
    const file = await convertIntoFile(CroppedImageUrl);

    setimg(file);
    setImageSrc(null);
  };
  return (
    <>
      <label htmlFor="crop-image">
        <div className="relative z-20 h-10 mt-1.5 text-sm text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
          <input
            accept="image/*"
            id="crop-image"
            type="file"
            style={{ display: 'none' }}
            onChange={onSelectImage}
          />
          <p className="h-full w-full flex items-center">Upload Image</p>
          <button
            onClick={() => document.getElementById('crop-image').click()}
            style={{
              position: 'absolute',
              zIndex: '40',
              width: '100px',
              height: '40px',
              background: '#E9ECEF',
              top: '0%',
              right: '0%',
            }}
          >
            Upload
          </button>
        </div>
      </label>

      <div className="mt-2 w-full ml-0 sm:ml-5">
        <div className="w-full flex flex-col sm:flex-row items-center justify-start gap-5">
          {ImageSrc && (
            <ReactCrop
              crop={Crop}
              onComplete={onCropComplete}
              onChange={onCropChange}
              aspect={1 / 1}
              width={'100px'}
              maxWidth={maxWidth}
              maxHeight={maxHeight}
              minHeight={minHeight}
              minWidth={minWidth}
            >
              <img
                src={ImageSrc}
                ref={ImageRef}
                alt="img"
                style={{
                  width: '250px',
                  minHeight: { minHeight },
                  minWidth: { minWidth },
                  maxWidth: { maxWidth },
                  maxHeight: { maxHeight },
                }}
              />
            </ReactCrop>
          )}
          {CroppedImageUrl && (
            <img
              src={CroppedImageUrl}
              alt="Cropped"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          )}
          <div className="sm:hidden">
            {ImageSrc && (
              <div>
                <button
                  onClick={handleConfirmCrop}
                  className="ml-3 text-white justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="hidden sm:block mt-3">
          {ImageSrc && (
            <div>
              <button
                onClick={handleConfirmCrop}
                className=" text-white justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
