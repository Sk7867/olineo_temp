import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { Accordion, Carousel } from "react-bootstrap";
import { addToCart, getCartData } from "../../api/Cart";
import { UserDataContext } from "../../Contexts/UserContext";
import { toast } from "react-toastify";

//CSS
import "./ProductPage.css";
//Images
import offerIconYellow from "../../assets/vector/offers_icon_yellow.svg";

//Components
import Section2 from "../../components/Section2/Section2";
import ProductInfoTable from "../../components/ProductInfoTable/ProductInfoTable";
import OfferCard from "../../components/OfferCard/OfferCard";
import AlternateProductBox from "../../components/AlternateProductCard/AlternateProductBox";
import { getProductServiceability, getSearchedProduct } from "../../api/Product";
import SkeletonElement from "../../components/Skeletons/SkeletonElement";
import { addToWishlist } from "../../api/wishlistApi";
import getMixedProducts from "../../hooks/getMixedProducts";



toast.configure();
const ProductPage = ({ setHeaderData }) => {
  const {
    userContext,
    setUserContext,
    userAddress,
    setUserAddress,
    allProducts,
    setCartArray,
    setOrderInit,
    userDefaultAddress,
    setUserDefaultAddress,
    setUserLocation,
    userZip
  } = useContext(UserDataContext);
  const matches = useMediaQuery("(min-width:768px)");
  const nav = useNavigate();
  const { slug } = useParams()
  const [seeMore, setSeeMore] = useState(false);
  const [preOrder, setPreOrder] = useState(false);
  const [previewImageSelected, setPreviewImageSelected] = useState(null);
  const [productInfo, setProductInfo] = useState([]);
  const [productSecondData, setProductSecondData] = useState({})
  const [productData, setProductData] = useState({
    product_loaded: false,
    product_L1: '',
    product_L2: '',
    product_L3: '',
    product_Classification: '',
    product_Id: "",
    product_Ean: "",
    product_Heading: "",
    product_name: "",
    product_color: "",
    product_image: "",
    product_price: {
      mrp: "",
      mop: "",
      discountPrice: "",
    },
    product_Discount: {},
    offer_Deadline: "Deal ends in 14h 17m 04s",
    product_Instock: 0,
    product_image_List: [],
    product_Gallery_Image: [],
    product_Description: [],
  });
  const [colorAlternateProds, setColorAlternateProds] = useState([]);
  const [specAlternateProds, setSpecAlternateProds] = useState([]);
  const [alternateColorean, setAlternateColorean] = useState([]);
  const [alternateSpecean, setAlternateSpecean] = useState([]);
  const [productBankOffers, setProductBankOffers] = useState([]);
  const [produnctSpecText, setProdunctSpecText] = useState('')
  const [discountPercent, setDiscountPercent] = useState('')
  const [comboProductData, setComboProductData] = useState({})
  const [allOffersData, setAllOffersData] = useState([])
  const [discountTillDate, setDiscountTillDate] = useState(null)
  const [days, setDays] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [deliveryEstDays, setDeliveryEstDays] = useState({
    loaded: false,
    value: ''
  })
  const [productPageSuggestProd, setProductPageSuggestProd] = useState([])
  const [enterPinClicked, setEnterPinClicked] = useState(false)
  const [pincode, setPincode] = useState('')
  const [validLength, setValidLength] = useState(false)
  const [btnDisable, setBtnDisable] = useState(true)


  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: "",
      categoriesCond: false,
      header3Store: true,
      header3Cart: true,
      header3Profile: true,
    });
  }, []);

  useEffect(() => {
    let searchTerm = 'slug=' + slug
    setColorAlternateProds([])
    setAlternateColorean([])
    setSpecAlternateProds([])
    setAlternateSpecean([])
    setProductBankOffers([])
    getSearchedProduct(searchTerm)
      .then(res => {
        let product = res.products[0]
        if (product) {
          let images = product.images;
          let splitDesc = product.description.split("~");
          product["quantity"] = 1
          setProductSecondData(product)
          setProductData((prev) => ({
            ...prev,
            product_loaded: true,
            product_L1: product.hierarchyL1,
            product_L2: product.hierarchyL2,
            product_L3: product.hierarchyL3,
            product_Classification: product.classification,
            product_Id: product._id,
            product_Ean: product.ean,
            product_Heading: product.dynamicHeader,
            product_name: product.name,
            product_color: product.color,
            product_price: product.price,
            product_Description: splitDesc,
            product_image_List: images,
            product_Gallery_Image: product.gallery,
            product_Discount: product.discount,
            product_Slug: product.slug,
            product_Instock: product.qty
          }));
          setPreviewImageSelected(images[0]);
          setProductInfo(Object.entries(product.productInfo));
          let colorArray = [...product.altProduct.color]
          // colorArray.unshift(product.ean)
          let specArray = [...product.altProduct.spec];
          // specArray.unshift(product.ean)
          colorArray = colorArray.filter((item) => item);
          specArray = specArray.filter((item) => item);
          setAlternateColorean(colorArray);
          setAlternateSpecean(specArray);
          setAllOffersData(product.offers);
          // setColorAlternateProds([...colorAlternateProds, product])
        }
      })
  }, [slug])

  useEffect(() => {
    setProductPageSuggestProd(getMixedProducts(allProducts.products, allProducts.np1, 10))
  }, [allProducts])

  useEffect(() => {
    alternateColorean.forEach(ean => {
      let ind = colorAlternateProds.findIndex(obj => obj.ean === ean)
      if (ind === -1) {
        let searchTerm = 'ean=' + ean
        getSearchedProduct(searchTerm)
          .then(res => {
            setColorAlternateProds([...colorAlternateProds, res.products[0]])
          })
      }
    })
    alternateSpecean.map(ean => {
      let ind = specAlternateProds.findIndex(obj => obj.ean === ean)
      if (ind === -1) {
        let searchTerm = 'ean=' + ean
        getSearchedProduct(searchTerm)
          .then(res => {
            setSpecAlternateProds([...specAlternateProds, res.products[0]])
          })
      }
    })
  }, [alternateColorean, alternateSpecean]);

  let interval
  useEffect(() => {
    if (productData && productData.product_Discount.flatDiscount && productData.product_Discount.flatDiscount.value) {
      setDiscountPercent(productData.product_Discount.flatDiscount.value)
      let discountToDate = new Date(productData.product_Discount.flatDiscount.to)
      interval = setInterval(() => {
        startTimer(discountToDate)
      }, 1000);
    } else {
      let mrp = parseInt(productData.product_price.mrp)
      let mop = (productData.product_price.discountPrice ? parseInt(productData.product_price.discountPrice) : parseInt(productData.product_price.mop))
      let discount = Math.floor(((mrp - mop) / mrp) * 100)
      setDiscountPercent(discount)
      setDiscountTillDate(null)
    }
    return () => { clearInterval(interval) }
  }, [productData])

  useEffect(() => {
    if (userZip?.loaded && productData.product_loaded) {
      let prodArray = [
        {
          skuId: productData.product_Ean,
          quantity: 1
        }
      ]

      getProductServiceability(userZip.value, prodArray)
        .then(res => {
          if (res) {
            if (res[0].deliverymodes.length > 0) {
              let del = res[0].deliverymodes[1]
              let delTime = del.deliveryTime
              let delTimeInDays = Math.floor(delTime / 24)
              setDeliveryEstDays({
                loaded: true,
                value: delTimeInDays
              })
            }
          }
        })
    }
  }, [productData, userZip])

  const startTimer = (date) => {
    const countDownDate = date.getTime()
    const now = new Date().getTime()
    let countDownOn = true
    const dist = countDownDate - now

    let days = Math.floor(dist / (24 * 60 * 60 * 1000))
    let hours = Math.floor(dist % (24 * 60 * 60 * 1000) / (1000 * 60 * 60))
    let minutes = Math.floor(dist % (60 * 60 * 1000) / (1000 * 60))
    let seconds = Math.floor(dist % (60 * 1000) / (1000))
    if (days < 0) {
      days = 0
    }
    if (hours < 0) {
      hours = 0
    }
    if (minutes < 0) {
      minutes = 0
    }
    if (seconds < 0) {
      seconds = 0
    }
    if (dist < 0) {
      //stop timer
      clearInterval(interval.current)
      setDiscountTillDate(null)
    } else {
      // Update Timer
      setDays(days)
      setHours(hours)
      setMinutes(minutes)
      setSeconds(seconds)
      setDiscountTillDate(date)
    }
  }

  useEffect(() => {
    if (productData.product_loaded &&
      productData.product_Discount &&
      productData.product_Discount.combo &&
      productData.product_Discount.combo.value
    ) {
      let proId = productData.product_Discount.combo.value
      let searchTerm = 'ean=' + proId
      getSearchedProduct(searchTerm)
        .then(res => {
          if (res && res.products) {
            setComboProductData(res?.products[0])
          }
        })
    }
  }, [productData.product_loaded])

  useEffect(() => {
    if (comboProductData) {
      if (Object.keys(comboProductData).length > 0) {
        let offerId = comboProductData._id
        let offerHeading = 'Buy one Get one'
        let offerName = `Get ${comboProductData.name} free on Purchase of ${productData.product_name}`
        let offer_Link = "/bank-offer"
        let offerAvail = "Select eligible card at the time of checkout.~No promo code required to avail the offer.~New Desc,~New DEsc"

        let combo_Offer = {
          offerId: offerId,
          offerHeading: offerHeading,
          offerName: offerName,
          offer_Link: offer_Link,
          offerAvail: offerAvail
        }
        let offerLen = allOffersData.findIndex(obj => obj.offerId === combo_Offer.offerId)
        if (offerLen === -1) {
          setAllOffersData([...allOffersData, combo_Offer])
        }
      }
    }
  }, [comboProductData])

  const handleLength = (length) => {
    if (length === 5) {
      setValidLength(true)
    } else {
      setValidLength(false)
    }
  }

  const validateNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPincode(e.target.value)
    }
  }

  const formSubmit = (e) => {
    e.preventDefault();
    if (pincode !== '') {
      setUserLocation(prev => ({
        ...prev,
        loaded: true,
        useThis: true,
        address: { city: '', state: '', zip: pincode }
      }))
      setUserDefaultAddress(prev => ({
        ...prev,
        loaded: false,
        useThis: false
      }))
    }
  }

  const validateForm = () => (
    (pincode !== '') && validLength ? setBtnDisable(false) : setBtnDisable(true)
  )

  const handleAddToCart = (id) => {
    let userToken = userContext ? userContext.JWT : "";
    if (userToken) {
      addToCart(id).then((res) =>
        res
          ? (
            toast.success("Product Added to Cart")
          )
          : ""
      );
    } else {
      nav("/login");
    }
  };

  const handleAddToWishlist = (id) => {
    let userToken = userContext ? userContext.JWT : "";
    if (userToken) {
      addToWishlist(id).then((res) =>
        res
          ? (toast.success("Product Added to Wishlist"),
            getCartData().then((res) =>
              res
                ? setCartArray({
                  loaded: true,
                  no_of_carts: res.no_of_carts,
                  cart: res.cart,
                  combo: res.combo
                })
                : ""
            ))
          : ""
      );
    } else {
      nav("/login");
    }
  }

  const handleOrderInit = (e) => {
    e.preventDefault();
    let userToken = userContext ? userContext.JWT : "";
    if (userToken) {
      let productId = [productData.product_Id]
      let quantity = [1]
      setOrderInit(prev => ({
        ...prev,
        productId: productId,
        quantity: quantity
      }))
      setCartArray(prev => ({
        ...prev,
        loaded: true,
        no_of_carts: 1,
        cart: [productSecondData],
        combo: [],
      }))
      nav('/delivery-option')
    } else {
      nav("/login");
    }
  }

  useEffect(() => {
    if (productInfo.length > 0) {
      productInfo.map((elem) => {
        if (elem[0] === 'specText') {
          setProdunctSpecText(elem[1])
        }
      })
    }
  }, [productInfo])

  return (
    <>
      <div className="page_Wrapper page_Margin_Top  page_Margin_Top_Secondary">
        <div className="desk_Page_Wrapper">
          <aside className="side_Section section_Wrapper product_Side_Section">
            <div className="image_Preview_Side_Section">
              <div className="image_Preview_Selected section_Wrapper">
                {productData.product_loaded === false ? <SkeletonElement type={"productPreviewImage"} /> : <img src={previewImageSelected} alt="" />}
              </div>
              <div className="product_Thumbnails">
                {productData.product_loaded === false ? (
                  [1, 2, 3, 4, 5].map((n) => <SkeletonElement type={"productThumbnail"} key={n} />)
                ) : (
                  <>
                    {productData.product_image_List.map((image, index) => (
                      <div className="thumbnail" key={index} onMouseOver={() => setPreviewImageSelected(image)}>
                        <img src={image} alt="" />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="product_Side_Section_Buttons">
              {
                productData.product_Classification === 'Coming Soon' ? (
                  <div className="submit_Button_2">
                    <button type="submit" className="submit-button">
                      <p>Notify when product releases</p>
                    </button>
                  </div>
                ) : (
                  <div className="submit_Button_2" onClick={() => handleAddToWishlist(productData.product_Id)}>
                    <button type="submit" className="submit-button">
                      <p>Add to Wishlist</p>
                    </button>
                  </div>
                )
              }
              <div className="button_Set_2">
                {
                  (productData.product_Classification === 'Coming Soon') ? (
                    preOrder ? (
                      <div className="submit_Button_1">
                        <button type="submit" className="submit-button">
                          <p>Pay in Advance</p>
                        </button>
                      </div>
                    ) : ('')) : (
                    <>
                      {userContext ? (
                        <div className="submit_Button_3">
                          <button type="submit" className="submit-button" onClick={() => handleAddToCart(productData.product_Id)}>
                            <p>Add to cart</p>
                          </button>
                        </div>
                      ) : (
                        <Link to={"/login"} className="submit_Button_3">
                          <button type="submit" className="submit-button">
                            <p>Add to cart</p>
                          </button>
                        </Link>
                      )}
                      <div>
                        <button type="submit" className="submit-button" onClick={handleOrderInit} >
                          <p>Buy now</p>
                        </button>
                      </div>
                    </>
                  )
                }
              </div>
            </div>
          </aside>
          <div className="order_Page_Right product_Page_Right">
            <div className="product_Section_1 section_Wrapper">
              <h3 className="product_Name">
                {productData.product_loaded === false ? <SkeletonElement type={"productTitle"} /> : productData.product_Heading ? productData.product_Heading : productData.product_name}
              </h3>
              {/* Porduct Image preview section */}
              <div className="product_Preview_Section">
                <Carousel
                  interval={5000}
                // infiniteLoop
                // showThumbs={false}
                // showStatus={false}
                >
                  {productData.product_image_List.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img className="d-block w-100 product_Carousel_Image" src={image} alt={`product-${index}`} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <div className="product_Price_Desc">
                {productData.product_loaded ? (
                  <>
                    <p className="product_Discount_Price">₹{!isNaN(productData.product_price.discountPrice) ? productData.product_price.discountPrice : productData.product_price.mop}</p>
                    <p className="product_Original_Price">₹{productData.product_price.mrp}</p>
                    <p className="product_Discount">{discountPercent}%</p>
                    <p className="product_Availability">
                      {preOrder ? "" : productData.product_Instock > 10 ? "In stock" : productData.product_Instock < 10 && productData.product_Instock >= 1 ? "Few in stock" : "Out of stock"}
                    </p>
                  </>
                ) : (
                  <SkeletonElement type={"productTitle"} />
                )}
              </div>

              <div className="product_Offer_Counter">
                {productData.product_loaded ? (
                  productData.product_Classification === 'Coming Soon' ? (
                    preOrder ? (<p>Deal is 40% Claimed</p>) : ('')
                  ) : (
                    discountTillDate ? (
                      // (days + hours + minutes + seconds <= 0) ? (
                      <p>Deal ends in {days}d {hours}h {minutes}m {seconds}s</p>
                      // ) : (<></>)
                    ) : (<></>)
                  )
                ) :
                  (<SkeletonElement type={"productTitle"} />)}
                {/* {productData.product_loaded ? (
                  discountTillDate ? (
                    <p>{productData.product_Classification === 'Coming Soon' ? (preOrder ? ("Deal is 40% Claimed") : ('')) : `Deal ends in ${countDownTimer.days}d ${countDownTimer.hours}h ${countDownTimer.minutes}m ${countDownTimer.seconds}s`} </p>
                  ) : (<></>)
                ) : (<SkeletonElement type={"productTitle"} />)} */}
              </div>
              {matches ? (
                (allOffersData.length > 0) && (
                  <div className="product_Offer_Section">
                    <div className="product_Offer_Header">
                      <img src={offerIconYellow} alt="" />
                      <h5 className="product_Section_Heading">Offers</h5>
                    </div>
                    <div className="product_Offer_Cards_Container">
                      <div className="product_Offer_Cards_Wrapper">
                        {allOffersData.map((offer, index) => (
                          <OfferCard offer={offer} key={offer.offerId} />
                        ))}
                      </div>
                    </div>
                  </div>)
              ) : (
                ""
              )}
            </div>

            <div className="product_Alternate_Section section_Wrapper">
              <div className="mobile_None tab_Display_Block">
                <div className="product_Alternate_Section_Header">
                  {productData.product_loaded ? (
                    <p>
                      Color : <span>{productData.product_color}</span>
                    </p>
                  ) : (<SkeletonElement type={"productTitle"} />)}
                </div>
                <div className="product_Alternate_Section_Body">
                  {
                    productData.product_loaded ? (
                      (colorAlternateProds.length > 0) && colorAlternateProds.map((product) => product.images[0] && <AlternateProductBox key={product._id} product={product} />)
                    ) : (
                      <div className="d-flex ">
                        {[1, 2, 3, 4, 5].map((n) => <SkeletonElement type={"productThumbnail"} key={n} />)}
                      </div>
                    )
                  }
                </div>
                <div className="product_Alternate_Section_Footer">
                  <>
                    {productData.product_loaded ? (
                      produnctSpecText && (
                        <p>
                          Size : <span>{` ${produnctSpecText}`}</span>
                        </p>
                      )
                    ) : (
                      <div className="d-flex width-100">
                        {[1, 2, 3, 4, 5].map((n) => <SkeletonElement type={"productTitle"} key={n} />)}
                      </div>
                    )}
                  </>
                </div>
                <div className="product_Alternate_Footer_Cards">
                  {
                    productData.product_loaded ? (
                      (specAlternateProds.length > 0) && specAlternateProds.map((product) => product.productInfo.specText && <AlternateProductBox key={product.id} product={product} dataOnly={true} />)
                    ) : (
                      <SkeletonElement type={"productTitle"} />
                    )
                  }
                </div>
              </div>

              <Accordion className="tab_None">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {
                      productData.product_loaded ? (
                        <p>
                          Color : <span>{productData.product_color}</span>
                        </p>
                      ) : (
                        <SkeletonElement type={"productTitle"} />
                      )
                    }
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="product_Offer_Cards_Container">
                      <div className="product_Offer_Cards_Wrapper">
                        {(colorAlternateProds.length > 0) && colorAlternateProds.map((product) => (
                          <AlternateProductBox key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="product_Delivery_Section section_Wrapper">
              <div className="product_Delivery_Details">
                {
                  userContext && userContext.JWT ? (
                    <>
                      {
                        deliveryEstDays.loaded ? (
                          <p>
                            Delivery In <span>{deliveryEstDays.value} Days</span>
                          </p>
                        ) : (
                          <SkeletonElement type={"productTitle"} />
                        )
                      }
                    </>
                  ) : (<>
                    {
                      enterPinClicked ? (<>
                        {
                          deliveryEstDays.loaded ? (
                            <p>
                              Delivery In <span>{deliveryEstDays.value} Days</span>
                            </p>
                          ) : (
                            <form className="product_Delivery_Pin-form" onChange={validateForm} onSubmit={formSubmit}>
                              <div className='product_Delivery_Pincode_Input'>
                                {
                                  matches ? (
                                    <input type='tel' name="Phone" id="phone" maxLength={6} className='input-field' value={pincode} placeholder='Enter pincode...' onChange={(e) => { validateNumber(e); handleLength(e.target.value.length) }} />
                                  ) : (
                                    <input type='number' name="Phone" id="phone" maxLength={6} className='input-field' value={pincode} placeholder='Enter pincode...' onChange={(e) => { setPincode(e.target.value); handleLength(e.target.value.length) }} />
                                  )
                                }
                              </div>
                              <div className='product_Delivery_Submit_Btn'>
                                <button className='submit-button' type='submit' disabled={btnDisable}><p>Apply</p></button>
                              </div>
                            </form>
                          )
                        }
                      </>) : (
                        <>
                          <p onClick={() => setEnterPinClicked(true)}>
                            Enter Pincode
                          </p>
                        </>
                      )
                    }
                  </>)
                }

              </div>

              <div className="tab_None">
                <div className="product_Page_Availability">
                  {
                    productData.product_loaded ? (
                      <p className="cart_Product_Availability">{productData.product_Classification === 'Coming Soon' ? 'Coming Soon' : 'In stock'}</p>
                    ) : (
                      <SkeletonElement type={"productTitle"} />
                    )
                  }
                </div>
                {
                  productData.product_Classification === 'Coming Soon' ? (
                    <div className="product_Delivery_Footer submit_Button_2">
                      <button type="submit" className="submit-button">
                        <p>Notify when product releases</p>
                      </button>
                    </div>
                  ) : (
                    <div className="product_Delivery_Footer submit_Button_2" onClick={() => handleAddToWishlist(productData.product_Id)}>
                      <button type="submit" className="submit-button">
                        <p>Add to Wishlist</p>
                      </button>
                    </div>
                  )
                }
              </div>

            </div>

            {!matches ? (
              <div className="product_Offer_Section">
                <div className="product_Offer_Header">
                  <img src={offerIconYellow} alt="" />
                  <h5 className="product_Section_Heading">Offers</h5>
                </div>
                <div className="product_Offer_Cards_Container">
                  <div className="product_Offer_Cards_Wrapper">
                    {allOffersData.map((offer, index) => (
                      <OfferCard offer={offer} key={offer.offerId} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="product_Description_Section section_Wrapper">
              <div className="product_Description_Header d-flex justify-content-between align-items-center">
                <h5 className="product_Section_Heading">Description</h5>
                {seeMore ? (
                  <p className="description_See_Less" onClick={() => setSeeMore(false)}>
                    See less
                  </p>
                ) : (
                  ""
                )}
              </div>

              <ul className={`product_Description_Wrapper d-flex flex-column ${seeMore ? "description_Expanded" : ""}`}>
                {productData.product_Description.map((element, index) => (
                  <li key={index} className="product_Description">
                    {element}
                  </li>
                ))}
              </ul>
              <p className={`description_See_More ${seeMore ? "description_Expanded" : ""}`} onClick={() => setSeeMore(true)}>
                See more
              </p>
            </div>

            {/* Product Information Table */}
            {productInfo.length > 0 && (
              <div className="productPage_Table section_Wrapper">
                <h5 className="product_Section_Heading">Product Information</h5>
                <ProductInfoTable product_Information={productInfo} />
              </div>)}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="productPage_Image_Gallery section_Wrapper">
          <h5 className="product_Section_Heading">Product Image Gallery</h5>
          <div className="image_Gallery_Wrapper">
            {productData.product_loaded
              ? productData.product_Gallery_Image.map((image, index) => <img src={image} key={index} className={`product_Gallery_Image`} alt="" />)
              : [1, 2, 3, 4, 5].map((n) => <SkeletonElement type={"productBanner"} key={n} />)}
          </div>
        </div>
        <Section2 id={"Top-sellers-sec"} heading="Suggested products" productData={allProducts} productArray={productPageSuggestProd} />
        {/* Floating Footer */}
        {!matches && (
          <div className="floating_Footer">
            <div className="floating_Footer_Wrapper product_Page_Floating_Wrapper">
              {
                productData.product_Classification === 'Coming Soon' ? (
                  <>
                    <div className="floating_Footer_Center">
                      {
                        productData.product_Classification === 'Coming Soon' ? (
                          <div className="submit_Button_2">
                            <button type="submit" className="submit-button">
                              <p>Notify when product releases</p>
                            </button>
                          </div>
                        ) : (
                          <div className="submit_Button_2" onClick={() => handleAddToWishlist(productData.product_Id)}>
                            <button type="submit" className="submit-button">
                              <p>Add to Wishlist</p>
                            </button>
                          </div>
                        )
                      }
                    </div>
                  </>
                ) : (
                  <>
                    <div className="floating_Footer_Left">
                      {userContext ? (
                        <p className="floater_Add_Cart" onClick={() => handleAddToCart(productData.product_Id)}>
                          Add to cart
                        </p>
                      ) : (
                        <Link to={"/login"} className="floater_Add_Cart">
                          Add to cart
                        </Link>
                      )}
                    </div>
                    <div className="floating_Footer_Right">
                      <button type="submit" className="submit-button" onClick={handleOrderInit}>
                        <p>Buy now</p>
                      </button>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPage;
