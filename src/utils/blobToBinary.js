const convertBlobUrlToBlob = async (blobUrl) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return blob;
};

export const convertIntoFile = async (croppedImageUrl) => {
  const blob = await convertBlobUrlToBlob(croppedImageUrl);
  console.log("blob: ", blob);
  const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
  console.log(":file2: ", file);
  return file;
};
