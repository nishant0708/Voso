// Component (ProductTable.js)

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../Redux/slicer/productSlice';
import DefaultLayout from '../../layout/DefaultLayout';

const ProductTable = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ userId }));
  }, [dispatch, userId]); // Corrected: Added userId to dependency array

  const { products, status, error } = useSelector((state) => state.Product);
  console.log(products);
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <DefaultLayout>
      <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h1 className="mb-6 text-3xl font-medium text-black dark:text-white">
          Products {products.length}
        </h1>
        <table style={{ width: '100%', margin: '5% 0% 0% 0%' }}>
          <tr>
            <th>PRODUCT NAME</th>
            <th>PRODUCT PRICE </th>
            <th>FEATURED</th>
            <th>ACTIVE</th>
            <th>CREATED AT</th>
            <th>ACTION</th>
          </tr>
          {products.map((product) => (
            <tr>
              <td>{products.product_name}</td>
              <td>{products.product_price}</td>
              <td>NA</td>
              <td>{product.is_active}</td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </table>
      </div>
    </DefaultLayout>
  );
};

export default ProductTable;
