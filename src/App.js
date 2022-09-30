//Dependencies
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { getUser, getUserPic } from "./api/Auth";
import { getCartData } from "./api/Cart";
import { getAllProducts, getIndiProduct, getProductServiceability, getSearchedProduct } from "./api/Product";
import "./App.css";

//Image
import defaultUserImage from "./assets/png/default_user_image.png";
import product1 from "./assets/png/product_1.png";
import product3 from "./assets/png/product_3.png";
import userImage from "./assets/png/userImage.png";

//Components
import { getAddress } from "./api/Address";
import { getAllOrder, getOrderStatus } from "./api/OrdersApi";
import Footer from "./components/Footer/Footer";
import HeaderBar2 from "./components/HeaderBar2/HeaderBar2";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { UserDataContext } from "./Contexts/UserContext";
import AboutUs from "./pages/AboutContact/AboutUs";
import Address from "./pages/Address/Address";
import EditAddress from "./pages/Address/EditAddress";
import HomeDelivery from "./pages/Address/HomeDelivery";
import MyAddress from "./pages/Address/MyAddress";
import NewAddress from "./pages/Address/NewAddress";
import AddUser from "./pages/addUser";
import BankOffer from "./pages/BankOffer/BankOffer";
import AddOffers from "./pages/CataloguePage/AddOffers";
import AddProduct from "./pages/CataloguePage/AddProduct";
import BulkUpload from "./pages/CataloguePage/BulkUpload";
import CataloguePage from "./pages/CataloguePage/CataloguePage";
import CustomerSupport from "./pages/CustomerSupport/CustomerSupport";
import WriteToUS from "./pages/CustomerSupport/WriteToUs";
import Cancellation from "./pages/Dashboard/Cancellation";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardAddBannerImage from "./pages/Dashboard/DashboardAddBannerImage";
import DashboardAddDiscount from "./pages/Dashboard/DashboardAddDiscount";
import DashboardAddProduct from "./pages/Dashboard/DashboardAddProduct";
import DashboardAddProductCsvFile from "./pages/Dashboard/DashboardAddProductCsvFile";
import DashboardAddShop from "./pages/Dashboard/DashboardAddShop";
import DashboardAlluser from "./pages/Dashboard/DashboardAlluser";
import DashboardBannerImages from "./pages/Dashboard/DashboardBanner";
import DashboardDiscount from "./pages/Dashboard/DashboardDiscount";
import DashBoardHome from "./pages/Dashboard/DashBoardHome";
import DashboardOrders from "./pages/Dashboard/DashboardOrders";
import DashboardProducts from "./pages/Dashboard/DashboardProducts";
import DashboardShop from "./pages/Dashboard/DashBoardShop";
import Payments from "./pages/Dashboard/Payments";
import Quirys from "./pages/Dashboard/Quirys";
import EditAccont from "./pages/EditAccount/EditAccount";
import Update from "./pages/EditAccount/Update";
import UpdateEmail from "./pages/EditAccount/UpdateEmail";
import UpdateNumber from "./pages/EditAccount/UpdateNumber";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DeliveryOptions from "./pages/MyCart/DeliveryOptions";
import MyCart from "./pages/MyCart/MyCart";
import MyOrders from "./pages/MyOrders/MyOrders";
import OrderSuccess from "./pages/MyOrders/OrderSuccess";
import OrderCancel from "./pages/OrderDetails/OrderCancel";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import OtpValid from "./pages/OtpValid";
import Payment from "./pages/Payment/Payment";
import StoreNear from "./pages/Pickup/StoreNear";
import StorePickUp from "./pages/Pickup/StorePickUp";
import PrivateRouteCustomer from "./pages/PrivateRoute/PrivateRouteCustomer";
import PrivateRouteSignup from "./pages/PrivateRoute/PrivateRouteSignup";
import Filter from "./pages/ProductCategory/Filter";
import OfflineProductCategory from "./pages/ProductCategory/OfflineProductCategory";
import ProductCategory from "./pages/ProductCategory/ProductCategory";
import ProductPage from "./pages/ProductPage/ProductPage";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/Signup";
import StoreFinder from "./pages/StoreFinder/StoreFinder";
import MyWishlist from "./pages/Wishlist/MyWishlist";
import IFDHome from "./pages/IFD_Home";
import IFD from "./pages/IFD_Home/IFD";

