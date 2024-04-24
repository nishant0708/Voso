import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { fetchgallery } from '../../Redux/slicer/gallerySlice';
import DefaultLayout from '../../layout/DefaultLayout';
import "../product_table/toggle.css"
import { BACKEND_URL_PRODUCT } from '../../url/url';

const Gallery_table = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Track hover state for each button using an object
  const [hoveredButtons, setHoveredButtons] = useState({});

  const renderImage = (imageUrl) => {
    if (imageUrl.startsWith('https://')) {
      return imageUrl;
    } else {
      return `${BACKEND_URL_PRODUCT}${imageUrl}`;
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    dispatch(fetchgallery({ userId }));
  }, [dispatch, userId]);

  const { gallery, status, error } = useSelector((state) => state.Gallery);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <DefaultLayout>
      <div className="overflow-auto w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center">
          <h1 className="mb-6 text-3xl font-medium text-black dark:text-white">
            Products {gallery.length}
          </h1>
          <button onClick={() => window.location.href = '/products'} style={{ position: "absolute", right: "9%", top: "20%" }} className="flex text-white justify-center items-center gap-1 bg-[#727cf5] py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200">
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>
        <table
          style={{
            textAlign: 'left',
            width: 'auto',
            margin: '2% 0% 0% 0%',
            // Separate borders
          }}
        >
          <colgroup>
            <col style={{ width: '200px' }} />
            <col style={{ width: '200px' }} />
            <col style={{ width: '150px' }} />
            <col style={{ width: '150px' }} />
            <col style={{ width: '300px' }} />
            <col style={{ width: '100px' }} />
          </colgroup>
          <thead>
            <tr style={{ borderBottom: '2px solid rgb(159 157 157 / 33%)' }}>
              <th
                style={{
                  fontSize: '14px',
                  width: '200px',
                  fontWeight: '900',
                  padding: '10px',
                }}
              >
                PRODUCT NAME
              </th>
              <th
                style={{
                  fontSize: '14px',
                  width: '200px',
                  fontWeight: '900',
                  padding: '10px',
                }}
              >
                PRODUCT IMAGE
              </th>
              <th
                style={{
                  fontSize: '14px',
                  width: '150px',
                  fontWeight: '900',
                  padding: '10px',
                }}
              >
                FEATURED
              </th>
              <th
                style={{
                  fontSize: '14px',
                  width: '150px',
                  fontWeight: '900',
                  padding: '10px',
                }}
              >
                ACTIVE
              </th>
              <th
                style={{
                  fontSize: '14px',
                  width: '300px',
                  fontWeight: '900',
                  padding: '10px',
                }}
              >
                CREATED AT
              </th>
              <th
                style={{
                  fontSize: '14px',
                  width: '100px',
                  fontWeight: '900',
                  padding: '10px',
                }}
              >
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {gallery.map((product) => (
              <tr
                key={product.id}
                style={{ borderBottom: '1px solid rgb(159 157 157 / 13%)' }}
              >
                <td
                  style={{
                    padding: '10px',
                    alignItems: 'center',
                    display: 'flex',
                    color: '#000',
                    fontWeight: 'bold',
                    gap: '20px',
                    width: '300px',
                  }}
                >
                  <span>
                    <img
                      style={{
                        width: '7vh',
                        height: '7vh',
                        borderRadius: '50%',
                      }}
                      alt='Product'
                      src={renderImage(product?.url)}
                    />
                  </span>
                  {product.product_name}
                </td>
                <td style={{ padding: '10px', width: '200px' }}>
                  {product.product_image}
                </td>
                <td style={{ padding: '10px', width: '150px' }}>
                  {product.is_featured ? 'Yes' : 'No'}
                </td>
                <td style={{ padding: '10px', width: '150px' }}>
                  {product.is_active ? 'Active' : 'Inactive'}
                </td>
                <td style={{ padding: '10px', width: '300px', whiteSpace: 'nowrap' }}>
                  {formatDate(product.created_at)}
                </td>
                <td style={{ padding: '10px', width: '100px' }}>
                  <p
                    style={{
                      whiteSpace: 'nowrap',
                      padding: '5px 15px',
                      backgroundColor: hoveredButtons[product._id] ? 'green' : 'limegreen',
                      color: 'white',
                      borderRadius: '999rem',
                      cursor:"pointer"
                    }}
                    onMouseEnter={() => setHoveredButtons(prevState => ({ ...prevState, [product._id]: true }))}
                    onMouseLeave={() => setHoveredButtons(prevState => ({ ...prevState, [product._id]: false }))}
                    onClick={() =>
                      navigate(`/products/Galleryedit/${product._id}`)//to be added
                    }
                  >
                    Product Edit
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default Gallery_table;
