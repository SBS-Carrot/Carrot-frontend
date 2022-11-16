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
  // https://cotak.tistory.com/112
  // https://goddino.tistory.com/218
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
