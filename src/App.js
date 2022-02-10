//Dependencies
import './App.css';
import { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom'

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


function App() {
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [deliveryOptionSelected, setDeliveryOptionSelected] = useState('');
  const [editID, setEditID] = useState(0);
  const [addressSelected, setAddressSelected] = useState(0);
  const [storeSelected, setStoreSelected] = useState(0)
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

  const userDetails = {
    user_Profile_Pic: userImage,
    user_Full_Name: 'Rohan Khamkar',
    user_ph_Number: '9167619574',
    user_Email: 'rohankhamkar@gmail.com',
    user_Birth_Date: '22-06-1998',
    delivery_Address: [
      {
        id: 1,
        user_Full_Name: 'Michel address 1',
        user_ph_Number: '9167619574',
        user_Email: 'rohankhamkar@gmail.com',
        user_Pincode: '400001',
        user_State: 'Maharashtra',
        user_City: 'Mumbai',
        user_Address: 'A/302, Sambhav CHSL, Bhayander(West)',
        user_Landmark: ''
      },
      {
        id: 2,
        user_Full_Name: 'Michel address 2',
        user_ph_Number: '9167619574',
        user_Email: 'rohankhamkar@gmail.com',
        user_Pincode: '400001',
        user_State: 'Maharashtra',
        user_City: 'Mumbai',
        user_Address: 'A/302, Sambhav CHSL, Bhayander(West)',
        user_Landmark: ''
      },
    ]
  }

  const ordersData = [
    {
      productName: 'JBL C100SI',
      productArrival: 'Arriving Dec 31 - Jan 04',
      productDeliveryStatues: 'Arriving',
      productImage: product3,
    },
    {
      productName: 'JBL C100SI',
      productArrival: 'Delivered on Sun, Dec 26th ‘21',
      productImage: product3,
      productDeliveryStatues: 'Delivered',
    },
    {
      productName: 'JBL C100SI',
      productArrival: 'Delivered on Sun, Dec 26th ‘21',
      productImage: product3,
      productDeliveryStatues: 'Delivered',
    },
  ]

  const cartData = [
    {
      productImage: product1,
      productName: 'JBL C100SI In Ear Wired Earphones with Mic',
      productColor: 'Black',
      productOriginalPrice: '₹1000',
      productDiscount: '40%',
      productDiscountPrice: '₹600',
      productOffersAvailable: '2 offers available',
      productDeliveryExpected: 'Delivery in 6 - 7 days',
      productDeliveryCharge: '₹40',
      productAvailabilty: 'In stock',
      productQuantityAvailable: '400',
    },
    {
      productImage: product1,
      productName: 'JBL C100SI In Ear Wired Earphones with Mic',
      productColor: 'Black',
      productOriginalPrice: '₹1000',
      productDiscount: '40%',
      productDiscountPrice: '₹600',
      productOffersAvailable: '2 offers available',
      productDeliveryExpected: 'Delivery in 6 - 7 days',
      productDeliveryCharge: '₹40',
      productAvailabilty: 'Only 1 left',
      productQuantityAvailable: '1',
    },
  ]

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
          <Route path='/signup' element={<Signup setLoginRedirect={setLoginRedirect} />} />
          <Route path='/login' element={<Login setLoginRedirect={setLoginRedirect} />} />
          <Route path='/otp' element={<OtpValid setUserLoggedIn={setUserLoggedIn} loginRedirect={loginRedirect} />} />
          <Route path='/adduser' element={<AddUser setUserLoggedIn={setUserLoggedIn} />} />
          <Route path='/' element={<Home setHeaderData={setHeaderData} />} />
          <Route path='/orders' element={<MyOrders ordersList={ordersData} setHeaderData={setHeaderData} />} />
          <Route path='/mycart' element={<MyCart cartData={cartData} setHeaderData={setHeaderData} />} />
          <Route path='/myaddress' element={<Address setHeaderData={setHeaderData} userDetails={userDetails} setEditID={setEditID} />} />
          <Route path='/newaddress' element={<NewAddress setHeaderData={setHeaderData} />} />
          <Route path='/editaddress' element={<EditAddress setHeaderData={setHeaderData} userDetails={userDetails} editID={editID} />} />
          <Route path='/payment' element={<Payment setHeaderData={setHeaderData} />} />
          <Route path='/profile' element={<Profile setEditID={setEditID} editID={editID} userDetails={userDetails} setHeaderData={setHeaderData} />} />
          <Route path='/edit-account' element={<EditAccont setHeaderData={setHeaderData} userDetails={userDetails} setModalDataMobile={setModalDataMobile} />} />
          <Route path='/update-details/number' element={<UpdateNumber setHeaderData={setHeaderData} modalDataMobile={modalDataMobile} />} />
          <Route path='/update-details/email' element={<UpdateEmail setHeaderData={setHeaderData} modalDataMobile={modalDataMobile} />} />
          <Route path='/customer-support' element={<CustomerSupport setHeaderData={setHeaderData} />} />
          <Route path='/write-to-us' element={<WriteToUS setHeaderData={setHeaderData} />} />
          <Route path='/delivery-option' element={<DeliveryOptions setDeliveryOptionSelected={setDeliveryOptionSelected} setHeaderData={setHeaderData} />} />
          <Route path='/home-delivery' element={<HomeDelivery userDetails={userDetails} setEditID={setEditID} addressSelected={addressSelected} setAddressSelected={setAddressSelected} setHeaderData={setHeaderData} />} />
          <Route path='/store-pickup' element={<StorePickUp setHeaderData={setHeaderData} setStoreSelected={setStoreSelected} />} />
          <Route path='/store-near-me' element={<StoreNear setHeaderData={setHeaderData} setStoreSelected={setStoreSelected} />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
