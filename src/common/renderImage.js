import { BACKEND_URL_PRODUCT } from '../url/url';

const renderImage = (imageUrl) => {
  if (imageUrl?.startsWith('https://')) {
    return imageUrl;
  } else {
    return `${BACKEND_URL_PRODUCT}${imageUrl}`;
  }
};

export default renderImage;
