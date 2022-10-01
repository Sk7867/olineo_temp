//Dependencies
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Accordion, Dropdown } from 'react-bootstrap'
import { UserDataContext } from "../../Contexts/UserContext";
import { toast } from "react-toastify";

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
import { addProductInterested, getSearchedProduct } from '../../api/Product';
import SkeletonElement from "../../components/Skeletons/SkeletonElement";
import Pagination from '../../components/Pagination/Pagination';
import { getStoreInventory } from '../../api/StoreApi';

toast.configure();
const OfflineProductCategory = ({ setHeaderData }) => {
  const [bottomSheet, setBottomSheet] = useState(false)
  const matches = useMediaQuery("(min-width:768px)")
  const [offlineOffersSelected, setOfflineOffersSelected] = useState(true)
  const nav = useNavigate();
  const urlParams = useParams()
  const loc = useLocation()
  // const [priceSortSelected, setPriceSortSelected] = useState(0)
  // const [radioFilterSelected, setRadioFilterSelected] = useState({})
  // const [priceFilter, setPriceFilter] = useState(-1)
  // const [checkboxFilter, setCheckboxFilter] = useState({})
  const [filterSelected, setFilterSelected] = useState([])
  const { searchedProduct, setSearchedProduct, userContext } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);
  const [storeCode, setStoreCode] = useState('')
  const [storeDetails, setStoreDetails] = useState({})
  const productsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(1)
  const [interestedButton, setInterestedButton] = useState(true)

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

  useEffect(() => {
    if (urlParams && urlParams.id) {
      setStoreCode(urlParams.id)
    }
  }, [urlParams])

  useEffect(() => {
    if (loc && loc.state) {
      setStoreDetails(loc.state)
    }
  }, [loc])


  useEffect(() => {
    if (storeCode) {
      getStoreInventory(storeCode)
        .then(res => res ? (
          setSearchedProduct(
            {
              loaded: true,
              products: res.inventoryData,
              no_of_products: res.no_of_products
            }
          ),
          setTotalProducts(res.total_products)
        ) : (''))
    }
  }, [storeCode])


  const handleAll = (resp) => {
    if (filterSelected?.some(res => res.type === resp.type)) {
      for (var i = 0; i < filterSelected?.length; i++) {
        if (filterSelected[i]?.type === resp.type && filterSelected[i]?.data !== resp.data) {
          filterSelected?.splice(i, 1);
          i--;
        }
      }
    }
    else {
      filterSelected.push(resp)
    }
    setFilterSelected([...filterSelected], [filterSelected]);
  }
  const handleAll2 = (resp) => {
    if (filterSelected?.some(res => res.data === resp.data)) {
      for (var i = 0; i < filterSelected?.length; i++) {
        if (filterSelected[i]?.data === resp.data) {
          filterSelected?.splice(i, 1);
          i--;
        }
      }
      console.log(true);
    }
    else {
      filterSelected.push(resp)
    }
    setFilterSelected([...filterSelected], [filterSelected]);
  }
  const handleDeletFilter = (e) => {
    if (filterSelected?.some(res => res.data === e.data)) {
      for (var i = 0; i < filterSelected?.length; i++) {
        if (filterSelected[i]?.data === e.data) {
          filterSelected?.splice(i, 1);
          i--;
        }
      }
      console.log(true);
    }
    else {
      filterSelected.push(e)
    }
    setFilterSelected([...filterSelected], [filterSelected]);
  }

  React.useEffect(() => {
    if (filterSelected.length > 0) {
      const params = new URLSearchParams();
      params.append('limit', productsPerPage)
      params.append('page', currentPage)
      filterSelected.forEach(value => {
        if (value.type === 'price') {
          params.append(`${value.searchQ}`, value.Qdata);
          params.append(`${value?.searchQ2}`, value?.Qdata2);
        }
        if (value.type === 'brand') {
          params.append('brand', value.data);
        }
        if (value.type === 'Category') {
          params.append('hierarchyL2', value.data);
        }
        if (value.type === 'Offer') {
          params.append('discount.flatDiscount.value[gte]', value.Qdata);
        }
      });
      getSearchedProduct(params)
        .then(res => {
          setSearchedProduct(
            {
              loaded: true,
              products: res.products,
              no_of_products: res.no_of_products
            }
          )
          setTotalProducts(res.total_products)
          // if (res.length === 0) {
          //   setFilterSelected([])
          // }
        })
    }
  }, [filterSelected])

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
      filter_heading: "Price",
      filter_type: "Radio",
      filter_data: [
        {
          type: 'price',
          id: `p-${1}`,
          data: "₹2000-Below",
          searchQ: 'price.mop[lte]',
          searchQ2: 'price.mop[gte]',
          Qdata: '2000',
          Qdata2: '0'
        },
        {
          type: 'price',
          id: `p-${2}`,
          data: "₹2001-₹3999",
          searchQ: 'price.mop[lte]',
          searchQ2: 'price.mop[gte]',
          Qdata: '3999',
          Qdata2: '2001'
        },
        {
          type: 'price',
          id: `p-${3}`,
          data: "₹4000-₹6999",
          searchQ: 'price.mop[lte]',
          searchQ2: 'price.mop[gte]',
          Qdata: '6999',
          Qdata2: '4000'
        },
      ],
    },
    {
      filter_heading: "Brand",
      filter_type: "Checkbox",
      filter_data: [
        {
          type: 'brand',
          id: `b-${1}`,
          data: "Apple",
        },
        {
          type: 'brand',
          id: `b-${2}`,
          data: "One Plus",
        },
        {
          type: 'brand',
          id: `b-${2}`,
          data: "Samsung",
        },
      ],
    },
    {
      filter_heading: "Category",
      filter_type: "Checkbox",
      filter_data: [
        {
          type: 'Category',
          id: `c-${1}`,
          data: "Smartphone",
        },
        {
          type: 'Category',
          id: `c-${2}`,
          data: "Flip",
        },
        {
          type: 'Category',
          id: `p-${3}`,
          data: "Fold",
        },
      ],
    },
    {
      filter_heading: "Discount",
      filter_type: "Radio",
      filter_data: [
        {
          type: 'Offer',
          id: `ot-${1}`,
          data: "50% or more",
          Qdata: '50'
        },
        {
          type: 'Offer',
          id: `ot-${2}`,
          data: "30% or more",
          Qdata: '30'
        },
        {
          type: 'Offer',
          id: `ot-${3}`,
          data: "20% or more",
          Qdata: '20'
        },
      ],
    },
  ];

  const handlePageChange = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  const handleAddInterestedProd = (prodId) => {
    let userToken = userContext ? userContext.JWT : "";
    if (userToken) {
      addProductInterested(storeDetails._id, prodId)
        .then(res => (
          toast.success("Product Added")
        ))
    } else {
      nav("/login");
    }
  }

  return (<>

    <div className="page_Wrapper page_Margin_Top">
      <BreadCrumbs data={breadCrumbsData} />
      <>
        <div className="filter_Sort_Header mobile_None">
          <div className="filter_Section_Header">
            {filterSelected?.map(res => (
              <FilterTag
                filter={res}
                handleDeletFilter={handleDeletFilter}
              />
            ))}
          </div>
          <div className='offers_Sort_Header'>
            <div className='offers_Toggle_Header'>
              <div className="offers_Toggle_Container">
                <p className={`${offlineOffersSelected ? 'offer_Selected' : ''}`} onClick={() => setOfflineOffersSelected(true)}>Offline Offers</p>
                <p className={`${offlineOffersSelected ? '' : 'offer_Selected'}`} onClick={() => setOfflineOffersSelected(false)}>Online Offers</p>
              </div>
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
        <>
          <div className="tab_None header_Sort_Container combined_Button_Container">
            <div className="header_Sort_Button combined_Button_One" onClick={() => setBottomSheet(true)}>
              <img src={sortOutlineBlue} alt="" />
              <p>Sort</p>
            </div>
            <Link to={"/category1/filter"} state={filterListData} className="header_Filter_Button combined_Button_Two">
              <img src={filterOutlineBlue} alt="" />
              <p>Filter</p>
            </Link>
          </div>
        </>
        <>
          <div className="desk_Page_Wrapper">
            <aside className="side_Section section_Wrapper pb-0">
              <p className="side_Section_Heading m-0">Filters</p>
              <div className="side_Section_Body">
                <Accordion defaultActiveKey={["0"]}>
                  {filterListData.map((filter, index) => (
                    <Accordion.Item eventKey={`${index}`} key={index}>
                      <Accordion.Header>{filter.filter_heading}</Accordion.Header>
                      <Accordion.Body>
                        {filter.filter_type === "Radio" ? (
                          <>
                            {filter.filter_data.map((element, index) => (
                              <label
                                htmlFor={element.data}
                                key={index}
                                className={`radiobtn-label payment_Methods_Labels`}
                                onClick={() => {
                                  handleAll(element)
                                }}
                              >
                                <input type="radio" name={`filter-${filter.filter_heading}`} checked={filterSelected?.some(res => res.type === element.type && res.data === element.data)} id={element.data} value={element.data} readOnly />
                                <span className="radio-custom"></span>
                                {element.data}
                              </label>
                            ))}
                          </>
                        ) : filter.filter_type === "Checkbox" ? (
                          <>
                            {filter.filter_data.map((element, index) => (
                              <label
                                htmlFor={element.data}
                                key={index}
                                className="checkbox-label checkbox-item d-flex align-items-center"
                                onClick={() => {
                                  handleAll2(element)
                                }}
                              >
                                <input type="checkbox" name={`filter-${filter.filter_heading}`} checked={filterSelected?.some(res => res.data === element.data)} id={element.data} value={element.data} readOnly />
                                <span className="custom-checkmark"></span>
                                {element.data}
                              </label>
                            ))}
                          </>
                        ) : (
                          ""
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </aside>
            <div className="order_Page_Right">
              {
                (searchedProduct.no_of_products > 0) ? (
                  <>
                    <div className="Product_Category_Container">
                      {
                        loading ?
                          [1, 2, 3, 4].map((n) => (<SkeletonElement type={'productBox'} key={n} />))
                          : searchedProduct.products.map((product, index) => (
                            product.productDetail ? (
                              < ProductListItem key={index} product={product.productDetail} interestedButton={interestedButton} handleAddInterestedProd={handleAddInterestedProd} />) : (<></>))
                          )
                      }
                    </div>
                    <div className="pagination_Container">
                      <Pagination productsPerPage={productsPerPage} totalProducts={totalProducts} pageChange={handlePageChange} />
                    </div>
                  </>
                ) : (<>
                  <>
                    <div className="empty_order_sec">
                      <p className="empty_order_text">No Product Found</p>
                      <button type="submit" className="submit-button" onClick={() => nav("/")}>
                        <p>Back To Home</p>
                      </button>
                    </div>
                    {/* <Section2
              id={'Top-sellers-sec'}
              heading='Top Sellers'
              productData={featureProducts}
            /> */}
                  </>
                </>)
              }
            </div>
          </div>
        </>
      </>
    </div>

    {!matches ? (
      <>
        <div className={`bottom_Sheet_Backdrop ${bottomSheet ? "active" : ""}`} onClick={() => setBottomSheet(false)}>
          {" "}
        </div>
        <div className={`bottom_Sheet ${bottomSheet ? "active" : ""}`}>
          <div className="bottom_Sheet_Header">
            <p className="bottom_Sheet_Heading">Sort by</p>
            <img src={closeOutlineGrey} className="bottom_Sheet_Close_Btn" alt="" onClick={() => setBottomSheet(false)} />
          </div>
          <div className="bottom_Sheet_Body">
            <label htmlFor={`price-low-high`} className={`radiobtn-label price_Sort_Labels `}>
              <input type="radio" name="price" id={`price`} value={`price-low-high`} />
              <span className="radio-custom"></span>
              {`Price Low to High`}
            </label>
            <label htmlFor={`price-high-low`} className={`radiobtn-label price_Sort_Labels `}>
              <input type="radio" name="price" id={`price`} value={`price-high-low`} />
              <span className="radio-custom"></span>
              {`Price High to Low`}
            </label>
          </div>
        </div>
      </>
    ) : (
      ""
    )}
  </>)
}

export default OfflineProductCategory