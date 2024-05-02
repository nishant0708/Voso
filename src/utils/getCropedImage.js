export const getCroppedImg = async (image, crop, fileName) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    //console.error('Canvas context is invalid');
    return null;
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        //console.error('Canvas is empty');
        return;
      }
      blob.name = fileName;
      resolve(window.URL.createObjectURL(blob));
    }, 'image/jpeg');
  });
};
