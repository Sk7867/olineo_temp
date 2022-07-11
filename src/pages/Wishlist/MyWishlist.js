import React, { useContext, useEffect, useState } from 'react'
import { getAllWishlistItems } from '../../api/wishlistApi';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { UserDataContext } from '../../Contexts/UserContext';
import './MyWishlist.css'
import WishlistSection from './WishlistSection'

const MyWishlist = ({ setHeaderData, featureProducts }) => {
  const {
    userWishlist,
    setUserWishlist,
    allProducts,
    setCartArray
  } = useContext(UserDataContext);

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: "My Orders ",
      categoriesCond: true,
      header3Store: true,
      header3Cart: true,
      header3Profile: true,
    });
  }, []);

  useEffect(() => {
    getAllWishlistItems().then((res) => {
      if (res) {
        setUserWishlist({
          loaded: true,
          no_of_wishlist_items: res.no_of_wishlist_items,
          wishlist_items: [...res.wishlist_items],
        });
      }
    });
  }, []);

  const breadCrumbsData = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "My Wishlist",
      url: "",
    },
  ];
  return (
    <>
      <div className="page_Wrapper page_Margin_Top">
        <BreadCrumbs data={breadCrumbsData} />
        <div className="wishlist_page_container">
          <WishlistSection />
        </div>
      </div>
    </>
  )
}

export default MyWishlist