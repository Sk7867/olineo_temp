import { useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../api/Product';

//CSS
import './CateloguePage.css'

const CataloguePage = ({ setHeaderData }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [allProducts, setAllProducts] = useState({
    no_of_products: 0,
    products: []
  })

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Catelogue',
      categoriesCond: false,
      header3Store: false,
      header3Cart: false,
      header3Profile: false,
    })
  }, []);

  useEffect(() => {
    getAllProducts()
      .then(res => {
        setAllProducts(res)
      })
  }, [])

  // console.log(allProducts);

  const validateNumber = (e) => {
    const re = /^[0-9\b]+$/;
    // if (e.target.value === '' || re.test(e.target.value)) {
    //   setPhone(e.target.value)
    // }
  }

  return (
    <div className='page_Wrapper page_Margin_Top_Secondary'>
      <div className="catelogue_Page section_Wrapper">
        <div className='catelogue_Page_Header'>
          <h4 className='catelogue_Page_Heading'>Catelogue Page</h4>
          <Link to={'/catelogue-page/add-product'} className={'button-Container'}>
            <button type='submit' className='submit-button'><p>Add Product</p></button>
          </Link>
        </div>
        <div className="catelogue_Page_List">
          {(allProducts.no_of_products > 0) && allProducts.products.map((product, index) => (
            <div className="catalogue_List_Item" key={index}>
              <div className='catalogue_List_Content'>
                {product.name && (<p>{product.name}</p>)}
                {product.price && (<p>{product.price}</p>)}
              </div>
              <div className='catalogue_List_Buttons'>
                <Link to={'/catelogue-page/add-product'} state={product = { product }} className='catalogue_Edit' >
                  Edit
                </Link>
                <div className='catalogue_Delete'>
                  Delete
                </div>
              </div>
            </div>
          ))}
        </div>
        {
          (allProducts.no_of_products === 0) && <div>Loading</div>
        }
      </div>
    </div>
  )
}

export default CataloguePage