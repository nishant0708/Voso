import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './toggle.css';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchProducts } from '../../Redux/slicer/productSlice';
import { toggleProductFeature } from '../../Redux/slicer/productFeatureSlice';
import formatDate from '../../utils/formatDate';
// import Loader from '../../common/Loader';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import renderImage from '../../common/renderImage';
import DisplayTable from '../Skeletons/DisplayTable';

const ProductTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { products, status, error } = useSelector((state) => state.Product);
  const [hoveredButtons, setHoveredButtons] = useState({});

  //fetching product list
  useEffect(() => {
    dispatch(fetchProducts({ userId }));
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <DisplayTable />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return (
      <DefaultLayout>
        <div className="overflow-auto w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-between items-center">
            <h1 className="mb-3 text-3xl font-medium text-black dark:text-white">
              Products {products.length}
            </h1>
            <button
              onClick={() => (window.location.href = '/products')}
              className="text-white flex justify-center items-center gap-1 bg-[#727cf5] py-1 sm:py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
            >
              <FaCircleArrowLeft size={14} />
              Back
            </button>
          </div>
          <p style={{ color: 'red', fontSize: '18px', marginBottom: '20px' }}>
            No Product
          </p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="overflow-auto w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center">
          <h1 className="mb-6 text-3xl font-medium text-black dark:text-white">
            Products {products.length}
          </h1>
          <button
            onClick={() => (window.location.href = '/products')}
            className="text-white flex justify-center items-center gap-1 bg-[#727cf5] py-1 sm:py-1.5 px-3 rounded-md hover:bg-primary transition-all duration-200"
          >
            <FaCircleArrowLeft size={14} />
            Back
          </button>
        </div>
        <div className="overflow-x-auto min-h-96">
          <table
            className="dark:text-white"
            style={{
              textAlign: 'left',
              width: 'auto',
              margin: '2% 0% 0% 0%',
            }}
          >
            <colgroup>
              <col style={{ width: '400px' }} />{' '}
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
                    width: '400px',
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
                    whiteSpace: 'nowrap',
                  }}
                >
                  PRODUCT PRICE
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
              {products.map((product) => (
                <tr
                  key={product._id}
                  style={{ borderBottom: '1px solid rgb(159 157 157 / 13%)' }}
                >
                  <td
                    style={{
                      padding: '10px',
                      alignItems: 'center',
                      display: 'flex',

                      fontWeight: 'bold',
                      gap: '20px',
                      width: '400px',
                    }}
                  >
                    <a href={product.product_url}>
                      <span>
                        <img
                          style={{
                            width: '7vh',
                            height: '7vh',
                            borderRadius: '50%',
                          }}
                          alt=""
                          src={renderImage(product?.product_image)}
                        />
                      </span>
                    </a>
                    {product.product_name}
                  </td>
                  <td style={{ padding: '10px', width: '200px' }}>
                    {product.currency}
                    {product.product_price}
                  </td>
                  <td style={{ padding: '10px', width: '150px' }}>
                    <ToggleSwitch
                      isActive={product.is_featured}
                      productId={product._id}
                      userId={product.userId}
                    />
                  </td>
                  <td style={{ padding: '10px', width: '150px' }}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </td>
                  <td
                    style={{
                      padding: '10px',
                      width: '600px',
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
                      onClick={() => {
                        navigate(`/products/product_edit/${product._id}`);
                      }}
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
  const dis = useDispatch();
  const [isToggled, setIsToggled] = useState(isActive);

  const handleToggle = () => {
    dis(toggleProductFeature({ productId, userId, isActive })).then(() => {
      setIsToggled(!isToggled);
      window.location.reload();
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
        className="toggle-text"
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

export default ProductTable;
