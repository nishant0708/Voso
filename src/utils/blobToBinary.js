const convertBlobUrlToBlob = async (blobUrl) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return blob;
};

export const convertIntoFile = async (croppedImageUrl) => {
  const blob = await convertBlobUrlToBlob(croppedImageUrl);
  const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
  return file;
};
