import React, { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'
import { Slide, toast, ToastContainer } from 'react-toastify'
import { addProductCatalogue } from '../../api/CatalogueApi';

//CSS
import './CateloguePage.css'


toast.configure()
const AddProduct = ({ setHeaderData }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [product, setProduct] = useState({
    name: '',
    ID: '',
    EAN: '',
    description: '',
    type: '',
    price: '',
    stock: '',
    weight: '',
    size: '',
    brand: '',
    modelYear: '',
  })
  const [images, setImages] = useState('')
  const [imagesArray, setImagesArray] = useState([])
  const nav = useNavigate()
  const loc = useLocation()
  // console.log(imagesArray);

  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: 'Catelogue',
      categoriesCond: false,
      header3Store: false,
      header3Cart: false,
      header3Profile: false,
    })
  }, []);

  useEffect(() => {
    if (loc.state) {
      let product = loc.state.product
      setProduct({
        name: product.name,
        ID: product._id,
        description: product.description,
        stock: product.stock,
        weight: product.productInfo.weight
      })
    }
  }, [loc])
  // console.log(product);



  const handleInput = (prop, e) => {
    e.target
      ? setProduct({ ...product, [prop]: e.target.value })
      : setProduct({ ...product, [prop]: e.label })
  }

  const formSubmit = (e) => {
    e.preventDefault();
    addProductCatalogue(product, imagesArray)
      .then(res => res ? (
        // console.log(res),
        toast.success('Product Added Successfully'),
        setProduct({
          name: '',
          ID: '',
          EAN: '',
          description: '',
          type: '',
          price: '',
          stock: '',
          weight: '',
          size: '',
          brand: '',
          modelYear: '',
        }),
        nav('/catelogue-page')

      ) : (
        toast.error('Incomplete Data')))
  }

  const setImageLink = (e) => {
    var imageLink = e.target.value
    // console.log(imageLink);
    setImages(imageLink)
  }

  useEffect(() => {
    var imagesA = images.split(',')
    setImagesArray(imagesA)
    // console.log(imagesA);
  }, [images])


  // const handleAddInput = () =>> {
  //   setProduct({ ...product, new : prop })
  // }

  // const handleRemoveInput = (prop) => {
  //   delete product.prop
  // }

  // const validateNumber = (e) => {
  //   const re = /^[0-9\b]+$/;
  //   if (e.target.value === '' || re.test(e.target.value)) {
  //     handleInput("stock", e.target.value)
  //   }
  // }
  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <div className="catelogue_Page section_Wrapper">
          <div className="catelogue_Page_Header">
            <h4 className='catelogue_Page_Heading'>Catelogue Add Product</h4>
          </div>
          <form className="catelogue_Form" onSubmit={formSubmit}>
            <div className="catelogue_Form_Group">
              <input type='text' name="Product Name" id="Product Name" value={product.name} className='input-field' placeholder='Enter Product Name' onChange={(value) => handleInput("name", value)} />
              <input type='text' name="Product EAN" id="Product EAN" value={product.EAN} className='input-field' placeholder='Enter Product EAN' onChange={(value) => handleInput("EAN", value)} />
              <input type='text' name="Product Description" id="Product Description" value={product.description} className='input-field' placeholder='Enter Product Description' onChange={(value) => handleInput("description", value)} />
              <input type='text' name="Product Type" id="Product Type" value={product.type} className='input-field' placeholder='Enter Product Type' onChange={(value) => handleInput("type", value)} />
              <input type='text' name="Product Price" id="Product Price" value={product.price} className='input-field' placeholder='Enter Product Price' onChange={(value) => handleInput("price", value)} />
            </div>
            <div className="catelogue_Form_Group">
              <input type='text' name="Product Weight" id="Product Weight" className='input-field' placeholder='Enter Product Weight' value={product.weight} onChange={(value) => handleInput("weight", value)} />
              <input type='text' name="Product Brand" id="Product Brand" className='input-field' placeholder='Enter Product Brand' value={product.brand} onChange={(value) => handleInput("brand", value)} />
              <input type='text' name="Product Model Year" id="Product Model Year" className='input-field' placeholder='Enter Product Model Year' value={product.modelYear} onChange={(value) => handleInput("modelYear", value)} />
            </div>
            <div className="catelogue_Form_Group">
              {
                matches ? (
                  <input type='tel' name="Product Stock" id="Product Stock" className='input-field' placeholder='Enter Product Stock' onChange={(value) => handleInput("stock", value)} />
                ) : (
                  <input type='number' name="Product Stock" id="Product Stock" className='input-field' placeholder='Enter Product Stock' value={product.stock} onChange={(value) => handleInput("stock", value)} />
                )
              }
            </div>
            <div className="catelogue_Form_Group">
              <input type='url' name="Product Images" id="Product Images" className='input-field' placeholder='Enter Product Images URL' value={images} onChange={(e) => setImageLink(e)} />
              <p className="catalogue_Hint">Add comma seperated Image links</p>
            </div>
            <div className={'button-Container'}>
              <button type='submit' className='submit-button'><p>Submit</p></button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </>
  )
}

export default AddProduct