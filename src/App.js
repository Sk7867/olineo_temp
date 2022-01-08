//Dependencies
import './App.css';
import { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom'


//Components
import Signup from './pages/Signup';
import Login from './pages/Login';
import OtpValid from './pages/OtpValid';
import AddUser from './pages/addUser';
import HeaderBar2 from './components/HeaderBar2/HeaderBar2';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import MyOrders from './pages/MyOrders/MyOrders';
import MyCart from './pages/MyCart/MyCart';

//Image 
import product3 from './assets/png/product_3.png'

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [orders, setOrders] = useState(0)
  const [cart, setCart] = useState(0)
  // const [headerText, setHeaderText] = useState('')
  const loc = useLocation()

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
      productImage: product3,
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
      productImage: product3,
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
    <div className="App">
      {
        loc.pathname === '/' ? (
          <HeaderBar2 setSidebar={setSidebar} userLoggedIn={userLoggedIn} />
        ) : ('')
      }
      <Routes>
        <Route path='/signup' element={<Signup setUserLoggedIn={setUserLoggedIn} />} />
        <Route path='/login' element={<Login setUserLoggedIn={setUserLoggedIn} />} />
        <Route path='/otp' element={<OtpValid userLoggedIn={userLoggedIn} />} />
        <Route path='/adduser' element={<AddUser />} />
        <Route path='/' element={<Home sidebar={sidebar} setSidebar={setSidebar} />} />
        <Route path='/orders' element={<MyOrders orders={orders} ordersList={ordersData} />} />
        <Route path='/mycart' element={<MyCart cart={cart} cartData={cartData} />} />
      </Routes>
      {
        loc.pathname === '/' ? (
          <Footer />
        ) : ('')
      }
    </div>
  );
}

export default App;
