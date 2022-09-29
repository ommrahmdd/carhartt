import React from "react";
import { Link } from "react-router-dom";
type propsType = {
  title: string;
  to?: string;
};
export default function Title({ title, to }: propsType) {
  return (
    <div className="title">
      <h5>{title}</h5>
      {to && (
        <Link to={`/${to}`} className="title__link">
          <span>See More</span>
          <i className="fa-solid fa-arrow-right-long"></i>
        </Link>
      )}
    </div>
  );
}
