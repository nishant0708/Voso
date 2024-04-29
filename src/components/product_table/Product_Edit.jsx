import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchproductedit } from '../../Redux/slicer/productEditSlice';
import { updateProductDetails } from '../../Redux/slicer/ProductDetailsUpdatedSlicer'; // Import the updateProductDetails action
import DefaultLayout from '../../layout/DefaultLayout';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import QuillEditor from '../../utils/QuillEditor';
import { BACKEND_URL_PRODUCT } from '../../url/url';

const Product_Edit = () => {


  const dispatch = useDispatch();
  const { productId } = useParams();
  const {product, status, error } = useSelector((state) => state.Editproduct);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    dispatch(fetchproductedit({ productId }));
  }, []);

  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productUrl: '',
  });
  useEffect(() => {
    // Initialize form data with the product details after fetching
    if (product) {
      setFormData({
        productName: product.product_name,
        productPrice: product.product_price,
        productDescription: product.product_description,
        productUrl: product.product_url,
      });
    }
  }, [product]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  
  const [showAddUrl, setShowAddUrl] = useState(true);
  console.log(product);
  const [isHovered, setIsHovered] = useState(false);
  const [isbutHovered, setbutIsHovered] = useState(false);

  const renderImage = (imageUrl) => {
    
      return `${BACKEND_URL_PRODUCT}${imageUrl}`;
    
  };

  const handleGalleryUrlChange = (event) => {
    

      setGalleryUrl(event.target.value);
    
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file); // Update the selected image state
  };

  //updating details

  const handleUpdateProduct = () => {
    // Prepare data for updating product details
    const updatedProductData = {
      productId:product._id,
      productName: product.product_name,
      productPrice: product.product_price,
      productDescription: product.product_description,
      productImage: selectedImage, // Updated image file
      productUrl: product.product_url,
    };

    // Dispatch the updateProductDetails action with updatedProductData
    dispatch(updateProductDetails(updatedProductData));
  };


  return (
    <DefaultLayout>
      <div className="flex">
        <h1 className="mb-6 text-3xl font-medium text-black dark:text-white">
          Gallery Update
        </h1>
        <button
          onClick={() => (window.location.href = '')}
          style={{ position: 'absolute', right: '9%', top: '15%' }}
          className="flex text-white justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
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
            <label className='text-black dark:text-white' >Product Name</label>
            <input
              type="text"
              name="productName"
              onChange={handleInputChange}
              value={product.product_name}
              id="productname"
              className="relative z-20 h-10 mt-1.5 text-sm  dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></input>
          </div>
          <div style={{ width: '100%' }}>
            <label className='text-black dark:text-white' >Product Price</label>
            <input
              type="text"
              name="productprice"
              id="productprice"
              value={product.product_price}
              className="relative z-20 h-10 mt-1.5 text-sm  dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></input>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <p className='text-black dark:text-white'>Product Description</p>
          {/* <ReactQuill/> */}
          <QuillEditor value={product.product_description} />
        </div>
        <div
          class="lg:flex"
          style={{
            justifyContent: 'space-between',
            gap: '2%',
            marginTop: '20px',
          }}
        >
          <div style={{ position: 'relative', width: '100%',display:showAddUrl ? 'block' : 'none' }}>
            <label class='text-black dark:text-white'>
              Product Image (200 X 200 px){' '}
              <span
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <a
                  style={{
                    color: 'blue',
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
            <div style={{position:"relative",marginTop:'10px'}}>
            <div className="relative">
                <div className='flex'>
                  <input
                    type="file"
                    accept="image/*"
                    id="galleryInput" // Assign an id to the file input
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <input
                    type="text"
                    name="galleryImage"
                    id="galleryImage"
                    placeholder="Browse or input image URL"
                    value=""
                    onChange={handleGalleryUrlChange} // Handle the change event
                    className="relative z-20 h-10 mt-1.5 text-sm text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('galleryInput').click()} // Trigger click event on file input
                    style={{position:"absolute",zIndex:"40",width:"100px",height:"40px", background:"#E9ECEF",top:"2%", right:"0%"}}
                  >
                    Browse
                  </button>
                </div>
                {(selectedImage || product.product_image ) && (
                  <img
                    style={{ width: "200px", height: "200px", marginTop: "25px", transform: "translateX(20px)" }}
                    src={selectedImage ? URL.createObjectURL(selectedImage) : renderImage(product.product_image)}
                    alt="Gallery Image"
                  />
                )}
              </div>
            </div>
          </div>
          <div style={{display: showAddUrl ? 'none' : 'block',width:"100%"}}>
            <label style={{color:"black",width:"100%"}}>Product Image Url</label>
            <div style={{position:"relative"}}>
            <input  className="relative z-20 h-10 mt-1.5 text-sm  dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" value={product.product_image}></input>
            <p onMouseEnter={() => setbutIsHovered(true)}
                onMouseLeave={() => setbutIsHovered(false)}
            style={{
                  width: 'max-content',
                  border: '2px solid #727CF5',
                  color: isbutHovered ? 'white' : '#727CF5',
                  padding: '8px 15px',
                  marginLeft: '10px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  zIndex:"40",
                  position:"absolute",
                  top:"13%",
                  right:"0%",
                  backgroundColor: isbutHovered ? '#727CF5' : 'white',
                }} 
                onClick={() => setShowAddUrl((prev) => !prev)}
                >Change to upload Image</p>
         </div>
          </div>

          <div style={{ width: '100%' }}>
            <p className='text-black mt-5 lg:mt-0 dark:text-white'>Product Url(External)</p>
            <input
              style={{ margintop: '25px' }}
              type="text"
              name="productName"
              value={product.product_url}
              id="productname"
              className="relative z-20 h-10 mt-1.5 text-sm  dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></input>
          </div>
          
        </div>
        
        <button
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

export default Product_Edit;
