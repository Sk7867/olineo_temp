import { useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getSearchedProduct } from '../../api/Product';
import { UserDataContext } from '../../Contexts/UserContext';

const Filter = ({ setHeaderData }) => {
  const loc = useLocation()
  const nav = useNavigate()
  const [filterData, setFilterData] = useState([])
  const [filterHeadingSelected, setFilterHeadingSelected] = useState(0)
  const { searchedProduct, setSearchedProduct } = useContext(UserDataContext);
  const [filterSelected, setFilterSelected] = useState([]);
  const matches = useMediaQuery("(min-width:768px)")

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Filters',
      categoriesCond: true,
      header3Store: false,
      header3Cart: true,
      header3Profile: true,
    })
  }, []);

  useEffect(() => {
    if (loc.state) {
      setFilterData(loc.state)
    }
  }, [loc.state])

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
  React.useEffect(() => {
    const params = new URLSearchParams();
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
        );
        if (res.length === 0) {
          setFilterSelected([])
        }
      })
  }, [filterSelected, setSearchedProduct])

  console.log();



  return (
    <>
      <div className='page_Wrapper page_Margin_Top'>
        <div className="filter_Container">
          <div className="filter_Left">
            {filterData.map((item, index) => (
              <div className={`filter_Left_Item ${filterHeadingSelected === index ? 'filter_Heading_Selected' : ''}`} key={index} onClick={() => setFilterHeadingSelected(index)} >
                <p>{item.filter_heading}</p>
              </div>
            ))
            }
          </div>
          <div className="filter_Right">
            {filterData && (
              filterData.map((item, index) => (
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
      </div>
      {/* Floating Footer */}
      {!matches && (
        <div className="floating_Footer">
          <div className="floating_Footer_Wrapper">
            <div className="floating_Footer_Center">
              <button type='submit' className='submit-button' onClick={() => nav('/smartphone/f/newFilter')} ><p>Show {`${searchedProduct.no_of_products}`} result{searchedProduct.no_of_products > 1 ? (<span>s</span>) : <></>}</p></button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Filter