import React from "react";
import "./category-item.styles.scss";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const navigate = useNavigate()
  const handleNavigation = () => {
    navigate(category.route)
  };

  return (
    <div className="category-item-container">
      <div className="background-image"></div>
      <div className="category-body-container"
        onClick={() => { handleNavigation() }}
      >
        <h2>{category.title}</h2>
        <p
        >Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
