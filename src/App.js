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


function App() {
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [cart, setCart] = useState(1)
  const [headerText, setHeaderText] = useState('')
  const [header3Cond, setHeader3Cond] = useState(false);
  const [deliveryOptionSelected, setDeliveryOptionSelected] = useState('');
  const [editID, setEditID] = useState(0);
  const [modalDataMobile, setModalDataMobile] = useState({
    number: null,
    oldData: '',
    newData: '',
  });
  const loc = useLocation()

  // console.log(editID);

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
    },
  ]

  return (
    <>
      <ScrollToTop />
      <div className="App">
        <HeaderBar2 sidebar={sidebar} header3={header3Cond} setSidebar={setSidebar} userLoggedIn={userLoggedIn} headerText={headerText} />
        <Routes>
          <Route path='/signup' element={<Signup setLoginRedirect={setLoginRedirect} />} />
          <Route path='/login' element={<Login setLoginRedirect={setLoginRedirect} />} />
          <Route path='/otp' element={<OtpValid setUserLoggedIn={setUserLoggedIn} loginRedirect={loginRedirect} />} />
          <Route path='/adduser' element={<AddUser setUserLoggedIn={setUserLoggedIn} />} />
          <Route path='/' element={<Home setHeader3Cond={setHeader3Cond} />} />
          <Route path='/orders' element={<MyOrders ordersList={ordersData} setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} />} />
          <Route path='/mycart' element={<MyCart cart={cart} cartData={cartData} setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} />} />
          <Route path='/myaddress' element={<Address setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} userDetails={userDetails} setEditID={setEditID} />} />
          <Route path='/newaddress' element={<NewAddress setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} />} />
          <Route path='/editaddress' element={<EditAddress setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} userDetails={userDetails} editID={editID} />} />
          <Route path='/payment' element={<Payment setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} />} />
          <Route path='/profile' element={<Profile setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} setEditID={setEditID} editID={editID} userDetails={userDetails} />} />
          <Route path='/edit-account' element={<EditAccont setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} userDetails={userDetails} setModalDataMobile={setModalDataMobile} />} />
          <Route path='/update-details/number' element={<UpdateNumber setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} modalDataMobile={modalDataMobile} />} />
          <Route path='/update-details/email' element={<UpdateEmail setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} modalDataMobile={modalDataMobile} />} />
          <Route path='/customer-support' element={<CustomerSupport setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} />} />
          <Route path='/write-to-us' element={<WriteToUS setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} />} />
          <Route path='/delivery-option' element={<DeliveryOptions setHeaderText={setHeaderText} setHeader3Cond={setHeader3Cond} setDeliveryOptionSelected={setDeliveryOptionSelected} />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
