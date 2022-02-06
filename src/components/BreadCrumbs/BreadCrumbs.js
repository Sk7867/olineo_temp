import React from 'react';
import { Link } from 'react-router-dom';

//CSS
import './BreadCrumbs.css'

//Images
import arrowRightGrey from '../../assets/vector/arrow_right_grey.svg'

const BreadCrumbs = ({ data }) => {
  // console.log(data);
  return <>
    <div className='page_Breadcrumb'>
      {
        data.map((item, index) => (
          <div className='page_Breadcrumb_Wrapper' key={index}>
            {
              item.url === '' ? (
                <>
                  <p key={index}>{item.text}</p>
                </>
              ) : (
                <>
                  <Link to={item.url} key={index}>{item.text}</Link> <img src={arrowRightGrey} alt="" />
                </>
              )
            }
          </div>
        ))
      }
    </div>
  </>;
};

export default BreadCrumbs;
