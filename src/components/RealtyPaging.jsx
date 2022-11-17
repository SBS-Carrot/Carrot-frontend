import React, { useState } from "react";
import "../styles/Paging.css";
import Pagination from "react-js-pagination";

const ProductPaging = ({
  totalCount,
  postPerPage,
  pageRangeDisplayed,
  handlePageChange,
  page,
}) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={postPerPage}
      totalItemsCount={totalCount ? totalCount : 0}
      pageRangeDisplayed={pageRangeDisplayed}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default ProductPaging;
