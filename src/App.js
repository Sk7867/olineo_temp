//Dependencies
import './App.css';
import { useState, useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom'
import { getUser, getUserPic } from './api/Auth';
import { getAllProducts, getIndiProduct } from './api/Product';
import { getCartData } from './api/Cart';


//Image 
import product3 from './assets/png/product_3.png'
import product1 from './assets/png/product_1.png'
import userImage from './assets/png/userImage.png'
import defaultUserImage from './assets/png/default_user_image.png'

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
import { UserDataContext } from './Contexts/UserContext'
import { getAddress } from './api/Address';
import ProductCategory from './pages/ProductCategory/ProductCategory';
import OfflineProductCategory from './pages/ProductCategory/OfflineProductCategory';
import BankOffer from './pages/BankOffer/BankOffer';
import StoreFinder from './pages/StoreFinder/StoreFinder';
import Filter from './pages/ProductCategory/Filter';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import OrderCancel from './pages/OrderDetails/OrderCancel';
import CataloguePage from './pages/CataloguePage/CataloguePage';
import AddProduct from './pages/CataloguePage/AddProduct';
import AboutUs from './pages/AboutContact/AboutUs'
import BulkUpload from './pages/CataloguePage/BulkUpload';
import AddOffers from './pages/CataloguePage/AddOffers';
import { getAllOrder } from './api/OrdersApi';
//Push from new branch -sid

function App() {
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [deliveryOptionSelected, setDeliveryOptionSelected] = useState('');
  const [editID, setEditID] = useState(0);
  const [addressSelected, setAddressSelected] = useState(0);
  const [storeSelected, setStoreSelected] = useState(0)
  const [allProducts, setAllProducts] = useState({
    loaded: false,
    no_of_products: 0,
    products: []
  })
  const [seachedProduct, setSeachedProduct] = useState({
    loaded: false,
  })
  const [userLocation, setUserLocation] = useState('')

  const [userContext, setUserContext] = useState({
    profilePic: defaultUserImage,
    id: '',
    fullName: '',
    mobileNumber: '',
    email: '',
    JWT: '',
    dob: null,
    pincode: ''
  })
  const [userAddress, setUserAddress] = useState({
    loaded: false,
    no_of_address: 0,
    address: []
  })
  const [userCart, setUserCart] = useState([])
  const [cartArray, setCartArray] = useState({
    loaded: false,
    cart: [],
    no_of_carts: 0
  })
  // console.log(cartArray);

  const [modalDataMobile, setModalDataMobile] = useState({
    number: null,
    oldData: '',
    newData: '',
  });
  const [headerData, setHeaderData] = useState({
    header3Cond: false,
    headerText: '',
    categoriesCond: false,
    header3Store: false,
    header3Cart: false,
    header3Profile: false,
  });
  const loc = useLocation()
  const [orderInit, setOrderInit] = useState({
    productId: [],
    quantity: [],
    shippingAddressId: '',
  })
  const [priceBoxDetails, setPriceBoxDetails] = useState({
    cartItemsNumber: 0,
    cartItemsPrice: 0,
    totalDiscount: 0,
    totalDeliveryCharge: 0,
    totalAmount: 0
  })
  const [userOrderData, setUserOrderData] = useState({
    loaded: false,
    no_of_orders: 0,
    orders: []
  })
  const [orderTypes, setOrderTypes] = useState({
    onThewayOrders: [],
    deliveredOrders: [],
    cancelledOrders: []
  })
  const [searchedProduct, setSearchedProduct] = useState({
    loaded: false,
    products: [],
    no_of_products: 0
  })
  const [storeLocations, setStoreLocations] = useState({
    loaded: false,
    location: []
  })

  // console.log(userCart);

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('user'))
    setUserContext(user)
  }, [])

  useEffect(() => {
    let userToken = userContext ? userContext.JWT : ''
    if (userToken) {
      setUserLoggedIn(true)
    } else {
      setUserLoggedIn(false)
    }
  }, [userContext])

  // useEffect(() => {
  //   getUserPic()
  //     .then(res => console.log(res))
  // }, [])

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(userContext))
  }, [userContext])

  useEffect(() => {
    getAllProducts()
      .then(res => {
        setAllProducts({
          loaded: true,
          no_of_products: res.no_of_products,
          products: res.products
        })
      })
  }, [])

  useEffect(() => {
    cartArray.cart.map((product) => (
      getIndiProduct(product)
        .then(res => {
          if (res) {
            // console.log(res);
            let ind = userCart.findIndex(obj => obj._id === res._id)
            if (ind === -1) {
              res["quantity"] = 1
              setUserCart([...userCart, res])
            }
          }
        })
    ))
  }, [cartArray])
  // console.log(userCart);


  // Price Box Details Calculation===========================
  useEffect(() => {
    if (userCart.length > 0) {
      let productNumbers = userCart.reduce((accumulator, current) => accumulator + current.quantity, 0)
      let productPrice = userCart.reduce((accumulator, current) => accumulator + (current.price.mop * current.quantity), 0)
      let totalDiscount = 0
      let totalDeliveryCharge = 0
      let totalAmount = ((productPrice - totalDiscount) + totalDeliveryCharge)
      setPriceBoxDetails(prev => ({ ...prev, cartItemsNumber: productNumbers, cartItemsPrice: productPrice, totalAmount: totalAmount }))
    }
  }, [userCart])

  //Order Filtering Function=========================
  let orders = [...userOrderData.orders]
  let orderNumbers = userOrderData.no_of_orders
  useEffect(() => {
    if (userOrderData.no_of_orders > 0) {
      let notcancelled = userOrderData.orders.filter((item) => (item.status === 'NOSTORETOSERVICE'))
      let delivered = userOrderData.orders.filter(item => (item.status === 'DELIVERED'))
      let cancelled = userOrderData.orders.filter(item => (item.status === 'CANCELLED'))
      setOrderTypes({
        onThewayOrders: notcancelled,
        deliveredOrders: delivered,
        cancelledOrders: cancelled
      })
    }
  }, [])

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
        <UserDataContext.Provider value={{
          userContext,
          setUserContext,
          userAddress,
          setUserAddress,
          userCart,
          setUserCart,
          allProducts,
          setAllProducts,
          userLocation,
          setUserLocation,
          cartArray,
          setCartArray,
          seachedProduct,
          setSeachedProduct,
          orderInit,
          setOrderInit,
          priceBoxDetails,
          setPriceBoxDetails,
          userOrderData,
          setUserOrderData,
          orderTypes,
          setOrderTypes,
          searchedProduct,
          setSearchedProduct,
          storeLocations,
          setStoreLocations
        }}>
          {
            loc.pathname === '/login' || loc.pathname === '/signup' || loc.pathname === '/otp' || loc.pathname === '/adduser' ? ('') : (
              <HeaderBar2 userLoggedIn={userLoggedIn} headerData={headerData} />
            )
          }
          <Routes>
            <Route path='/signup' exact element={<Signup setLoginRedirect={setLoginRedirect} />} />
            <Route path='/login' exact element={<Login setLoginRedirect={setLoginRedirect} />} />
            <Route path='/otp' exact element={<OtpValid loginRedirect={loginRedirect} />} />
            <Route path='/adduser' exact element={<AddUser />} />
            <Route path='/' exact element={<Home setHeaderData={setHeaderData} allProducts={allProducts} />} />
            <Route path='/orders' exact element={<MyOrders ordersList={ordersData} setHeaderData={setHeaderData} featureProducts={allProducts} />} />
            <Route path='/mycart' exact element={<MyCart setHeaderData={setHeaderData} />} />
            <Route path='/myaddress' exact element={<Address setHeaderData={setHeaderData} setEditID={setEditID} />} />
            <Route path='/newaddress' exact element={<NewAddress setHeaderData={setHeaderData} />} />
            <Route path='/editaddress' exact element={<EditAddress setHeaderData={setHeaderData} editID={editID} />} />
            <Route path='/payment' exact element={<Payment setHeaderData={setHeaderData} />} />
            <Route path='/profile' exact element={<Profile setEditID={setEditID} editID={editID} setHeaderData={setHeaderData} ordersData={ordersData} />} />
            <Route path='/edit-account' exact element={<EditAccont setHeaderData={setHeaderData} setModalDataMobile={setModalDataMobile} />} />
            <Route path='/update-details/number' exact element={<UpdateNumber setHeaderData={setHeaderData} modalDataMobile={modalDataMobile} />} />
            <Route path='/update-details/email' exact element={<UpdateEmail setHeaderData={setHeaderData} modalDataMobile={modalDataMobile} />} />
            <Route path='/customer-support' exact element={<CustomerSupport setHeaderData={setHeaderData} />} />
            <Route path='/write-to-us' exact element={<WriteToUS setHeaderData={setHeaderData} />} />
            <Route path='/delivery-option' exact element={<DeliveryOptions setDeliveryOptionSelected={setDeliveryOptionSelected} setHeaderData={setHeaderData} />} />
            <Route path='/home-delivery' exact element={<HomeDelivery setEditID={setEditID} addressSelected={addressSelected} setAddressSelected={setAddressSelected} setHeaderData={setHeaderData} />} />
            <Route path='/store-pickup' exact element={<StorePickUp setHeaderData={setHeaderData} setStoreSelected={setStoreSelected} />} />
            <Route path='/store-near-me' exact element={<StoreNear setHeaderData={setHeaderData} setStoreSelected={setStoreSelected} />} />
            <Route path='/product/:slug' exact element={<ProductPage setHeaderData={setHeaderData} />} />
            <Route path='/:category' exact element={<ProductCategory setHeaderData={setHeaderData} />} />
            <Route path='/:category/filter' exact element={<Filter setHeaderData={setHeaderData} />} />
            <Route path='/:store/:category' exact element={<OfflineProductCategory setHeaderData={setHeaderData} />} />
            <Route path='/bank-offer' exact element={<BankOffer setHeaderData={setHeaderData} />} />
            <Route path='/store-finder' exact element={<StoreFinder setHeaderData={setHeaderData} />} />
            <Route path='/order-details' exact element={<OrderDetails setHeaderData={setHeaderData} />} />
            <Route path='/order-cancel' exact element={<OrderCancel setHeaderData={setHeaderData} />} />
            <Route path='/catelogue-page' exact element={<CataloguePage setHeaderData={setHeaderData} />} />
            <Route path='/catelogue-page/add-product' exact element={<AddProduct setHeaderData={setHeaderData} />} />
            <Route path='/catelogue-page/bulk-upload' exact element={<BulkUpload setHeaderData={setHeaderData} />} />
            <Route path='/catelogue-page/add-offers' exact element={<AddOffers setHeaderData={setHeaderData} />} />
            <Route path='/about-us' exact element={<AboutUs setHeaderData={setHeaderData} />} />
          </Routes>
          <Footer />
        </UserDataContext.Provider>
      </div>
    </>
  );
}

export default App;
