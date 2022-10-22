import React, { useState } from "react";
import { ILoadMoreButton } from "./ILoadMoreButton.model";

export default function LoadMoreButton({
  products,
  handleLoadMoreBtn,
  IS_FINISHED,
}: ILoadMoreButton) {
  return (
    <div>
      {products.length > 0 && (
        <div className="loadMore">
          {IS_FINISHED == false && (
            <button
              className="customBtn loadBtn"
              onClick={() => handleLoadMoreBtn(products.at(-1)._id)}
            >
              <span>&rsaquo;</span> Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
