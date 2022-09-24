import { useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deleteProductCatalogue } from '../../api/CatalogueApi';
import { getAllProducts, getSearchedProduct } from '../../api/Product';
import MultiOfferModal from '../../components/ModalComponenr/MultiOfferModal';
import Pagination from '../../components/Pagination/Pagination';
import { UserDataContext } from '../../Contexts/UserContext'

//CSS
import './CateloguePage.css'

const CataloguePage = ({ setHeaderData }) => {
  const matches = useMediaQuery("(min-width:768px)")
  const [modalOpen, setModalOpen] = useState(false)
  // const [allProducts, setAllProducts] = useState({
  //   no_of_products: 0,
  //   products: []
  // })

  const { allProducts, setAllProducts } = useContext(UserDataContext)
  const [searchText, setSearchText] = useState('')
  const [productsToShow, setProductsToShow] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10
  const [totalProducts, setTotalProducts] = useState(1)

  useEffect(() => {
    let prods
    prods = [...allProducts.products]
    setProductsToShow(prods)
  }, [allProducts.loaded, allProducts])



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
    getAllProducts(`limit=${productsPerPage}&page=${currentPage}`)
      .then(res => {
        setAllProducts({
          loaded: true,
          no_of_products: res.no_of_products,
          products: res.products
        })
        setTotalProducts(res.total_products)
      })
  }, [currentPage])

  // console.log(allProducts);

  const validateNumber = (e) => {
    const re = /^[0-9\b]+$/;
    // if (e.target.value === '' || re.test(e.target.value)) {
    //   setPhone(e.target.value)
    // }
  }

  const handleDeleteProduct = async (product) => {
    let text = `Are you sure you want to delete ${product?.item?.name}`;
    if (window.confirm(text) === true) {
      deleteProductCatalogue(product?.item?._id)
        .then(res => res ? (
          getAllProducts(`limit=${productsPerPage}&page=${currentPage}`)
            .then(res => {
              setAllProducts({
                loaded: true,
                no_of_products: res.no_of_products,
                products: res.products
              })
              setTotalProducts(res.total_products)
            })
        ) : (''))
      alert(`${product?.item?.name} is Deleted`)
    } else {
      alert("Product Not Deleted")
    }
  }

  const handleSearchProduct = (e) => {
    e.preventDefault()
    if (searchText) {
      if (isNaN(searchText)) {
        let searchTerm = 'search=' + searchText
        // console.log(searchTerm);
        getSearchedProduct(searchTerm)
          .then(res => {
            setProductsToShow(res.products)
            setTotalProducts(res.total_products)
          })
      } else {
        let searchTerm = 'ean=' + searchText
        // console.log(searchTerm);
        getSearchedProduct(searchTerm)
          .then(res => {
            setProductsToShow(res.products)
            setTotalProducts(res.total_products)
          })
      }
    } else {
      getAllProducts(`limit=${productsPerPage}&page=${currentPage}`)
        .then(res => {
          setProductsToShow(res.products)
          setTotalProducts(res.total_products)
        })
    }
  }

  const handlePageChange = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div className='page_Wrapper page_Margin_Top_Secondary'>
        <div className="catelogue_Page section_Wrapper">
          <div className='catelogue_Page_Header'>
            <h4 className='catelogue_Page_Heading'>Catelogue Page</h4>
            <div className='catelogue_Header_Buttons' >
              <Link to={'/catelogue-page/add-product'} className={'button-Container'}>
                <button type='submit' className='submit-button'><p>Add Product</p></button>
              </Link>
              <Link to={'/catelogue-page/bulk-upload'} className={'button-Container'}>
                <button type='submit' className='submit-button'><p>Add CSV File</p></button>
              </Link>
              <Link to={'/catelogue-page/add-offers'} className={'button-Container'}>
                <button type='submit' className='submit-button'><p>Add Multiple Offers</p></button>
              </Link>
            </div>
          </div>
          <br />
          <div className='d-flex catelogue_Search_Input'>
            <input type="text" className='input-field' placeholder='Search EAN Number or Product Name...' onChange={(e) => setSearchText(e.target.value)} />
            <div className={'button-Container'}>
              <button type='submit' className='submit-button' onClick={handleSearchProduct}><p>Search Product</p></button>
            </div>
          </div>
          <br />
          <div className="catelogue_Page_List">
            {
              allProducts.loaded ? (
                (allProducts.no_of_products > 0) ? (
                  (productsToShow.length > 0) ? (
                    <>
                      {productsToShow.map((item, index) => (
                        <>
                          <div className="catalogue_List_Item" key={index}>
                            <div className='catalogue_List_Content'>
                              {item.ean && (<p>{item.ean}</p>)}
                              {item.name && (<p>{item.name}</p>)}
                              {/* {product.price.mop && (<p>{product.price.mop}</p>)} */}
                            </div>
                            <div className='catalogue_List_Buttons'>
                              <Link to={'/catelogue-page/add-product'} state={item = { item }} className='catalogue_Edit' >
                                Edit
                              </Link>
                              <div className='catalogue_Delete' onClick={() => handleDeleteProduct(item)}>
                                Delete
                              </div>
                            </div>
                          </div>
                          <div className="pagination_Container">
                          </div>
                        </>
                      ))}
                      <Pagination productsPerPage={productsPerPage} totalProducts={totalProducts} pageChange={handlePageChange} />
                    </>
                  ) : (<div>No Such Product Exists</div>)
                ) : (<div>No Products in Database</div>)
              ) : (
                <div>Loading...</div>
              )
            }
          </div>
        </div>
      </div>
      <MultiOfferModal allProducts={allProducts} modalShow={modalOpen} setModalShow={setModalOpen} />
    </>
  )
}

export default CataloguePage