import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../Redux/slicer/productSlice';
const ProductTable = () => {
    const {userId}=useParams();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchProducts({userId}));
  },[])

  

  return (
    <div>hii</div>
  );
};

export default ProductTable;
