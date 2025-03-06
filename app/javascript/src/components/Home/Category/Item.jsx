import React, { useState } from "react";

import { Typography } from "antd";

const Item = ({ category, setSearchCategories }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(prev => !prev); // Toggle selection
    setSearchCategories(prevCategories => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter(cat => cat.id !== category.id); // Remove category if already selected
      }

      return [...prevCategories, category]; // Add category if not selected
    });
  };

  return (
    <div
      className={`mt-3 flex h-10 cursor-pointer items-center border-2 border-gray-100 p-2 transition-all duration-200 ${
        isSelected ? "bg-slate-300" : "bg-transparent"
      }`}
      onClick={handleClick}
    >
      <Typography className="text-base">{category.name}</Typography>
    </div>
  );
};

export default Item;
