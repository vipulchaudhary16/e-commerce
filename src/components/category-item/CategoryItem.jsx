import React from "react";
import "./category-item.styles.scss";

const CategoryItem = ({ category }) => {
  return (
    <div className="category-item-container">
      <div className="background-image"></div>
      <div className="category-body-container">
        <h2>{category.title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
