import { useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Filter = ({ setHeaderData }) => {
  const loc = useLocation()
  const nav = useNavigate()
  const [filterData, setFilterData] = useState([])
  const [filterHeadingSelected, setFilterHeadingSelected] = useState(0)
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

  // console.log(filterData);



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
                          <label htmlFor={filter.id} className={`radiobtn-label payment_Methods_Labels`} >
                            <input type="radio" name={`${item.filter_heading}`} id={filter.id} value={filter.data} />
                            <span className="radio-custom"></span>{filter.data}
                          </label>
                        </>
                      ) : (
                        item.filter_type === 'Checkbox' ? (
                          <>
                            <label htmlFor={filter.id} key={index} className="checkbox-label checkbox-item d-flex align-items-center" >
                              <input type="checkbox" name={`${item.filter_heading}`} id={filter.id} value={filter.data} />
                              <span className="custom-checkmark"></span>{filter.data}
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
              <button type='submit' className='submit-button' onClick={() => nav('/category1')} ><p>Show {`495`} results</p></button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Filter