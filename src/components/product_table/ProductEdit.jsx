import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchproductedit } from '../../Redux/slicer/productEditSlice';
import { updateProductDetails } from '../../Redux/slicer/ProductDetailsUpdatedSlicer';
import DefaultLayout from '../../layout/DefaultLayout';
import { BACKEND_URL_PRODUCT } from '../../url/url';
import QuillEditor from '../../utils/QuillEditor';
import ImageCropper from '../../utils/cropImage';
import { FaCircleArrowLeft } from 'react-icons/fa6';

const ProductEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { product } = useSelector((state) => state.Editproduct);
  const { isLoading } = useSelector((state) => state.updateProdct);

  const [imageUrl, setimageUrl] = useState('');
  const [imgcrop, setimgcrop] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [showAddUrl, setShowAddUrl] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isbutHovered, setbutIsHovered] = useState(false);

  useEffect(() => {
    dispatch(fetchproductedit({ productId }));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setProductName(product.product_name);
      setProductPrice(product.product_price);
      setProductDescription(product.product_description);
      setimageUrl(product.product_image);
      setProductUrl(product.product_url);
    }
  }, [product]);

  const setimg = useCallback((file) => {
    setimgcrop(file);
  }, []);

  const renderImage = useCallback((imageUrl) => {
    if (imageUrl?.startsWith('https://')) {
      return imageUrl;
    } else {
      return `${BACKEND_URL_PRODUCT}${imageUrl}`;
    }
  }, []);

  //updating details
  const handleUpdateProduct = useCallback(() => {
    const updatedProductData = {
      productId: product._id,
      productName: productName,
      productPrice: productPrice,
      productDescription: productDescription,
      productImage: showAddUrl === true ? imgcrop : imageUrl,
      productUrl: productUrl,
    };

    dispatch(updateProductDetails(updatedProductData))
      .then(() => {
       toast('Operation Successful');
        navigate('/products');
      })
      .catch((error) => {
       toast(`Error updating product: ${error.message}`);
      });
  }, [
    dispatch,
    navigate,
    product,
    productName,
    productPrice,
    productDescription,
    showAddUrl,
    imgcrop,
    imageUrl,
    productUrl,
  ]);

  return (
    <DefaultLayout>
      <div className="px-0 sm:px-3 mb-10 flex justify-between items-center">
        <h1 className="mb-1 text-3xl font-medium text-black dark:text-white">
          Product Edit
        </h1>
        <button
          onClick={() =>
            (window.location.href = `/products/product_list/${product.userId}`)
          }
          className="text-white flex justify-center items-center gap-1 bg-[#727cf5] py-1 sm:py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
        >
          <FaCircleArrowLeft size={14} />
          Back
        </button>
      </div>
      <div
        style={{ overflowX: 'auto' }}
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '2%',
            marginBottom: '20px',
          }}
        >
          <div style={{ width: '100%' }}>
            <label className="text-black dark:text-white">Product Name</label>
            <input
              type="text"
              name="productName"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              id="productname"
              className="relative z-20 h-10 mt-1.5 text-sm  dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></input>
          </div>
          <div style={{ width: '100%' }}>
            <label className="text-black dark:text-white">Product Price</label>
            <input
              type="text"
              name="productprice"
              id="productprice"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
              className="relative z-20 h-10 mt-1.5 text-sm  dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></input>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <p className="text-black dark:text-white">Product Description</p>
          {/* <ReactQuill/> */}
          <QuillEditor
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div
          className="lg:flex"
          style={{
            justifyContent: 'space-between',
            gap: '2%',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: showAddUrl ? 'block' : 'none',
            }}
          >
            <label className="text-black dark:text-white leading-[28px]">
              Product Image (200 X 200 px){' '}
              <span
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <a
                  href="https://www.remove.bg/"
                  target="blank"
                  className="text-meta-5 dark:lightblue"
                  style={{
                    cursor: 'pointer',

                    textDecoration: isHovered ? 'underline' : 'none',
                  }}
                >
                  Click Here to remove Background
                </a>
              </span>
              <span
                onMouseEnter={() => setbutIsHovered(true)}
                onMouseLeave={() => setbutIsHovered(false)}
                style={{
                  width: 'max-content',
                  border: '2px solid #727CF5',
                  color: isbutHovered ? 'white' : '#727CF5',
                  padding: '5px 15px',
                  marginLeft: '10px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  backgroundColor: isbutHovered ? '#727CF5' : 'white',
                }}
                onClick={() => setShowAddUrl((prev) => !prev)}
              >
                Add url
              </span>
            </label>
            <div style={{ position: 'relative', marginTop: '10px' }}>
              <ImageCropper
                setimg={setimg}
                src={renderImage(product.product_image)}
                maxHeight={300}
                maxWidth={300}
                minHeight={50}
                minWidth={50}
              />
            </div>
          </div>
          <div
            style={{ display: showAddUrl ? 'none' : 'block', width: '100%' }}
          >
            <label style={{ color: 'black', width: '100%' }}>
              Product Image Url
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="relative z-20 h-10 mt-1.5 text-sm  dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                value={imageUrl}
                onChange={(e) => setimageUrl(e.target.value)}
              ></input>
              <p
                onMouseEnter={() => setbutIsHovered(true)}
                onMouseLeave={() => setbutIsHovered(false)}
                className="w-fit text-sm py-2 px-3 cursor-pointer sm:ml-[10px] whitespace-nowrap z-40 sm:absolute top-[14%] right-[0%]  border rounded-md border-[#727CF5] text-[#727CF5] bg-white hover:text-white hover:bg-[#727CF5]"
               
                onClick={() => setShowAddUrl((prev) => !prev)}
              >
                Change to upload Image
              </p>
            </div>
          </div>

          <div style={{ width: '100%' }}>
            <p className="text-black mt-5 lg:mt-0 dark:text-white">
              Product Url(External)
            </p>
            <input
              style={{ margintop: '25px' }}
              type="text"
              name="productName"
              onChange={(e) => setProductUrl(e.target.value)}
              value={productUrl}
              id="productname"
              className="relative z-20 h-10 mt-1.5 text-sm  dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></input>
          </div>
        </div>

        <button
          disabled={isLoading}
          style={{ position: 'relative' }}
          onClick={handleUpdateProduct}
          className="mt-[20px] w-[100%] text-white justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
        >
          Update
        </button>
      </div>
    </DefaultLayout>
  );
};

export default ProductEdit;
