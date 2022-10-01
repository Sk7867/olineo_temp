import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { logOutUser } from "../../api/Auth";
import { getAddress } from "../../api/Address";
import { UserDataContext } from "../../Contexts/UserContext";

//CSS
import "./Profile.css";

//Images
import userImage from "../../assets/png/userImage.png";
import defaultUserImage from "../../assets/png/default_user_image.png";
import cameraIcon from "../../assets/vector/camera_icon.svg";
import accountCircleBlue from "../../assets/vector/account_circle_blue.svg";
import truckIconBlue from "../../assets/vector/truck_outline_blue.svg";
import bookmarkIconBlue from "../../assets/vector/bookmark_outline_blue.svg";
import cartIconBlue from "../../assets/vector/cart_outline_blue.svg";
import locationIconBlue from "../../assets/vector/location_blue.svg";
import walletIconBlue from "../../assets/vector/wallet_outline_blue.svg";
import logoutIconRed from "../../assets/vector/logout_icon_red.svg";
import arrowRightBlue from "../../assets/vector/arrow_right_blue.svg";

//Components
import EditAccont from "../EditAccount/EditAccount";
import EditDetails from "../EditAccount/EditDetails";
import MyAddress from "../Address/MyAddress";
import AddressForm from "../../components/AddressForm/AddressForm";
import CartSection from "../MyCart/CartSection";
import OrderSection from "../MyOrders/OrderSection";
import { getCartData } from "../../api/Cart";
import { getIndiProduct, getProductServiceability } from "../../api/Product";
import { getAllOrder } from "../../api/OrdersApi";
import { getAllWishlistItems } from "../../api/wishlistApi";
import WishlistSection from "../Wishlist/WishlistSection";
import { getSaveForLater } from "../../api/SaveForLaterApi";

