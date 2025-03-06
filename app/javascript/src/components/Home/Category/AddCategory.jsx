import React, { useState } from "react";

import categoriesApi from "../../../apis/categories";

const AddCategory = ({ isOpen, setIsOpen, setCategories }) => {
  const [categoryName, setCategoryName] = useState("");

  if (!isOpen) return null; // Don't render if modal is closed

  const handleAdd = async () => {
    try {
      setCategories(previousValue => [
        ...previousValue,
        { name: categoryName },
      ]);
      await categoriesApi.create({ name: categoryName });

      setIsOpen(false);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">New category</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">
            Category title
          </label>
          <input
            className="mt-2 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category name"
            type="text"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
