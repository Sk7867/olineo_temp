import axios from "axios";

const headers = {
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, x-requested-with",
  "Content-Type": "application/json",
  "Access-Control-Allow-origin": "*",
};

export const addProductCatalogue = async (
  L1Selected,
  L2Selected,
  L3Selected,
  classificationSelected,
  prodPreviewData,
  dynamicHeaderDemo,
  technicalDetailsTable,
  alternateColorArray,
  alternateSpecArray,
  slug,
  immediateComplimentaryArray,
  laterComplimentaryArray
) => {
  let addProductResponse;

  let addProductBody = {
    dynamicHeader: dynamicHeaderDemo,
    name: prodPreviewData.name,
    ean: prodPreviewData.ean,
    slug: slug,
    description: prodPreviewData.description,
    type: L2Selected,
    qty: prodPreviewData.stock,
    hierarchyL1: L1Selected,
    hierarchyL2: L2Selected,
    hierarchyL3: L3Selected,
    classification: classificationSelected,
    productInfo: technicalDetailsTable,
    modelNo: technicalDetailsTable.modelNo,
    brand: prodPreviewData.brand,
    color: prodPreviewData.color,
    HSN: prodPreviewData.HSN,
    inwardDate: prodPreviewData.inwardDate,
    price: {
      mrp: prodPreviewData.price.mrp,
      mop: prodPreviewData.price.mop,
    },
    altProduct: {
      color: alternateColorArray,
      spec: alternateSpecArray
    },
    complimentoryCatgories: {
      immediate: immediateComplimentaryArray,
      later: laterComplimentaryArray
    }
  };
  // console.log(addProductBody);

  await axios.post(`${process.env.REACT_APP_BASE_URL}/product/`, JSON.stringify(addProductBody), { headers })
    .then((res) => {
      addProductResponse = res.data.data.product
    });

  return addProductResponse;
};

export const addBulkOrder = async (order) => {
  let addBulkProductResponse;
  await axios
    .post(`${process.env.REACT_APP_BASE_URL}/product/`, JSON.stringify(order), { headers })
    .then((res) => {
      console.log(res);
      if (res.data.status === "success") addBulkProductResponse = res.data?.data?.product;
    })
    .catch((err) => {
      console.log(err);
    });

  return addBulkProductResponse;
};

//Delete Product From Catalogue
export const deleteProductCatalogue = async (id) => {
  let deleteProductResponse;
  await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/${id}`, { headers }).then((res) => {
    deleteProductResponse = res;
  });

  return deleteProductResponse;
};

//Update Product From Catalogue
export const updateProductCatalogue = async (
  L1Selected,
  L2Selected,
  L3Selected,
  classificationSelected,
  prodPreviewData,
  dynamicHeaderDemo,
  technicalDetailsTable,
  alternateColorArray,
  alternateSpecArray,
  slug,
  immediateComplimentaryArray,
  laterComplimentaryArray
) => {
  let updateProductResponse;
  let updateProductBody = {
    dynamicHeader: dynamicHeaderDemo,
    name: prodPreviewData.name,
    ean: prodPreviewData.ean,
    slug: slug,
    description: prodPreviewData.description,
    type: L2Selected,
    qty: prodPreviewData.stock,
    hierarchyL1: L1Selected,
    hierarchyL2: L2Selected,
    hierarchyL3: L3Selected,
    classification: classificationSelected,
    productInfo: technicalDetailsTable,
    modelNo: technicalDetailsTable.modelNo,
    brand: prodPreviewData.brand,
    color: prodPreviewData.color,
    HSN: prodPreviewData.HSN,
    inwardDate: prodPreviewData.inwardDate,
    price: {
      mrp: prodPreviewData.price.mrp,
      mop: prodPreviewData.price.mop,
    },
    altProduct: {
      color: alternateColorArray,
      spec: alternateSpecArray
    },
    complimentoryCatgories: {
      immediate: immediateComplimentaryArray,
      later: laterComplimentaryArray
    }
  };
  await axios.patch(`${process.env.REACT_APP_BASE_URL}/product/${prodPreviewData.id}`, JSON.stringify(updateProductBody), { headers }).then((res) => {
    updateProductResponse = res;
  });

  return updateProductResponse;
};

// Add Product Images
export const addProductImages = async (id, images) => {
  let addProductImagesResponse;

  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    formData.append("image", images[i]);
  }

  await axios.patch(`${process.env.REACT_APP_BASE_URL}/product/${id}`, formData, { headers }).then((res) => {
    addProductImagesResponse = res;
  });

  return addProductImagesResponse;
};

// Add Product Gallery Images
export const addProductGalleryImages = async (id, images) => {
  let addProductGalleryImagesResponse;
  const formData = new FormData();

  for (let i = 0; i < images.length; i++) {
    formData.append("gallery", images[i]);
  }

  await axios.patch(`${process.env.REACT_APP_BASE_URL}/product/gallery/${id}`, formData, { headers }).then((res) => {
    addProductGalleryImagesResponse = res;
  });

  return addProductGalleryImagesResponse;
};

//Update Product from Add Offers Page
export const updateProductOffers = async (product) => {
  let updateOffersResponse;
  let productID = product._id;
  // console.log(product, productID);
  await axios.patch(`${process.env.REACT_APP_BASE_URL}/product/${productID}`, JSON.stringify(product), { headers }).then((res) => {
    updateOffersResponse = res;
  });
  return updateOffersResponse;
};

