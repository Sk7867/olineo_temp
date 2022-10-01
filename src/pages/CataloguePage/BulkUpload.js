import React, { useEffect, useRef, useState } from "react";
import BulkUploadSection from "./BulkUploadSection";

const BulkUpload = ({ setHeaderData }) => {
  useEffect(() => {
    setHeaderData({
      header3Cond: true,
      headerText: "Catelogue",
      categoriesCond: false,
      header3Store: false,
      header3Cart: false,
      header3Profile: false,
    });
  }, []);

  return (
    <>
      <div className="page_Wrapper page_Margin_Top_Secondary">
        <BulkUploadSection />
      </div>
    </>
  );
};

export default BulkUpload;