const Profile = ({ setEditID, editID, setHeaderData }) => {
  const [profileState, setProfileState] = useState(1);
  const [profilePic, setProfilePic] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [addressData, setAddressData] = useState([]);
  const matches = useMediaQuery("(min-width:768px)");
  const [editAddress, setEditAddress] = useState({});
  const loc = useLocation();
  const nav = useNavigate();
  const {
    userContext,
    setUserContext,
    setUserAddress,
    allProducts,
    setCartArray,
    setUserOrderData,
    setPriceBoxDetails,
    setUserWishlist,
    setUserSaveForLater
  } = useContext(UserDataContext);

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: "Profile",
      categoriesCond: false,
      header3Store: true,
      header3Cart: true,
      header3Profile: false,
    });
  }, []);
  // console.log(profilePic);

  useEffect(() => {
    if (userContext && userContext.profilePic) {
      setProfilePic(userContext.profilePic);
    } else if (newProfilePic !== null) {
      setProfilePic(newProfilePic);
    } else {
      setProfilePic(defaultUserImage);
    }
  }, [userContext, newProfilePic]);

  useEffect(() => {
    getAddress().then((res) => {
      // console.log(res);
      if (res) {
        setUserAddress({
          loaded: true,
          no_of_address: res.no_of_address,
          address: res.address,
        });
      }
    });
  }, []);

  useEffect(() => {
    getCartData()
      .then(res => {
        if (res) {
          let prod = []
          prod = res.cart
          prod.forEach((product) => {
            product["quantity"] = 1;
          })
          setCartArray({
            loaded: true,
            no_of_carts: res.no_of_carts,
            cart: prod,
            combo: res.combo
          })
        }
      })
  }, [])

  useEffect(() => {
    getSaveForLater()
      .then(res => {
        setUserSaveForLater({
          loaded: true,
          no_of_save_for_later_items: res.no_of_save_for_later_items,
          save_for_later_items: res.save_for_later_items
        })
      })
  }, [])

  useEffect(() => {
    getAllOrder().then((res) => {
      if (res) {
        let orders = [...res.orders];
        let newOrders = orders.filter((obj) => obj.itemId.length > 0);
        setUserOrderData({
          loaded: true,
          no_of_orders: res.no_of_orders,
          orders: newOrders,
        });
      }
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

  const logOut = () => {
    logOutUser().then((res) => {
      // console.log('User Logged Out')
      setUserContext({
        profilePic: "",
        id: "",
        fullName: "",
        mobileNumber: "",
        email: "",
        JWT: "",
        dob: null,
        pincode: "",
      });
      setUserAddress({
        loaded: false,
        no_of_address: 0,
        address: [],
      });
      setCartArray({
        loaded: false,
        cart: [],
        combo: [],
        no_of_carts: 0,
      });
      setUserOrderData({
        loaded: false,
        no_of_orders: 0,
        orders: [],
      });
      setPriceBoxDetails({
        cartItemsNumber: 0,
        cartItemsPrice: 0,
        totalDiscount: 0,
        totalDeliveryCharge: 0,
        totalAmount: 0,
      });
      setUserWishlist({
        loaded: false,
        no_of_wishlist_items: 0,
        wishlist_items: [],
      });
    });
  };

  const profileOptions = [
    {
      image: accountCircleBlue,
      title: "My Account Details",
      link: "/edit-account",
    },
    {
      image: truckIconBlue,
      title: "My Orders",
      link: "/orders",
    },
    {
      image: bookmarkIconBlue,
      title: "My Wishlist",
      link: "/",
    },
    {
      image: cartIconBlue,
      title: "My Cart",
      link: "/mycart",
    },
    {
      image: locationIconBlue,
      title: "My Address",
      link: "/myaddress",
    },
    // {
    //   image: walletIconBlue,
    //   title: 'My Wallet',
    //   link: '/',
    // },
    {
      image: logoutIconRed,
      title: "Logout",
      link: "/",
      logout: true,
    },
  ];

  const getRandomProductArr = (arr, num) => {
    const shuffledArr = [...arr].sort(() => 0.5 - Math.random())
    return shuffledArr.slice(0, num)
  }

  const featureProducts = getRandomProductArr(allProducts.products, 10)

  // console.log(userContext.profilePic);

  const profileStateSwitch = (profileState) => {
    switch (profileState) {
      case 1:
        return <EditDetails profileDetails={false} profilePicUpdate={true} />;
      case 2:
        return <OrderSection featureProducts={featureProducts} placed={true} delivered={true} cancelled={true} />;
      case 3:
        return <WishlistSection />;
      case 4:
        return <CartSection featureProducts={featureProducts} />;
      case 5:
        return <MyAddress setEditID={setEditID} setProfileState={setProfileState} border={true} />;
      // case 5: return (<EditDetails profileDetails={false} profilePicUpdate={true} />)
      case 10:
        return <AddressForm setProfileState={setProfileState} fromProfile={true} />;
      case 11:
        return <AddressForm editID={editID} addressProp={loc.state} setProfileState={setProfileState} fromProfile={true} />;

      default:
        return <EditDetails profileDetails={false} profilePicUpdate={true} />;
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setNewProfilePic(reader.result);
          setUserContext((prev) => ({
            ...prev,
            profilePic: reader.result,
            newProfilePic: e.target.files[0],
          }));
          // console.log(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onImageError = (e) => {
    e.target.src = defaultUserImage;
  };

  return (
    <>
      <div className="page_Wrapper profile_Page_Wrapper page_Margin_Top_Secondary">
        {!matches && (
          <div>
            <div className="profile_User_Details">
              <div className="user_Profile_Pic_Container">
                <div className="user_Profile_Pic">
                  <img src={profilePic} alt="" />
                </div>
                <div className="user_Camera_Icon">
                  <img src={cameraIcon} alt="" />
                  <form action="" encType="multipart/form-data">
                    <input type="file" name="Profile Image" id="Profile Image" onChange={handleImageChange} className="profile_Image" accept=".jpg, .jpeg, .png" />
                  </form>
                </div>
              </div>
              <p className="user_Name">{userContext.fullName}</p>
              <p className="user_Phone">{userContext.mobileNumber}</p>
              <p className="user_Mail">{userContext.email}</p>
            </div>
            <div className="profile_Options">
              {profileOptions.map((option, index) =>
                option.logout ? (
                  <Link to={option.link} className={`profile_Option ${option.title === "Logout" ? "logout_Styles" : ""}`} key={index} onClick={() => logOut()}>
                    <div>
                      <img src={option.image} alt="" />
                      <p>{option.title}</p>
                    </div>
                    <img src={arrowRightBlue} alt="" className="profile_arrow" />
                  </Link>
                ) : (
                  <Link to={option.link} className={`profile_Option`} key={index}>
                    <div>
                      <img src={option.image} alt="" />
                      <p>{option.title}</p>
                    </div>
                    <img src={arrowRightBlue} alt="" className="profile_arrow" />
                  </Link>
                )
              )}
            </div>
          </div>
        )}

        {matches && (
          <div className="desk_Page_Wrapper">
            <aside className="side_Section profile_Side_Section">
              <div className="profile_User_Details">
                <div className="user_Profile_Pic_Container">
                  <div className="user_Profile_Pic">
                    <img src={userContext.profilePic} onError={onImageError} alt="" />
                  </div>
                  <div className="user_Camera_Icon">
                    <img src={cameraIcon} alt="" />
                    <input type="file" name="Profile Image" id="Profile Image" onChange={handleImageChange} className="profile_Image" accept=".jpg, .jpeg, .png" />
                  </div>
                </div>
                <p className="user_Name">{userContext.fullName}</p>
                <p className="user_Phone">{userContext.mobileNumber}</p>
                <p className="user_Mail">{userContext.email}</p>
              </div>

              <div className="profile_Options profile_Options_Desk">
                {profileOptions.map((option, index) =>
                  option.logout ? (
                    <div
                      className={`profile_Option ${option.title === "Logout" ? "logout_Styles --selected" : ""}`}
                      key={index}
                      onClick={() => {
                        logOut();
                        nav("/");
                      }}
                    >
                      <div>
                        <img src={option.image} alt="" />
                        <p>{option.title}</p>
                      </div>
                      <img src={arrowRightBlue} alt="" className="profile_arrow" />
                    </div>
                  ) : (
                    <div className={`profile_Option ${(profileState - 1) === index ? '--selected' : ''}`} key={index} onClick={() => setProfileState(index + 1)}>
                      <div>
                        <img src={option.image} alt="" />
                        <p>{option.title}</p>
                      </div>
                      <img src={arrowRightBlue} alt="" className="profile_arrow" />
                    </div>
                  )
                )}
              </div>
            </aside>
            <div className="order_Page_Right">{profileStateSwitch(profileState)}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
