import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import '../product_table/toggle.css';
import { fetchgallery } from '../../Redux/slicer/gallerySlice';
import { togglegalleryFeature } from '../../Redux/slicer/galleryfeatureSlice';
import formatDate from '../../utils/formatDate';
import Loader from '../../common/Loader';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import renderImage from '../../common/renderImage';

const GalleryTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { gallery, status, error } = useSelector((state) => state.Gallery);

  // Track hover state for each button using an object
  const [hoveredButtons, setHoveredButtons] = useState({});

  useEffect(() => {
    dispatch(fetchgallery({ userId }));
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <DefaultLayout>
      <div className=" w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white sm:px-7.5 xl:pb-1">
        <div className="px-0 sm:px-3 mb-10 flex justify-between items-center">
          <h1 className=" text-3xl font-medium text-black dark:text-white">
            Products {gallery.length}
          </h1>
          <button
            onClick={() => (window.location.href = '/products')}
            className="text-white flex justify-center items-center gap-1 bg-[#727cf5] py-1 sm:py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
          >
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>
        <div className="overflow-x-auto">
          <table
            style={{
              textAlign: 'left',
              justifyItems: 'center',
              width: 'auto',
              margin: '2% 0% 0% 0%',
            }}
          >
            <colgroup>
              <col style={{ width: '400px' }} />
              <col style={{ width: '150px' }} />
              <col style={{ width: '200px' }} />
              <col style={{ width: '350px' }} />
              <col style={{ width: '100px' }} />
            </colgroup>
            <thead>
              <tr style={{ borderBottom: '2px solid rgb(159 157 157 / 33%)' }}>
                <th
                  style={{
                    fontSize: '14px',
                    width: '400px',
                    fontWeight: '900',
                    padding: '10px',
                  }}
                >
                  PRODUCT URL
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
                    width: '200px',
                    fontWeight: '900',
                    padding: '10px',
                  }}
                >
                  ACTIVE
                </th>
                <th
                  style={{
                    fontSize: '14px',
                    width: '350px',
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
              {gallery?.map((product) => (
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
                      width: '400px',
                    }}
                  >
                    <span>
                      {' '}
                      <img
                        style={{
                          width: '7vh',
                          height: '7vh',
                          borderRadius: '50%',
                        }}
                        className="dark:text-white"
                        alt="Product"
                        src={renderImage(product?.url)}
                      />
                    </span>
                  </td>

                  <td
                    className="dark:text-white"
                    style={{ padding: '10px', width: '150px' }}
                  >
                    <p className="text-black dark:text-white">
                      {product.is_featured ? 'Yes' : 'No'}
                    </p>
                  </td>
                  <td
                    className="dark:text-white"
                    style={{ padding: '10px', width: '200px' }}
                  >
                    <ToggleSwitch
                      isActive={product.is_featured}
                      productId={product._id}
                      userId={product.userId}
                    />
                  </td>
                  <td
                    style={{
                      padding: '10px',
                      width: '350px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {formatDate(product.created_at)}
                  </td>
                  <td style={{ padding: '10px', width: '100px' }}>
                    <p
                      style={{
                        whiteSpace: 'nowrap',
                        padding: '5px 15px',
                        backgroundColor: hoveredButtons[product._id]
                          ? 'green'
                          : 'limegreen',
                        color: 'white',
                        borderRadius: '999rem',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={() =>
                        setHoveredButtons((prevState) => ({
                          ...prevState,
                          [product._id]: true,
                        }))
                      }
                      onMouseLeave={() =>
                        setHoveredButtons((prevState) => ({
                          ...prevState,
                          [product._id]: false,
                        }))
                      }
                      onClick={
                        () => navigate(`/products/Galleryedit/${product._id}`) //to be added
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
      </div>
    </DefaultLayout>
  );
};

const ToggleSwitch = ({ isActive, productId, userId }) => {
  const [isToggled, setIsToggled] = useState(isActive);
  const dis = useDispatch();
  const handleToggle = () => {
    dis(togglegalleryFeature({ productId, userId, isActive })) // Dispatch the action
      .then(() => {
        setIsToggled(!isToggled); // Update state
        window.location.reload(); // Reload the page (consider alternative approaches for UX)
      })
      .catch((error) => {
        console.error('Error toggling gallery feature:', error);
      });
  };

  return (
    <div>
      <div
        className={`toggle-switch ${isToggled ? 'active' : ''}`}
        onClick={handleToggle}
      >
        <div className="slider"></div>
      </div>
      <div
        className="toggle-text dark:text-white"
        style={{
          whiteSpace: 'nowrap',
          fontSize: '14px',
          fontWeight: 'bold',

          transform: 'translate(-5px,0px)',
        }}
      >
        {isToggled ? 'Featured' : 'Not Featured'}
      </div>
    </div>
  );
};

export default GalleryTable;
