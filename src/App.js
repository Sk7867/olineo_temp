//Dependencies
import './App.css';
import { useState, useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom'
import { getUser } from './api/Auth';
import { getAllProducts } from './api/Product';

//Image 
import product3 from './assets/png/product_3.png'
import product1 from './assets/png/product_1.png'
import userImage from './assets/png/userImage.png'

//Components
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Signup from './pages/Signup';
import Login from './pages/Login';
import OtpValid from './pages/OtpValid';
import AddUser from './pages/addUser';
import HeaderBar2 from './components/HeaderBar2/HeaderBar2';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import MyOrders from './pages/MyOrders/MyOrders';
import MyCart from './pages/MyCart/MyCart';
import Address from './pages/Address/Address';
import Payment from './pages/Payment/Payment';
import Profile from './pages/profile/Profile';
import EditAccont from './pages/EditAccount/EditAccount';
import WriteToUS from './pages/CustomerSupport/WriteToUs';
import CustomerSupport from './pages/CustomerSupport/CustomerSupport';
import DeliveryOptions from './pages/MyCart/DeliveryOptions';
import Update from './pages/EditAccount/Update';
import UpdateNumber from './pages/EditAccount/UpdateNumber';
import UpdateEmail from './pages/EditAccount/UpdateEmail';
import MyAddress from './pages/Address/MyAddress';
import NewAddress from './pages/Address/NewAddress';
import EditAddress from './pages/Address/EditAddress';
import HomeDelivery from './pages/Address/HomeDelivery';
import StorePickUp from './pages/Pickup/StorePickUp';
import StoreNear from './pages/Pickup/StoreNear';
import ProductPage from './pages/ProductPage/ProductPage';


function App() {
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [deliveryOptionSelected, setDeliveryOptionSelected] = useState('');
  const [editID, setEditID] = useState(0);
  const [addressSelected, setAddressSelected] = useState(0);
  const [storeSelected, setStoreSelected] = useState(0)
  const [userDetails, setUserDetails] = useState({
    user_Profile_Pic: userImage,
    user_ID: '',
    user_Full_Name: '',
    user_ph_Number: '',
    user_Email: '',
    user_Birth_Date: '',
    delivery_Address: [],
    cart_Details: []
  })
  const [allProducts, setAllProducts] = useState([])

  const [modalDataMobile, setModalDataMobile] = useState({
    number: null,
    oldData: '',
    newData: '',
  });
  const [headerData, setHeaderData] = useState({
    header3Cond: false,
    headerText: '',
    categoriesCond: false
  });
  const loc = useLocation()

  // console.log(loc);
  let userToken = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).JWT : ''
  useEffect(() => {
    if (userToken) {
      setUserLoggedIn(true)
      getUser()
        .then(res => {
          if (res) {
            let user = res
            setUserDetails({
              user_ID: user._id,
              user_Full_Name: user.fullName,
              user_ph_Number: user.mobileNumber,
              user_Email: user.email,
              delivery_Address: user.address,
              cart_Details: user.cart
            })
          }
        })
    } else {
      setUserLoggedIn(false)
    }
  }, [userToken])

  useEffect(() => {
    getAllProducts()
      .then(res => {
        setAllProducts(res)
      })
  }, [])

  // console.log(allProducts);



  const ordersData = [
    {
      productName: 'JBL C100SI',
      productArrival: 'Arriving Dec 31 - Jan 04',
      productDeliveryStatues: 'Arriving',
      productPrice: '600',
      productImage: product3,
    },
    {
      productName: 'JBL C100SI',
      productArrival: 'Delivered on Sun, Dec 26th ‘21',
      productPrice: '600',
      productImage: product3,
      productDeliveryStatues: 'Delivered',
    },
    {
      productName: 'JBL C100SI',
      productArrival: 'Delivered on Sun, Dec 26th ‘21',
      productPrice: '600',
      productImage: product3,
      productDeliveryStatues: 'Delivered',
    },
  ]

  // const cartData = [
  //   {
  //     productImage: product1,
  //     productName: 'JBL C100SI In Ear Wired Earphones with Mic',
  //     productColor: 'Black',
  //     productOriginalPrice: '1000',
  //     productDiscount: '40',
  //     productDiscountPrice: '600',
  //     productOffersAvailable: '2 offers available',
  //     productDeliveryExpected: 'Delivery in 6 - 7 days',
  //     productDeliveryCharge: '40',
  //     productAvailabilty: 'In stock',
  //     productQuantityAvailable: '400',
  //   },
  //   {
  //     productImage: product1,
  //     productName: 'JBL C100SI In Ear Wired Earphones with Mic',
  //     productColor: 'Black',
  //     productOriginalPrice: '1000',
  //     productDiscount: '40',
  //     productDiscountPrice: '600',
  //     productOffersAvailable: '2 offers available',
  //     productDeliveryExpected: 'Delivery in 6 - 7 days',
  //     productDeliveryCharge: '40',
  //     productAvailabilty: 'Only 1 left',
  //     productQuantityAvailable: '1',
  //   },


  // ]

  return (
    <>
      <ScrollToTop />
      <div className="App">
        {
          loc.pathname === '/login' || loc.pathname === '/signup' || loc.pathname === '/otp' || loc.pathname === '/adduser' ? ('') : (
            <HeaderBar2 userLoggedIn={userLoggedIn} headerData={headerData} />
          )
        }
        <Routes>
          <Route path='/signup' exact element={<Signup setLoginRedirect={setLoginRedirect} />} />
          <Route path='/login' exact element={<Login setLoginRedirect={setLoginRedirect} />} />
          <Route path='/otp' exact element={<OtpValid setUserLoggedIn={setUserLoggedIn} loginRedirect={loginRedirect} />} />
          <Route path='/adduser' exact element={<AddUser setUserLoggedIn={setUserLoggedIn} />} />
          <Route path='/' exact element={<Home setHeaderData={setHeaderData} allProducts={allProducts} />} />
          <Route path='/orders' exact element={<MyOrders ordersList={ordersData} setHeaderData={setHeaderData} />} />
          <Route path='/mycart' exact element={<MyCart cartData={userDetails.cart_Details} setHeaderData={setHeaderData} />} />
          <Route path='/myaddress' exact element={<Address setHeaderData={setHeaderData} userDetails={userDetails} setEditID={setEditID} />} />
          <Route path='/newaddress' exact element={<NewAddress setHeaderData={setHeaderData} />} />
          <Route path='/editaddress' exact element={<EditAddress setHeaderData={setHeaderData} userDetails={userDetails} editID={editID} />} />
          <Route path='/payment' exact element={<Payment setHeaderData={setHeaderData} cartData={userDetails.cart_Details} />} />
          <Route path='/profile' exact element={<Profile setEditID={setEditID} editID={editID} userDetails={userDetails} setHeaderData={setHeaderData} />} />
          <Route path='/edit-account' exact element={<EditAccont setHeaderData={setHeaderData} userDetails={userDetails} setModalDataMobile={setModalDataMobile} />} />
          <Route path='/update-details/number' exact element={<UpdateNumber setHeaderData={setHeaderData} modalDataMobile={modalDataMobile} />} />
          <Route path='/update-details/email' exact element={<UpdateEmail setHeaderData={setHeaderData} modalDataMobile={modalDataMobile} />} />
          <Route path='/customer-support' exact element={<CustomerSupport setHeaderData={setHeaderData} />} />
          <Route path='/write-to-us' exact element={<WriteToUS setHeaderData={setHeaderData} />} />
          <Route path='/delivery-option' exact element={<DeliveryOptions setDeliveryOptionSelected={setDeliveryOptionSelected} setHeaderData={setHeaderData} cartData={userDetails.cart_Details} />} />
          <Route path='/home-delivery' exact element={<HomeDelivery userDetails={userDetails} setEditID={setEditID} addressSelected={addressSelected} setAddressSelected={setAddressSelected} setHeaderData={setHeaderData} cartData={userDetails.cart_Details} />} />
          <Route path='/store-pickup' exact element={<StorePickUp setHeaderData={setHeaderData} setStoreSelected={setStoreSelected} cartData={userDetails.cart_Details} />} />
          <Route path='/store-near-me' exact element={<StoreNear setHeaderData={setHeaderData} setStoreSelected={setStoreSelected} cartData={userDetails.cart_Details} />} />
          <Route path='/product/:id' exact element={<ProductPage setHeaderData={setHeaderData} />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
