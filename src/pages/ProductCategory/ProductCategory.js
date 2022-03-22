//Dependencies
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'

//CSS
import './ProductCategory.css'

//Images
import sortOutlineBlue from '../../assets/vector/sort_outline_blue.svg'
import filterOutlineBlue from '../../assets/vector/filter_outline_blue.svg'
import product1 from '../../assets/png/product_1.png'
import closeOutlineGrey from '../../assets/vector/close_outline_grey.svg'

//Components
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import ProductListItem from '../../components/ProductListItem/ProductListItem'


const ProductCategory = ({ setHeaderData }) => {
  const [bottomSheet, setBottomSheet] = useState(false)
  const matches = useMediaQuery("(min-width:768px)")
  const [priceSortSelected, setPriceSortSelected] = useState(0)
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Republic Day Sale',
      categoriesCond: true,
    })
  }, []);

  const breadCrumbsData = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'Sale',
      url: ''
    },
  ]

  const products = [
    {
      product_Image: product1,
      product_Name: 'JBL C100SI In Ear Wired Earphones with Mic',
      product_Offer: 'Online Offer',
      product_Discount_Price: '600',
      product_Original_Price: '1000',
      product_Discount_End: '10h 48m 40s'
    },
    {
      product_Image: product1,
      product_Name: 'JBL C100SI In Ear Wired Earphones with Mic',
      product_Offer: '40% off',
      product_Discount_Price: '600',
      product_Original_Price: '1000',
      product_Discount_End: '10h 48m 40s'
    },
    {
      product_Image: product1,
      product_Name: 'JBL C100SI In Ear Wired Earphones with Mic',
      product_Offer: 'Online Offer',
      product_Discount_Price: '600',
      product_Original_Price: '1000',
      product_Discount_End: '10h 48m 40s'
    },
    {
      product_Image: product1,
      product_Name: 'JBL C100SI In Ear Wired Earphones with Mic',
      product_Offer: '40% off',
      product_Discount_Price: '600',
      product_Original_Price: '1000',
      product_Discount_End: '10h 48m 40s'
    },
    {
      product_Image: product1,
      product_Name: 'JBL C100SI In Ear Wired Earphones with Mic',
      product_Offer: 'Online Offer',
      product_Discount_Price: '600',
      product_Original_Price: '1000',
      product_Discount_End: '10h 48m 40s'
    },
    {
      product_Image: product1,
      product_Name: 'JBL C100SI In Ear Wired Earphones with Mic',
      product_Offer: 'Online Offer',
      product_Discount_Price: '600',
      product_Original_Price: '1000',
      product_Discount_End: '10h 48m 40s'
    },
    {
      product_Image: product1,
      product_Name: 'JBL C100SI In Ear Wired Earphones with Mic',
      product_Offer: 'Online Offer',
      product_Discount_Price: '600',
      product_Original_Price: '1000',
      product_Discount_End: '10h 48m 40s'
    },
    {
      product_Image: product1,
      product_Name: 'JBL C100SI In Ear Wired Earphones with Mic',
      product_Offer: 'Online Offer',
      product_Discount_Price: '600',
      product_Original_Price: '1000',
      product_Discount_End: '10h 48m 40s'
    },
  ]

  return (
    <>
      <div className='page_Wrapper page_Margin_Top'>
        <BreadCrumbs data={breadCrumbsData} />
        {
          !matches ? (<>
            <div className='tab_None header_Sort_Container combined_Button_Container'>
              <div className='header_Sort_Button combined_Button_One' onClick={() => setBottomSheet(true)}>
                <img src={sortOutlineBlue} alt="" />
                <p>Sort</p>
              </div>
              <div className='header_Filter_Button combined_Button_Two'>
                <img src={filterOutlineBlue} alt="" />
                <p>Filter</p>
              </div>
            </div>
          </>) : ('')
        }
        <div className='desk_Page_Wrapper'>
          <aside className="side_Section section_Wrapper" style={{ maxHeight: '150px' }}>
            <p className="side_Section_Heading">
              Filters
            </p>
            <label htmlFor={`On the way`} className="checkbox-label checkbox-item d-flex align-items-center side_Section_Checkbox">
              <input type="checkbox" name="On the way" id={`On the way`} />
              <span className="custom-checkmark"></span>
              On the way
            </label>
            <label htmlFor={`Delivered`} className="checkbox-label checkbox-item d-flex align-items-center side_Section_Checkbox" >
              <input type="checkbox" name="Delivered" id={`Delivered`} />
              <span className="custom-checkmark"></span>
              Delivered
            </label>
          </aside>
          <div className='order_Page_Right'>
            <div className="Product_Category_Container">
              {
                products.map((product, index) => (
                  <ProductListItem key={index} product={product} />
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {
        !matches ? (
          <>
            <div className={`bottom_Sheet_Backdrop ${bottomSheet ? 'active' : ('')}`} onClick={() => setBottomSheet(false)}> </div>
            <div className={`bottom_Sheet ${bottomSheet ? 'active' : ''}`}>
              <div className="bottom_Sheet_Header">
                <p className="bottom_Sheet_Heading">Sort by</p>
                <img src={closeOutlineGrey} className='bottom_Sheet_Close_Btn' alt="" onClick={() => setBottomSheet(false)} />
              </div>
              <div className="bottom_Sheet_Body">
                <label htmlFor={`price-low-high`} className={`radiobtn-label price_Sort_Labels `} onClick={() => setPriceSortSelected(1)} >
                  <input type="radio" name='price' id={`price`} value={`price-low-high`} />
                  <span className="radio-custom"></span>{`Price Low to High`}
                </label>
                <label htmlFor={`price-high-low`} className={`radiobtn-label price_Sort_Labels `} onClick={() => setPriceSortSelected(2)} >
                  <input type="radio" name='price' id={`price`} value={`price-high-low`} />
                  <span className="radio-custom"></span>{`Price High to Low`}
                </label>
              </div>
            </div>

          </>
        ) : ('')
      }

    </>
  )
}

export default ProductCategory