import React, { useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";

import AddCategory from "./AddCategory";
import Item from "./Item";

const CategorySidebar = ({
  sidebarIsOpen,
  categories,
  setSearchCategories,
  setCategories,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 h-screen w-[20vw] bg-gray-400 p-10 transition-all duration-300 ease-in-out ${
        sidebarIsOpen ? "left-[5vw]" : "left-[-100%]"
      }`}
    >
      <div className="flex justify-between">
        <Typography className="text-white" style="h3">
          CATEGORIES
        </Typography>
        <Button
          icon={() => <Plus />}
          style="primary"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="space-y-3">
        {categories.length > 0 &&
          categories.map(category => (
            <Item {...{ setSearchCategories, category }} key={category.id} />
          ))}
      </div>
      <AddCategory
        isOpen={isModalOpen}
        setCategories={setCategories}
        setIsOpen={setIsModalOpen}
      />
    </div>
  );
};
export default CategorySidebar;
