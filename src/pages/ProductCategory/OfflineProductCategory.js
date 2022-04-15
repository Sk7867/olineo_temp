//Dependencies
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Accordion, Dropdown } from 'react-bootstrap'

//CSS
import './ProductCategory.css'

//Images
import sortOutlineBlue from '../../assets/vector/sort_outline_blue.svg'
import filterOutlineBlue from '../../assets/vector/filter_outline_blue.svg'
import product1 from '../../assets/png/product_1.png'
import closeOutlineGrey from '../../assets/vector/close_outline_grey.svg'
import sortOutlineGrey from '../../assets/vector/sort_outline_grey.svg'

//Components
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import ProductListItem from '../../components/ProductListItem/ProductListItem'
import FilterTag from '../../components/FilterTag/FilterTag'


const OfflineProductCategory = ({ setHeaderData }) => {
  const [bottomSheet, setBottomSheet] = useState(false)
  const matches = useMediaQuery("(min-width:768px)")
  const [offlineOffersSelected, setOfflineOffersSelected] = useState(true)
  // const [priceSortSelected, setPriceSortSelected] = useState(0)
  // const [radioFilterSelected, setRadioFilterSelected] = useState({})
  // const [priceFilter, setPriceFilter] = useState(-1)
  // const [checkboxFilter, setCheckboxFilter] = useState({})
  const [filterSelected, setFilterSelected] = useState([])
  // console.log(filterSelected)
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Republic Day Sale',
      categoriesCond: true,
      header3Store: false,
      header3Cart: true,
      header3Profile: true,
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

  const filterListData = [
    {
      filter_heading: 'Price',
      filter_type: 'Radio',
      filter_data: [
        {
          data: '₹2000-Below'
        },
        {
          data: '₹2001-₹3999'
        },
        {
          data: '₹4000-₹6999'
        },
      ],
    },
    {
      filter_heading: 'Brand',
      filter_type: 'Checkbox',
      filter_data: [
        {
          data: 'Apple'
        },
        {
          data: 'One Plus'
        },
        {
          data: 'Samsung'
        },
      ],
    },
    {
      filter_heading: 'Category',
      filter_type: 'Checkbox',
      filter_data: [
        {
          data: 'Smartphone'
        },
        {
          data: 'Flip'
        },
        {
          data: 'Fold'
        },
      ],
    },
    {
      filter_heading: 'Offer type',
      filter_type: 'Radio',
      filter_data: [
        {
          data: '50%'
        },
        {
          data: '30%'
        },
        {
          data: '20%'
        },
      ],
    },
  ]

  return (
    <>
      <div className='page_Wrapper page_Margin_Top'>
        <BreadCrumbs data={breadCrumbsData} />
        {
          matches ? (
            <div className='filter_Sort_Header'>
              <div className='filter_Section_Header'>
                <FilterTag filterSelected={filterSelected} setFilterSelected={setFilterSelected} />
              </div>
              <div className='offers_Sort_Header'>
                <div className='offers_Toggle_Header'>
                  <div className="offers_Toggle_Container">
                    <p className={`${offlineOffersSelected ? 'offer_Selected' : ''}`} onClick={() => setOfflineOffersSelected(true)}>Offline Offers</p>
                    <p className={`${offlineOffersSelected ? '' : 'offer_Selected'}`} onClick={() => setOfflineOffersSelected(false)}>Online Offers</p>
                  </div>
                </div>
                <div className="sort_Section_Header">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className="sort_Container">
                        <span>Sort by:</span>
                        <p>Price Low to High</p>
                        <img src={sortOutlineGrey} alt="" />
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Price Low to High</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Price High to Low</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Remove</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          ) : ('')
        }
        {
          !matches ? (<>
            <div className='tab_None header_Sort_Container combined_Button_Container'>
              <div className='header_Sort_Button combined_Button_One' onClick={() => setBottomSheet(true)}>
                <img src={sortOutlineBlue} alt="" />
                <p>Sort</p>
              </div>
              <Link to={'/category1/filter'} state={filterListData} className='header_Filter_Button combined_Button_Two'>
                <img src={filterOutlineBlue} alt="" />
                <p>Filter</p>
              </Link>
            </div>
            <div className='offers_Toggle_Header'>
              <div className="offers_Toggle_Container">
                <p className={`${offlineOffersSelected ? 'offer_Selected' : ''}`} onClick={() => setOfflineOffersSelected(true)}>Offline Offers</p>
                <p className={`${offlineOffersSelected ? '' : 'offer_Selected'}`} onClick={() => setOfflineOffersSelected(false)}>Online Offers</p>
              </div>
            </div>
          </>) : ('')
        }
        <div className='desk_Page_Wrapper'>
          <aside className="side_Section section_Wrapper pb-0">
            <p className="side_Section_Heading m-0">
              Filters
            </p>
            <div className="side_Section_Body">
              <Accordion defaultActiveKey={['0']} alwaysOpen>
                {
                  filterListData.map((filter, index) => (
                    <Accordion.Item eventKey={`${index}`} key={index}>
                      <Accordion.Header>{filter.filter_heading}</Accordion.Header>
                      <Accordion.Body>
                        {
                          filter.filter_type === 'Radio' ? (
                            <>
                              {
                                filter.filter_data.map((element, index) => (
                                  <label htmlFor={element.data} key={index} className={`radiobtn-label payment_Methods_Labels`} onClick={() => setFilterSelected([...filterSelected, element])} >
                                    <input type="radio" name={`filter-${filter.filter_heading}`} id={element.data} value={element.data} />
                                    <span className="radio-custom"></span>{element.data}
                                  </label>
                                ))
                              }
                            </>
                          ) : (
                            filter.filter_type === 'Checkbox' ? (
                              <>
                                {
                                  filter.filter_data.map((element, index) => (
                                    <label htmlFor={element.data} key={index} className="checkbox-label checkbox-item d-flex align-items-center" onClick={() => setFilterSelected([...filterSelected, element])} >
                                      <input type="checkbox" name={`filter-${filter.filter_heading}`} id={element.data} value={element.data} />
                                      <span className="custom-checkmark"></span>
                                      {element.data}
                                    </label>
                                  ))
                                }
                              </>
                            ) : ('')
                          )
                        }
                      </Accordion.Body>
                    </Accordion.Item>
                  ))
                }
              </Accordion>
            </div>
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
                <label htmlFor={`price-low-high`} className={`radiobtn-label price_Sort_Labels `} >
                  <input type="radio" name='price' id={`price`} value={`price-low-high`} />
                  <span className="radio-custom"></span>{`Price Low to High`}
                </label>
                <label htmlFor={`price-high-low`} className={`radiobtn-label price_Sort_Labels `} >
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

export default OfflineProductCategory