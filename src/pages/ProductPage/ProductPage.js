import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import { Accordion, Dropdown, Carousel } from 'react-bootstrap'
import { addToCart, getCartData } from '../../api/Cart'
import { UserDataContext } from '../../Contexts/UserContext'

//CSS
import './ProductPage.css'
//Images
import defaultImage from '../../assets/png/product_1.png'
import defaultImage2 from '../../assets/png/product_3.png'
import offerIconYellow from '../../assets/vector/offers_icon_yellow.svg'


//Components
import Section2 from '../../components/Section2/Section2'
import ProductInfoTable from '../../components/ProductInfoTable/ProductInfoTable'
import OfferCard from '../../components/OfferCard/OfferCard'
import AlternateProductBox from '../../components/AlternateProductCard/AlternateProductBox'
import { getIndiProduct } from '../../api/Product'
import SkeletonElement from '../../components/Skeletons/SkeletonElement'



const ProductPage = ({ setHeaderData }) => {
  const { userContext, setUserContext, userAddress, setUserAddress, userCart, setUserCart, allProducts, setCartArray } = useContext(UserDataContext)
  const matches = useMediaQuery("(min-width:768px)")
  const loc = useLocation()
  const [seeMore, setSeeMore] = useState(false)
  const [preOrder, setPreOrder] = useState(false)
  const [previewImageSelected, setPreviewImageSelected] = useState(null)
  const [productInfo, setProductInfo] = useState([])
  const [productData, setProductData] = useState({
    product_loaded: false,
    product_Id: '',
    product_name: '',
    product_image: '',
    product_price: '',
    product_Original_Price: '',
    offer_Deadline: 'Deal ends in 14h 17m 04s',
    product_Instock: 255,
    product_image_List: [],
    product_Description: [],
    product_Alternate: [
      {
        id: 1,
        alternate_Heading: '4GB RAM & 64GB Storage',
        alternate_Color: 'Red',
        alternate_Price: '1,499',
        stock_Available: true,
      },
      {
        id: 2,
        alternate_Heading: '6GB RAM & 128GB Storage',
        alternate_Color: 'White',
        alternate_Price: '1,499',
        stock_Available: false,
      },
      {
        id: 3,
        alternate_Image: defaultImage,
        alternate_Color: 'Green',
        alternate_Price: '1,499',
        stock_Available: false,
      },
      {
        id: 4,
        alternate_Image: defaultImage,
        alternate_Color: 'Blue',
        alternate_Price: '1,499',
        stock_Available: true,
      },
      {
        id: 5,
        alternate_Image: defaultImage,
        alternate_Color: 'Red',
        alternate_Price: '1,499',
        stock_Available: true,
      },
      {
        id: 6,
        alternate_Image: defaultImage,
        alternate_Color: 'White',
        alternate_Price: '1,499',
        stock_Available: true,
      },
      {
        id: 7,
        alternate_Image: defaultImage,
        alternate_Color: 'Green',
        alternate_Price: '1,499',
        stock_Available: false,
      },
      {
        id: 9,
        alternate_Image: defaultImage,
        alternate_Color: 'Blue',
        alternate_Price: '1,499',
        stock_Available: true,
      },
    ]
  })
  // console.log(loc);

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: '',
      categoriesCond: false,
      header3Store: true,
      header3Cart: true,
      header3Profile: true,
    })
  }, []);

  useEffect(() => {
    if (loc.state) {
      let product = loc.state.product
      if (product) {
        // let allProductImages = Object.values(product.otherImages)
        // allProductImages.unshift(productImage1)
        getIndiProduct(product._id)
          .then(res => {
            if (res) {
              let productImage1 = res.images
              let splitDesc = res.description.split('|')
              setProductData(prev => ({
                ...prev,
                product_loaded: true,
                product_Id: res._id,
                product_name: res.name,
                product_price: res.price,
                product_Description: splitDesc,
                product_image_List: productImage1,
              }))
              setPreviewImageSelected(
                productImage1[0]
              )
              setProductInfo(Object.entries(res.productInfo))
            }
          })
      }
    }
  }, [loc])
  // console.log(productData);


  const sec5Data = [
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
    {
      product_image: defaultImage,
      product_name: 'Item name',
      product_price: '₹1000',
      classes: {
        boxClass: 'bg_pink carousel_card',
      }
    },
  ]

  const bankOffersData = [
    {
      offer_Name: 'Bank offer',
      offer_desc: '₹499 discount on ICICI Bank Credit Cards',
      offer_Link: '/bank-offer',
      offerAvail: [
        'Select eligible card at the time of checkout.',
        'No promo code required to avail the offer.'
      ],
    },
    {
      offer_Name: 'Bank offer',
      offer_desc: '₹499 discount on HDFC Bank Credit Cards',
      offer_Link: '/bank-offer',
      offerAvail: [
        'Select eligible card at the time of checkout.',
        'No promo code required to avail the offer.'
      ],
    },
    {
      offer_Name: 'Bank offer',
      offer_desc: '₹499 discount on SBI Bank Credit Cards',
      offer_Link: '/bank-offer',
      offerAvail: [
        'Select eligible card at the time of checkout.',
        'No promo code required to avail the offer.'
      ],
    },
    {
      offer_Name: 'Bank offer',
      offer_desc: '₹499 discount on HDFC Bank Credit Cards',
      offer_Link: '/bank-offer',
      offerAvail: [
        'Select eligible card at the time of checkout.',
        'No promo code required to avail the offer.'
      ],
    },
  ]

  const handleAddToCart = (id) => {
    addToCart(id)
      .then(res => {
        if (res) {
          console.log(res);
          getCartData()
            .then(res => {
              if (res) {
                setCartArray(res)
              }
            })
        }
      })
    // console.log(userContext);
  }


  return (
    <div className='page_Wrapper page_Margin_Top  page_Margin_Top_Secondary'>
      <div className='desk_Page_Wrapper'>

        <aside className="side_Section section_Wrapper product_Side_Section">
          <div className="image_Preview_Side_Section">
            <div className='image_Preview_Selected section_Wrapper'>
              {productData.product_loaded === false ? (
                <SkeletonElement type={'productPreviewImage'} />
              ) : (
                <img src={previewImageSelected} alt="" />
              )}
            </div>
            <div className="product_Thumbnails">
              {productData.product_loaded === false ? (
                [1, 2, 3, 4, 5].map((n) => (<SkeletonElement type={'productThumbnail'} key={n} />))
              ) : (
                <>
                  {
                    productData.product_image_List.map((image, index) => (
                      <div className="thumbnail" key={index} onMouseOver={() => setPreviewImageSelected(image)} >
                        <img src={image} alt="" />
                      </div>
                    ))
                  }
                </>
              )}
            </div>
          </div>
          <div className="product_Side_Section_Buttons">
            <div className="submit_Button_2">
              <button type='submit' className='submit-button'><p>{
                preOrder ? ('Notify when product releases') : ('Add to Wishlist')
              }</p></button>
            </div>
            <div className="button_Set_2">
              {
                preOrder ? (
                  <div className='submit_Button_1'>
                    <button type='submit' className='submit-button'><p>Pay in Advance</p></button>
                  </div>
                ) : (
                  <>
                    {userContext ? (
                      <div className='submit_Button_3'>
                        <button type='submit' className='submit-button' onClick={() => handleAddToCart(productData.product_Id)} ><p>Add to cart</p></button>
                      </div>
                    ) : (
                      <Link to={'/login'} className='submit_Button_3'>
                        <button type='submit' className='submit-button'><p>Add to cart</p></button>
                      </Link>
                    )}
                    <div>
                      <button type='submit' className='submit-button'><p>Buy now</p></button>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </aside>
        <div className='order_Page_Right product_Page_Right'>

          <div className="product_Section_1 section_Wrapper">
            {productData.product_loaded === false ? (
              <SkeletonElement type={"productTitle"} />
            ) : (
              <h3 className='product_Name'>{productData.product_name}</h3>
            )}
            {/* Porduct Image preview section */}
            <div className="product_Preview_Section">
              <Carousel
                interval={5000}
              // infiniteLoop
              // showThumbs={false}
              // showStatus={false}
              >
                {
                  productData.product_image_List.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100 product_Carousel_Image"
                        src={image}
                        alt={`product-${index}`}
                      />
                    </Carousel.Item>
                  ))
                }
              </Carousel>
            </div>
            <div className="product_Price_Desc">
              <p className="product_Discount_Price">
                ₹{productData.product_price}
              </p>
              <p className="product_Original_Price">
                ₹{parseInt(productData.product_price) + 2000}
              </p>
              <p className="product_Availability">
                {
                  preOrder ? ('') : (
                    (productData.product_Instock > 10) ? 'In stock' :
                      (productData.product_Instock < 10 && productData.product_Instock >= 1) ? 'Few in stock' : 'Out of stock'
                  )
                }
              </p>
            </div>
            <div className="product_Offer_Counter">
              <p>{
                preOrder ? ('Deal is 40% Claimed') : (`${productData.offer_Deadline}`)
              } </p>
            </div>
            {
              matches ? (
                <div className="product_Offer_Section">
                  <div className="product_Offer_Header">
                    <img src={offerIconYellow} alt="" />
                    <h5 className='product_Section_Heading'>Offers</h5>
                  </div>
                  <div className="product_Offer_Cards_Container">
                    <div className="product_Offer_Cards_Wrapper">
                      {
                        bankOffersData.map((offer, index) => (
                          <OfferCard offer={offer} key={index} />
                        ))
                      }
                    </div>
                  </div>
                </div>
              ) : ('')
            }
          </div>

          <div className="product_Alternate_Section section_Wrapper">
            {
              matches ? (
                <>
                  <div className="product_Alternate_Section_Header">
                    <p>Color : <span> Black</span></p>
                  </div>
                  <div className="product_Alternate_Section_Body">
                    {
                      productData.product_Alternate.map((product) => (
                        product.alternate_Image && (
                          <AlternateProductBox key={product.id} product={product} />
                        )
                      ))
                    }
                  </div>
                  <div className="product_Alternate_Section_Footer">
                    <p>
                      Size :
                      <span> 4GB RAM & 64GB Storgae</span>
                    </p>

                  </div>
                  <div className='product_Alternate_Footer_Cards'>
                    {
                      productData.product_Alternate.map((product) => (
                        product.alternate_Heading && (
                          <AlternateProductBox key={product.id} product={product} dataOnly={true} />
                        )
                      ))
                    }
                  </div>
                </>
              ) : (
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <p>Color : <span> Black</span></p>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="product_Offer_Cards_Container">
                        <div className="product_Offer_Cards_Wrapper">
                          {
                            productData.product_Alternate.map((product) => (
                              <AlternateProductBox key={product.id} product={product} />
                            ))
                          }
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )
            }
          </div>

          <div className="product_Delivery_Section section_Wrapper">
            <p className='product_Delivery_Details'>
              <span>Free delivery: Thursday, Feb 24 </span>
              on orders over ₹499
            </p>
            {
              !matches ? (
                <>
                  <p className='cart_Product_Availability product_Page_Availability'>In stock</p>
                  <div className="product_Delivery_Footer submit_Button_2">
                    <button type='submit' className='submit-button'><p>{
                      preOrder ? (
                        'Notify when product releases'
                      ) : (
                        'Add to Wishlist'
                      )
                    }</p></button>
                  </div>
                </>
              ) : ('')
            }
          </div>

          {
            !matches ? (
              <div className="product_Offer_Section">
                <div className="product_Offer_Header">
                  <img src={offerIconYellow} alt="" />
                  <h5 className='product_Section_Heading'>Offers</h5>
                </div>
                <div className="product_Offer_Cards_Container">
                  <div className="product_Offer_Cards_Wrapper">
                    {
                      bankOffersData.map((offer, index) => (
                        <OfferCard offer={offer} key={index} />
                      ))
                    }
                  </div>
                </div>
              </div>
            ) : ('')
          }

          <div className='product_Description_Section section_Wrapper'>
            <div className='product_Description_Header d-flex justify-content-between align-items-center'>
              <h5 className='product_Section_Heading'>Description</h5>
              {seeMore ? (<p className='description_See_Less' onClick={() => setSeeMore(false)}>See less</p>) : ('')}
            </div>

            <ul className={`product_Description_Wrapper d-flex flex-column ${seeMore ? 'description_Expanded' : ''}`}>
              {
                productData.product_Description.map((element, index) => (
                  <li key={index} className='product_Description' >{element}</li>
                ))
              }
            </ul>
            <p className={`description_See_More ${seeMore ? 'description_Expanded' : ''}`} onClick={() => setSeeMore(true)} >See more</p>
          </div>

          {/* Product Information Table */}
          <div className="productPage_Table section_Wrapper">
            <h5 className='product_Section_Heading'>Product Information</h5>
            <ProductInfoTable product_Information={productInfo} />
          </div>

        </div>
      </div>

      {/* Image Gallery */}
      <div className="productPage_Image_Gallery section_Wrapper">
        <h5 className='product_Section_Heading'>Product Image Gallery</h5>
        <div className="image_Gallery_Wrapper">
          {
            productData.product_image_List.map((image, index) => (
              <img src={image} key={index} className={`product_Gallery_Image`} alt="" />
            ))
          }
        </div>
      </div>
      <Section2
        id={'Top-sellers-sec'}
        heading='Suggested products'
        productData={sec5Data}
      />
      {/* Floating Footer */}
      {!matches && (
        <div className="floating_Footer">
          <div className="floating_Footer_Wrapper product_Page_Floating_Wrapper">
            <div className="floating_Footer_Left">
              {userContext ? (
                <p className='floater_Add_Cart' onClick={() => handleAddToCart(productData.product_Id)} >Add to cart</p>
              ) : (
                <Link to={'/login'} className='floater_Add_Cart' >Add to cart</Link>
              )}
            </div>
            <div className="floating_Footer_Right">
              <button type='submit' className='submit-button'><p>Buy now</p></button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductPage