import React from 'react'
//CSS
import './ProductOfferTag.css'

const ProductOfferTag = ({ offer }) => {
  return (
    <div className='offer_Tag'>
      <p>{offer}</p>
    </div>
  )
}

export default ProductOfferTag