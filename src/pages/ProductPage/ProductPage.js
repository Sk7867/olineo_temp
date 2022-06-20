import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { Accordion, Dropdown, Carousel } from "react-bootstrap";
import { addToCart, getCartData } from "../../api/Cart";
import { UserDataContext } from "../../Contexts/UserContext";
import { Slide, toast, ToastContainer } from "react-toastify";

//CSS
import "./ProductPage.css";
//Images
import defaultImage from "../../assets/png/product_1.png";
import defaultImage2 from "../../assets/png/product_3.png";
import offerIconYellow from "../../assets/vector/offers_icon_yellow.svg";

//Components
import Section2 from "../../components/Section2/Section2";
import ProductInfoTable from "../../components/ProductInfoTable/ProductInfoTable";
import OfferCard from "../../components/OfferCard/OfferCard";
import AlternateProductBox from "../../components/AlternateProductCard/AlternateProductBox";
import { getIndiProduct, getSearchedProduct } from "../../api/Product";
import SkeletonElement from "../../components/Skeletons/SkeletonElement";
import ScartchCardComp from "../../components/ScratchCard/ScartchCard";

toast.configure();
const ProductPage = ({ setHeaderData }) => {
  const { userContext, setUserContext, userAddress, setUserAddress, userCart, setUserCart, allProducts, setCartArray, setOrderInit } = useContext(UserDataContext);
  const matches = useMediaQuery("(min-width:768px)");
  const nav = useNavigate();
  const { slug } = useParams()
  const [seeMore, setSeeMore] = useState(false);
  const [preOrder, setPreOrder] = useState(false);
  const [previewImageSelected, setPreviewImageSelected] = useState(null);
  const [productInfo, setProductInfo] = useState([]);
  const [productData, setProductData] = useState({
    product_loaded: false,
    product_L1: '',
    product_L2: '',
    product_L3: '',
    product_Classification: '',
    product_Id: "",
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
    product_Instock: 255,
    product_image_List: [],
    product_Gallery_Image: [],
    product_Description: [],
  });
  const [colorAlternateProds, setColorAlternateProds] = useState([]);
  const [specAlternateProds, setSpecAlternateProds] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [alternateColorean, setAlternateColorean] = useState([]);
  const [alternateSpecean, setAlternateSpecean] = useState([]);
  const [productBankOffers, setProductBankOffers] = useState([]);
  const [produnctSpecText, setProdunctSpecText] = useState('')
  const [discountPercent, setDiscountPercent] = useState('')
  const [comboProductData, setComboProductData] = useState({})
  const [allOffersData, setAllOffersData] = useState([])

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
        let product = res[0]
        if (product) {
          let images = product.images;
          let splitDesc = product.description.split("~");
          setProductData((prev) => ({
            ...prev,
            product_loaded: true,
            product_L1: product.hierarchyL1,
            product_L2: product.hierarchyL2,
            product_L3: product.hierarchyL3,
            product_Classification: product.classification,
            product_Id: product._id,
            product_Heading: product.dynamicHeader,
            product_name: product.name,
            product_color: product.color,
            product_price: product.price,
            product_Description: splitDesc,
            product_image_List: images,
            product_Gallery_Image: product.gallery,
            product_Discount: product.discount,
            product_Slug: product.slug
          }));
          setPreviewImageSelected(images[0]);
          setProductInfo(Object.entries(product.productInfo));
          let colorArray = [...product.altProduct.color]
          colorArray.unshift(product.ean)
          let specArray = [...product.altProduct.spec];
          specArray.unshift(product.ean)
          colorArray = colorArray.filter((item) => item);
          specArray = specArray.filter((item) => item);
          setAlternateColorean(colorArray);
          setAlternateSpecean(specArray);
          setProductBankOffers(product.offers);
        }
      })
  }, [slug])

  useEffect(() => {
    alternateColorean.map(ean => {
      let demo = allProducts.products.filter((item) => item.ean === ean)
      if (demo.length === 0) return null
      let item = colorAlternateProds.filter(obj => obj.ean === demo[0].ean)
      // console.log(demo);
      if (item.length === 0) {
        setColorAlternateProds([...colorAlternateProds, demo[0]])
      }
    })
    alternateSpecean.map(ean => {
      let demo = allProducts.products.filter((item) => item.ean === ean)
      if (demo.length === 0) return null
      let item = specAlternateProds.filter(obj => obj.ean === demo[0].ean)
      if (item.length === 0) {
        setColorAlternateProds([...specAlternateProds, demo[0]])
      }
    })
  }, [alternateColorean, alternateSpecean]);
  // console.log(colorAlternateProds);

  console.log(productData);

  useEffect(() => {
    if (productData && productData.product_Discount.flatDiscount && productData.product_Discount.flatDiscount.value) {
      setDiscountPercent(productData.product_Discount.flatDiscount.value)
    } else {
      let mrp = parseInt(productData.product_price.mrp)
      let mop = (productData.product_price.discountPrice ? parseInt(productData.product_price.discountPrice) : parseInt(productData.product_price.mop))
      let discount = Math.floor(((mrp - mop) / mrp) * 100)
      setDiscountPercent(discount)
    }
  }, [productData])

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
          setComboProductData(...res)
        })
    }
  }, [productData.product_loaded])
  // console.log(comboProductData);

  useEffect(() => {
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
  }, [comboProductData])
  // console.log(allOffersData);
  const sec5Data = [
    {
      product_image: defaultImage,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: defaultImage,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: defaultImage,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: defaultImage,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: defaultImage,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: defaultImage,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: defaultImage,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: defaultImage,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
    {
      product_image: defaultImage,
      product_name: "Item name",
      product_price: "₹1000",
      classes: {
        boxClass: "bg_pink carousel_card",
      },
    },
  ];

  const bankOffersData = [
    {
      offer_Name: "Bank offer",
      offer_desc: "₹499 discount on ICICI Bank Credit Cards",
      offer_Link: "/bank-offer",
      offerAvail: ["Select eligible card at the time of checkout.", "No promo code required to avail the offer."],
    },
    {
      offer_Name: "Bank offer",
      offer_desc: "₹499 discount on HDFC Bank Credit Cards",
      offer_Link: "/bank-offer",
      offerAvail: ["Select eligible card at the time of checkout.", "No promo code required to avail the offer."],
    },
    {
      offer_Name: "Bank offer",
      offer_desc: "₹499 discount on SBI Bank Credit Cards",
      offer_Link: "/bank-offer",
      offerAvail: ["Select eligible card at the time of checkout.", "No promo code required to avail the offer."],
    },
    {
      offer_Name: "Bank offer",
      offer_desc: "₹499 discount on HDFC Bank Credit Cards",
      offer_Link: "/bank-offer",
      offerAvail: ["Select eligible card at the time of checkout.", "No promo code required to avail the offer."],
    },
  ];

  const handleAddToCart = (id) => {
    let userToken = userContext ? userContext.JWT : "";
    if (userToken) {
      if (productData.product_loaded && (Object.keys(comboProductData).length > 0)) {
        [productData.product_Id, comboProductData._id].forEach(id => {
          addToCart(id).then((res) =>
            res
              ? (toast.success("Product Added to Cart"),
                getCartData().then((res) =>
                  res
                    ? setCartArray({
                      loaded: true,
                      no_of_carts: res.no_of_carts,
                      cart: res.cart,
                    })
                    : ""
                ))
              : ""
          );
        })
      } else {
        addToCart(id).then((res) =>
          res
            ? (toast.success("Product Added to Cart"),
              getCartData().then((res) =>
                res
                  ? setCartArray({
                    loaded: true,
                    no_of_carts: res.no_of_carts,
                    cart: res.cart,
                  })
                  : ""
              ))
            : ""
        );
      }
    } else {
      nav("/login");
    }
  };

  const handleOrderInit = (e) => {
    e.preventDefault();
    let productId = [productData.product_Id, comboProductData._id]
    let quantity = [1, 1]
    setOrderInit(prev => ({
      ...prev,
      productId: productId,
      quantity: quantity
    }))
    setCartArray({
      loaded: true,
      no_of_carts: 2,
      cart: [productData.product_Id, comboProductData._id]
    })
    nav('/delivery-option')
    // console.log(data);
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
              <div className="submit_Button_2">
                <button type="submit" className="submit-button">
                  <p>{productData.product_Classification === 'Coming Soon' ? "Notify when product releases" : "Add to Wishlist"}</p>
                </button>
              </div>
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
              {productData.product_loaded ? (
                <div className="product_Price_Desc">
                  <p className="product_Discount_Price">₹{!isNaN(productData.product_price.discountPrice) ? productData.product_price.discountPrice : productData.product_price.mop}</p>
                  <p className="product_Original_Price">₹{productData.product_price.mrp}</p>

                  <p className="product_Discount">{discountPercent}%</p>

                  <p className="product_Availability">
                    {preOrder ? "" : productData.product_Instock > 10 ? "In stock" : productData.product_Instock < 10 && productData.product_Instock >= 1 ? "Few in stock" : "Out of stock"}
                  </p>
                </div>
              ) : (
                <SkeletonElement type={"productTitle"} />
              )}

              <div className="product_Offer_Counter">
                <p>{preOrder ? "Deal is 40% Claimed" : `${productData.offer_Deadline}`} </p>
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
              {matches ? (
                <>
                  <div className="product_Alternate_Section_Header">
                    <p>
                      Color : <span>{productData.product_color}</span>
                    </p>
                  </div>
                  <div className="product_Alternate_Section_Body">{(colorAlternateProds.length > 0) && colorAlternateProds.map((product) => product.images[0] && <AlternateProductBox key={product._id} product={product} />)}</div>
                  {produnctSpecText && (
                    <>
                      <div className="product_Alternate_Section_Footer">
                        <p>
                          Size : <span>{` ${produnctSpecText}`}</span>
                        </p>
                      </div>
                    </>
                  )}
                  <div className="product_Alternate_Footer_Cards">
                    {(specAlternateProds.length > 0) && specAlternateProds.map((product) => product.alternate_Heading && <AlternateProductBox key={product.id} product={product} dataOnly={true} />)}
                  </div>
                </>
              ) : (
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <p>
                        Color : <span>{productData.product_color}</span>
                      </p>
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
              )}
            </div>

            <div className="product_Delivery_Section section_Wrapper">
              <p className="product_Delivery_Details" onClick={() => setModalShow(true)}>
                <span>Free delivery: Thursday, Feb 24 </span>
                on orders over ₹499
              </p>
              {!matches ? (
                <>
                  <p className="cart_Product_Availability product_Page_Availability">{productData.product_Classification === 'Coming Soon' ? 'Coming Soon' : 'In stock'}</p>
                  <div className="product_Delivery_Footer submit_Button_2">
                    <button type="submit" className="submit-button">
                      <p>{(productData.product_Classification === 'Coming Soon') ? "Notify when product releases" : "Add to Wishlist"}</p>
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
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
            <div className="productPage_Table section_Wrapper">
              <h5 className="product_Section_Heading">Product Information</h5>
              <ProductInfoTable product_Information={productInfo} />
            </div>
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
        <Section2 id={"Top-sellers-sec"} heading="Suggested products" productData={sec5Data} />
        {/* Floating Footer */}
        {!matches && (
          <div className="floating_Footer">
            <div className="floating_Footer_Wrapper product_Page_Floating_Wrapper">
              {
                productData.product_Classification === 'Coming Soon' ? (
                  <>
                    <div className="floating_Footer_Center">
                      <div className="submit_Button_2">
                        <button type="submit" className="submit-button">
                          <p>{(productData.product_Classification === 'Coming Soon') ? "Notify when product releases" : "Add to Wishlist"}</p>
                        </button>
                      </div>
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
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover transition={Slide} />
      <ScartchCardComp modalShow={modalShow} setModalShow={setModalShow} />
    </>
  );
};

export default ProductPage;
