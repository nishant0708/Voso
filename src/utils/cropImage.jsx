import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button, Box, Grid } from '@mui/material';
import { getCroppedImg } from './getCropedImage';

const ImageCropper = ({ src, setImageUrlSetter, maxHeight, maxWidth, minHeight, minWidth }) => {
  const ImageRef = useRef(null);
  const [ImageSrc, setImageSrc] = useState(null);
  const [Crop, setCrop] = useState({
    unit: 'px',
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    aspect: 1
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

  const makeClientCrop = useCallback(async (image, crop, setImageUrlSetter) => {
    if (image && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(image, crop, 'newFile.jpeg');
      setImageUrlSetter(croppedImageUrl);
      setCroppedImageUrl(croppedImageUrl);
    }
  }, []);
  const handleConfirmCrop = () => {
    setImageUrlSetter(CroppedImageUrl);
    setImageSrc(null);
  };
  return (
    <>
      <label htmlFor="crop-image">
        <div
          style={{
            padding: '5px 10px',
            border: '1px solid gray',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <input accept="image/*" id="crop-image" type="file" style={{ display: 'none' }} onChange={onSelectImage} />
          <p>Upload Image</p>
          <Button component="span" variant="contained" style={{ color: 'white', background: '#673ab7' }}>
            Upload
          </Button>
        </div>
        .
      </label>

      <Box mt={2}>
        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '50px' }}>
          {ImageSrc && (
            <ReactCrop
              crop={Crop}
              onComplete={onCropComplete}
              onChange={onCropChange}
              aspect={1 / 1}
              maxWidth={maxWidth}
              maxHeight={maxHeight}
              minHeight={minHeight}
              minWidth={minWidth}
            >
              <img src={ImageSrc} ref={ImageRef} alt="" style={{ width: '400px', maxWidth: '100%' }} />
            </ReactCrop>
          )}
          {CroppedImageUrl && <img src={CroppedImageUrl} alt="Cropped" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
        </Grid>
        {ImageSrc && (
          <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleConfirmCrop}>
              Confirm
            </Button>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default ImageCropper;