function App() {
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [deliveryOptionSelected, setDeliveryOptionSelected] = useState("");
  const [editID, setEditID] = useState(0);
  const [addressSelected, setAddressSelected] = useState(0);
  const [allProducts, setAllProducts] = useState({
    loaded: false,
    no_of_products: 0,
    products: [],
  });
  const [seachedProduct, setSeachedProduct] = useState({
    loaded: false,
  });
  const [userLocation, setUserLocation] = useState("");

  const [userContext, setUserContext] = useState({
    profilePic: defaultUserImage,
    id: "",
    fullName: "",
    mobileNumber: "",
    email: "",
    JWT: "",
    dob: null,
    pincode: "",
  });

  const [userAddress, setUserAddress] = useState({
    loaded: false,
    no_of_address: 0,
    address: [],
  });
  const [userComboCart, setUserComboCart] = useState([]);
  const [cartArray, setCartArray] = useState({
    loaded: false,
    cart: [],
    combo: [],
    no_of_carts: 0,
  });

  const [modalDataMobile, setModalDataMobile] = useState({
    number: null,
    oldData: "",
    newData: "",
  });
  const [headerData, setHeaderData] = useState({
    header3Cond: false,
    headerText: "",
    categoriesCond: false,
    header3Store: false,
    header3Cart: false,
    header3Profile: false,
  });
  const loc = useLocation();
  const [orderInit, setOrderInit] = useState({
    productId: [],
    quantity: [],
    shippingAddressId: "",
    coupon: "",
    type: "",
    storeId: ""
  });
  const [priceBoxDetails, setPriceBoxDetails] = useState({
    cartItemsNumber: 0,
    cartItemsPrice: 0,
    totalDiscount: 0,
    totalDeliveryCharge: 0,
    totalAmount: 0,
  });
  const [userOrderData, setUserOrderData] = useState({
    loaded: false,
    no_of_orders: 0,
    orders: [],
  });
  const [searchedProduct, setSearchedProduct] = useState({
    loaded: false,
    products: [],
    no_of_products: 0,
  });
  const [storeLocations, setStoreLocations] = useState({
    loaded: false,
    no_of_stores: 0,
    stores: [],
  });
  const [userWishlist, setUserWishlist] = useState({
    loaded: false,
    no_of_wishlist_items: 0,
    wishlist_items: [],
  });
  const [userSaveForLater, setUserSaveForLater] = useState({
    loaded: false,
    no_of_save_for_later_items: 0,
    save_for_later_items: [],
  });
  const [userDefaultAddress, setUserDefaultAddress] = useState({
    loaded: false,
    address: {},
    no_of_address: 0,
  });
  const [deliveryEstDays, setDeliveryEstDays] = useState({
    loaded: false,
    value: [],
  });
  const [deliveryCharges, setDeliveryCharges] = useState("");

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    setUserContext(user);
  }, []);

  useEffect(() => {
    let cartData = JSON.parse(sessionStorage.getItem("cart"));
    if (cartData) {
      setCartArray(cartData);
    }
  }, []);

  let userToken = userContext?.JWT;
  useEffect(() => {
    if (userToken) {
      setTimeout(() => {
        getUser(userToken).then((res) => {
          if (res) {
            let user = res;
            setUserContext((prev) => ({
              ...prev,
              id: user._id,
              fullName: user.fullName,
              mobileNumber: user.mobileNumber,
              email: user.email,
              dob: user.dob,
            }));
          }
        });

        getUserPic(userToken).then((res) => {
          if (res) {
            setUserContext((prev) => ({
              ...prev,
              profilePic: res,
            }));
          }
        });
      }, 500);
    }
  }, [userToken]);

  useEffect(() => {
    let userToken = userContext ? userContext.JWT : "";
    if (userToken) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [userContext]);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(userContext));
  }, [userContext]);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartArray));
  }, [cartArray]);

  useEffect(() => {
    getAllProducts().then((res) => {
      setAllProducts({
        loaded: true,
        no_of_products: res.no_of_products,
        products: res.products,
      });
    });
  }, []);

  useEffect(() => {
    if (userContext && userContext.JWT) {
      getAddress().then((res) => {
        if (res) {
          setUserAddress({
            loaded: true,
            no_of_address: res.no_of_address,
            address: res.address,
          });
        }
      });
    }
  }, [userContext]);

  useEffect(() => {
    if (cartArray.combo && cartArray.combo.length > 0) {
      cartArray.combo.map((product) => {
        let searchTerm = "ean=" + product;
        getSearchedProduct(searchTerm).then((res) => {
          if (res.no_of_products > 0) {
            let product = res.products[0];
            let ind = userComboCart.findIndex((obj) => obj._id === product._id);
            if (ind === -1) {
              setUserComboCart([...userComboCart, product]);
            }
          }
        });
      });
    }
  }, [cartArray]);

  // Price Box Details Calculation===========================
  useEffect(() => {
    if (cartArray.no_of_carts > 0) {
      let productNumbers = cartArray.cart.reduce((accumulator, current) => accumulator + current.quantity, 0);
      let productPrice = cartArray.cart.reduce((accumulator, current) => accumulator + current.price.mrp * current.quantity, 0);
      let totalDiscount = cartArray.cart.reduce(
        (accumulator, current) => accumulator + (current.price.mrp - (current.price.discountPrice ? current.price.discountPrice : current.price.mop)) * current.quantity,
        0
      );
      let totalDeliveryCharge = deliveryCharges;
      let totalAmount = productPrice - totalDiscount + totalDeliveryCharge;
      setPriceBoxDetails((prev) => ({
        ...prev,
        cartItemsNumber: productNumbers,
        cartItemsPrice: productPrice,
        totalAmount: totalAmount,
        totalDiscount: totalDiscount,
        totalDeliveryCharge: totalDeliveryCharge,
      }));
    } else {
      setPriceBoxDetails({
        cartItemsNumber: 0,
        cartItemsPrice: 0,
        totalDiscount: 0,
        totalDeliveryCharge: 0,
        totalAmount: 0,
      });
    }
  }, [cartArray, deliveryCharges]);

  //Calculate delivery total delivery charges of all items in cart
  useEffect(() => {
    let totalDelPrice = 0;
    if (deliveryEstDays && deliveryEstDays.loaded && deliveryEstDays.value.length > 0) {
      deliveryEstDays.value.forEach((order) => {
        if (order.deliverymodes.length > 0) {
          let delPrice = parseInt(order.deliverymodes[0].deliveryCost.value) + 40;
          totalDelPrice = totalDelPrice + delPrice;
        }
      });
    }
    setDeliveryCharges(totalDelPrice);
  }, [deliveryEstDays]);

  useEffect(() => {
    if (userAddress && userAddress.loaded) {
      if (userAddress.no_of_address === 0) {
        setUserDefaultAddress({
          loaded: true,
          address: {},
          no_of_address: 0,
        });
      } else if (userAddress.no_of_address === 1) {
        setUserDefaultAddress({
          loaded: true,
          address: userAddress.address[0],
          no_of_address: 1,
        });
      } else if (userAddress.no_of_address > 1) {
        let useAdd = userAddress.address.filter((add) => add.isDefault === true);
        setUserDefaultAddress({
          loaded: true,
          address: useAdd[0],
          no_of_address: 1,
        });
      }
    }
  }, [userAddress]);

  return (
    <>
      <ScrollToTop />
      <div className="App">
        <UserDataContext.Provider
          value={{
            userContext,
            setUserContext,
            userAddress,
            setUserAddress,
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
            searchedProduct,
            setSearchedProduct,
            storeLocations,
            setStoreLocations,
            userWishlist,
            setUserWishlist,
            userComboCart,
            setUserComboCart,
            userSaveForLater,
            setUserSaveForLater,
            userDefaultAddress,
            setUserDefaultAddress,
            deliveryEstDays,
            setDeliveryEstDays,
            deliveryCharges,
            setDeliveryCharges,
          }}
        >
          {loc.pathname === "/login" ||
            loc.pathname === "/signup" ||
            loc.pathname === "/otp" ||
            loc.pathname === "/adduser" ||
            loc.pathname === "/admin-home" ||
            loc.pathname === "/admin-add-product" ||
            loc.pathname === "/admin-add-product-csv" ||
            loc.pathname === "/admin-add-shop" ||
            loc.pathname === "/admin-discounts" ||
            loc.pathname === "/admin-add-discount" ||
            loc.pathname === "/admin-orders" ||
            loc.pathname === "/admin" ||
            loc.pathname === "/admin-products" ||
            loc.pathname === "/admin-add-banner" ||
            loc.pathname === "/admin-banner" ||
            loc.pathname === "/admin-alluser" ||
            loc.pathname === "/admin-shops" ||
            loc.pathname === "/admin-query" ||
            loc.pathname === "/admin-payments" ||
            loc.pathname === "/admin-cancellation" ||
            loc.pathname === "/indian-festival-days" ? (
            ""
          ) : (
            <HeaderBar2 userLoggedIn={userLoggedIn} headerData={headerData} />
          )}
          <Routes>
            <Route path="/signup" exact element={<Signup setLoginRedirect={setLoginRedirect} />} />
            <Route path="/login" exact element={<Login setLoginRedirect={setLoginRedirect} />} />
            <Route path="/otp" exact element={<OtpValid loginRedirect={loginRedirect} />} />
            <Route path="/adduser" exact element={<AddUser />} />
            <Route path="/" exact element={<Home setHeaderData={setHeaderData} allProducts={allProducts} />} />
            <Route path="/orders" exact element={<MyOrders setHeaderData={setHeaderData} featureProducts={allProducts} />} />
            <Route path="/orders/success" exact element={<OrderSuccess setHeaderData={setHeaderData} featureProducts={allProducts} />} />
            <Route
              path="/mycart"
              exact
              element={
                <PrivateRouteCustomer>
                  <MyCart setHeaderData={setHeaderData} />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path="/myaddress"
              exact
              element={
                <PrivateRouteCustomer>
                  <Address setHeaderData={setHeaderData} setEditID={setEditID} />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path="/newaddress"
              exact
              element={
                <PrivateRouteCustomer>
                  <NewAddress setHeaderData={setHeaderData} />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path="/editaddress"
              exact
              element={
                <PrivateRouteCustomer>
                  <EditAddress setHeaderData={setHeaderData} editID={editID} />
                </PrivateRouteCustomer>
              }
            />
            <Route path="/payment" exact element={<Payment setHeaderData={setHeaderData} />} />
            <Route
              path="/profile"
              exact
              element={
                <PrivateRouteCustomer>
                  <Profile setEditID={setEditID} editID={editID} setHeaderData={setHeaderData} />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path="/edit-account"
              exact
              element={
                <PrivateRouteCustomer>
                  <EditAccont setHeaderData={setHeaderData} setModalDataMobile={setModalDataMobile} />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path="/update-details/number"
              exact
              element={
                <PrivateRouteCustomer>
                  <UpdateNumber setHeaderData={setHeaderData} modalDataMobile={modalDataMobile} />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path="/update-details/email"
              exact
              element={
                <PrivateRouteCustomer>
                  <UpdateEmail setHeaderData={setHeaderData} modalDataMobile={modalDataMobile} />
                </PrivateRouteCustomer>
              }
            />
            <Route path="/customer-support" exact element={<CustomerSupport setHeaderData={setHeaderData} />} />
            <Route path="/write-to-us" exact element={<WriteToUS setHeaderData={setHeaderData} />} />
            <Route
              path="/delivery-option"
              exact
              element={
                <PrivateRouteCustomer>
                  <DeliveryOptions setDeliveryOptionSelected={setDeliveryOptionSelected} setHeaderData={setHeaderData} />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path="/home-delivery"
              exact
              element={<HomeDelivery setEditID={setEditID} addressSelected={addressSelected} setAddressSelected={setAddressSelected} setHeaderData={setHeaderData} />}
            />
            <Route path="/store-pickup" exact element={<StorePickUp setHeaderData={setHeaderData} />} />
            <Route path="/store-near-me" exact element={<StoreNear setHeaderData={setHeaderData} />} />
            <Route path="/product/:slug" exact element={<ProductPage setHeaderData={setHeaderData} />} />
            <Route path="/:category" exact element={<ProductCategory setHeaderData={setHeaderData} />} />
            <Route path="/:category/f/:slug" exact element={<ProductCategory setHeaderData={setHeaderData} />} />
            <Route path="/:category/filter" exact element={<Filter setHeaderData={setHeaderData} />} />
            <Route path="/store/:id" exact element={<OfflineProductCategory setHeaderData={setHeaderData} />} />
            <Route path="/bank-offer" exact element={<BankOffer setHeaderData={setHeaderData} />} />
            <Route path="/store-finder" exact element={<StoreFinder setHeaderData={setHeaderData} />} />
            <Route
              path="/order-details"
              exact
              element={
                <PrivateRouteCustomer>
                  <OrderDetails setHeaderData={setHeaderData} />
                </PrivateRouteCustomer>
              }
            />
            <Route
              exact
              path="/order-cancel"
              element={
                <PrivateRouteCustomer>
                  <OrderCancel setHeaderData={setHeaderData} />
                </PrivateRouteCustomer>
              }
            />
            <Route path="/catelogue-page" exact element={<CataloguePage setHeaderData={setHeaderData} />} />
            <Route path="/catelogue-page/add-product" exact element={<AddProduct setHeaderData={setHeaderData} />} />
            <Route path="/catelogue-page/bulk-upload" exact element={<BulkUpload setHeaderData={setHeaderData} />} />
            <Route path="/catelogue-page/add-offers" exact element={<AddOffers setHeaderData={setHeaderData} />} />
            <Route path="/about-us" exact element={<AboutUs setHeaderData={setHeaderData} />} />
            <Route path="/wishlist" exact element={<MyWishlist setHeaderData={setHeaderData} />} />
            <Route element={<Dashboard />}>
              <Route exact path="/admin-home" element={<DashBoardHome />} />
              <Route exact path="/admin-products" element={<DashboardProducts />} />
              <Route exact path="/admin-banner" element={<DashboardBannerImages />} />
              <Route exact path="/admin-add-banner" element={<DashboardAddBannerImage />} />
              <Route exact path="/admin-add-product" element={<DashboardAddProduct />} />
              <Route exact path="/admin-add-product-csv" element={<DashboardAddProductCsvFile />} />
              <Route exact path="/admin-add-shop" element={<DashboardAddShop />} />
              <Route exact path="/admin-discounts" element={<DashboardDiscount />} />
              <Route exact path="/admin-add-discount" element={<DashboardAddDiscount />} />
              <Route exact path="/admin-orders" element={<DashboardOrders />} />
              <Route exact path="/admin-alluser" element={<DashboardAlluser />} />
              <Route exact path="/admin-shops" element={<DashboardShop />} />
              <Route exact path="/admin-query" element={<Quirys />} />
              <Route exact path="/admin-payments" element={<Payments />} />
              <Route exact path="/admin-cancellation" element={<Cancellation />} />
            </Route>
            <Route path="/indian-festival-days" exact element={<IFDHome userLoggedIn={userLoggedIn} setHeaderData={setHeaderData} />} />
          </Routes>
          {loc.pathname === "/admin" ||
            loc.pathname === "/admin-home" ||
            loc.pathname === "/admin-add-product" ||
            loc.pathname === "/admin-add-product-csv" ||
            loc.pathname === "/admin-discounts" ||
            loc.pathname === "/admin-add-discount" ||
            loc.pathname === "/admin-add-shop" ||
            loc.pathname === "/admin-orders" ||
            loc.pathname === "/admin-products" ||
            loc.pathname === "/admin-banner" ||
            loc.pathname === "/admin-add-banner" ||
            loc.pathname === "/admin-alluser" ||
            loc.pathname === "/admin-shops" ||
            loc.pathname === "/admin-query" ||
            loc.pathname === "/admin-payments" ||
            loc.pathname === "/admin-cancellation" ||
            loc.pathname === "/indian-festival-days" ? null : (
            <Footer />
          )}
        </UserDataContext.Provider>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover transition={Bounce} />
    </>
  );
}

export default App;
