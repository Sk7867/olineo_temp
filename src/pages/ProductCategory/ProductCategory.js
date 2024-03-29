//Dependencies
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Accordion, Dropdown } from "react-bootstrap";
import { UserDataContext } from "../../Contexts/UserContext";

//CSS
import "./ProductCategory.css";

//Images
import sortOutlineBlue from "../../assets/vector/sort_outline_blue.svg";
import filterOutlineBlue from "../../assets/vector/filter_outline_blue.svg";
import product1 from "../../assets/png/product_1.png";
import closeOutlineGrey from "../../assets/vector/close_outline_grey.svg";
import sortOutlineGrey from "../../assets/vector/sort_outline_grey.svg";

//Components
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import ProductListItem from "../../components/ProductListItem/ProductListItem";
import FilterTag from "../../components/FilterTag/FilterTag";
import { getSearchedProduct } from "../../api/Product";
import SkeletonElement from "../../components/Skeletons/SkeletonElement";
import Pagination from "../../components/Pagination/Pagination";

const ProductCategory = ({ setHeaderData }) => {
  const { slug } = useParams()
  const [bottomSheet, setBottomSheet] = useState(false);
  const [loading, setLoading] = useState(false);
  const matches = useMediaQuery("(min-width:768px)");
  const nav = useNavigate();
  const [filterSelected, setFilterSelected] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const { searchedProduct, setSearchedProduct } = useContext(UserDataContext);
  const productsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(1)
  const [toggleFilter, setToggleFilter] = useState(false)
  const [filterHeadingSelected, setFilterHeadingSelected] = useState(0)

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
    }
    else {
      filterSelected.push(e)
    }
    setFilterSelected([...filterSelected], [filterSelected]);

  }

  React.useEffect(() => {
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
    setLoading(true)
    getSearchedProduct(params)
      .then(res => {
        setSearchedProduct(
          {
            loaded: true,
            products: res.products,
            no_of_products: res.no_of_products
          }
        );
        setTotalProducts(res.total_products)
        setLoading(false)
        // if (res.length === 0) {
        //   setFilterSelected([])
        // }
      })
  }, [filterSelected, setSearchedProduct, currentPage])

  const handlePageChange = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }


  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: "Republic Day Sale",
      categoriesCond: true,
      header3Store: false,
      header3Cart: true,
      header3Profile: true,
    });
  }, []);

  const breadCrumbsData = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Sale",
      url: "",
    },
  ];

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

  const handleBottomSheetToggle = (toggle) => {
    let body = document.querySelector('body')
    if (toggle === 'true') {
      body.style.overflow = 'hidden'
      setBottomSheet(true)
    } else if (toggle === 'false') {
      body.removeAttribute('style')
      setBottomSheet(false)
    }
  }

  return (
    <>
      <div className={`page_Wrapper page_Margin_Top`}>
        <BreadCrumbs data={breadCrumbsData} />
        {/*  */}
        <div className={`main_Content_Show ${toggleFilter && !matches ? 'main_Content_Hide' : ''}`}>
          <>
            <div className="filter_Sort_Header mobile_None">
              <div className="filter_Section_Header">
                {filterSelected?.map(res => (
                  <FilterTag
                    filter={res}
                    key={res}
                    handleDeletFilter={handleDeletFilter}
                  />
                ))}
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
                <div className="header_Sort_Button combined_Button_One" onClick={() => handleBottomSheetToggle('true')}>
                  <img src={sortOutlineBlue} alt="" />
                  <p>Sort</p>
                </div>
                <div onClick={() => setToggleFilter(true)} className="header_Filter_Button combined_Button_Two">
                  <img src={filterOutlineBlue} alt="" />
                  <p>Filter</p>
                </div>
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
                                <ProductListItem key={index} product={product} />))
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
        {!matches && (
          <>
            <div className={`new_Filter_Container ${toggleFilter ? 'new_Filter_Show' : ''}`}>
              <div className="filter_Container">
                <div className="filter_Left">
                  {filterListData.map((item, index) => (
                    <div className={`filter_Left_Item ${filterHeadingSelected === index ? 'filter_Heading_Selected' : ''}`} key={index} onClick={() => setFilterHeadingSelected(index)} >
                      <p>{item.filter_heading}</p>
                    </div>
                  ))
                  }
                </div>
                <div className="filter_Right">
                  {filterListData && (
                    filterListData.map((item, index) => (
                      (index === filterHeadingSelected) && (
                        item.filter_data.map((filter, index) => (
                          <div className="filter_Right_Item" key={index} >
                            {item.filter_type === 'Radio' ? (
                              <>
                                <label
                                  htmlFor={filter.data}
                                  key={index}
                                  className={`radiobtn-label payment_Methods_Labels`}
                                  onClick={() => {
                                    handleAll(filter)
                                  }}
                                >
                                  <input type="radio" name={`filter-${filter.filter_heading}`} checked={filterSelected?.some(res => res.type === filter.type && res.data === filter.data)} id={filter.data} value={filter.data} readOnly />
                                  <span className="radio-custom"></span>
                                  {filter.data}
                                </label>
                              </>
                            ) : (
                              item.filter_type === 'Checkbox' ? (
                                <>
                                  <label
                                    htmlFor={filter.data}
                                    key={index}
                                    className="checkbox-label checkbox-item d-flex align-items-center"
                                    onClick={() => {
                                      handleAll2(filter)
                                    }}
                                  >
                                    <input type="checkbox" name={`filter-${filter.filter_heading}`} checked={filterSelected?.some(res => res.data === filter.data)} id={filter.data} value={filter.data} readOnly />
                                    <span className="custom-checkmark"></span>
                                    {filter.data}
                                  </label>
                                </>
                              ) : (''))}
                          </div>
                        ))
                      ))))}
                </div>
              </div>
              {/* Floating Footer */}
              {!matches && (
                <div className="floating_Footer">
                  <div className="floating_Footer_Wrapper">
                    <div className="floating_Footer_Center">
                      <button type='submit' className='submit-button' onClick={() => setToggleFilter(false)} ><p>Show {`${searchedProduct.no_of_products}`} result{searchedProduct.no_of_products > 1 ? (<span>s</span>) : <></>}</p></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {/*  */}
      </div>


      {!matches ? (
        <>
          <div className={`bottom_Sheet_Backdrop ${bottomSheet ? "active" : ""}`} onClick={() => handleBottomSheetToggle('false')}>
            {" "}
          </div>
          <div className={`bottom_Sheet ${bottomSheet ? "active" : ""}`}>
            <div className="bottom_Sheet_Header">
              <p className="bottom_Sheet_Heading">Sort by</p>
              <img src={closeOutlineGrey} className="bottom_Sheet_Close_Btn" alt="" onClick={() => handleBottomSheetToggle('false')} />
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
    </>
  );
};

export default ProductCategory;