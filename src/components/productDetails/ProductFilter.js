// product filter feature of shop.js --> sort
import React from 'react';

const ProductFilter = ({ handleSort }) => {
  return (
    <div className='product-filter'>
      <h3>Filter by Price:</h3>
      <button onClick={() => handleSort('lowToHigh')}>Price: Low to High</button>
      <button onClick={() => handleSort('highToLow')}>Price: High to Low</button>
    </div>
  );
};

export default ProductFilter;
