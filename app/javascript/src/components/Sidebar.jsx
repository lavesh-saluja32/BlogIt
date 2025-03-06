import React, { useState, useEffect } from "react";

import { List, MatrixDots, Draft, LeftArrow } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import { useHistory, useLocation } from "react-router-dom";

import CategorySidebar from "./Home/Category";

import authApi from "../apis/auth";
import { resetAuthTokens } from "../apis/axios";
import categoriesApi from "../apis/categories";
import { getFromLocalStorage, setToLocalStorage } from "../utils/storage";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const userName = getFromLocalStorage("authUserName") || "Oliver Smith";
  const userEmail = getFromLocalStorage("authEmail") || "oliver@example.com";

  const navigateToCreatePost = link => {
    history.push(link);
  };

  const handleQueryParams = () => {
    const params = new URLSearchParams(location.search);
    if (searchCategories.length > 0) {
      const categoryNames = searchCategories.map(cat => cat.name).join(",");
      params.set("category_names", categoryNames);
    } else {
      params.delete("category_names");
    }
    history.push({ search: params.toString() });
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    handleQueryParams();
  }, [searchCategories]);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories: categoriesResponse },
      } = await categoriesApi.fetch();
      setCategories(categoriesResponse);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="relative flex h-screen w-[5vw] flex-col items-center justify-between p-4 shadow-md">
      <CategorySidebar
        {...{ categories, setSearchCategories, sidebarIsOpen, setCategories }}
      />
      <div className="w-100 flex flex-col items-center justify-center space-y-2">
        <Button
          icon={() => <MatrixDots />}
          style="link"
          onClick={() => setSidebarIsOpen(prev => !prev)}
        />
        <Button
          icon={() => <List />}
          style="link"
          onClick={() => navigateToCreatePost("/")}
        />
        <Button
          icon={() => <Draft />}
          style="link"
          onClick={() => navigateToCreatePost("/post/create")}
        />
      </div>
      {/* Profile Section */}
      <div
        className="relative flex h-16 flex-col justify-end"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          alt="Profile"
          className="h-10 w-10 cursor-pointer rounded-full bg-slate-300"
          src=""
        />
        {/* Hover Card */}
        {isHovered && (
          <div className="absolute bottom-12 left-24 w-48 -translate-x-1/2 transform rounded-lg bg-white p-3 text-center shadow-lg">
            <div className="flex items-center space-x-2">
              <img
                alt="Profile"
                className="h-8 w-8 rounded-full bg-slate-300"
                src=""
              />
              <div className="text-sm">
                <p className="font-semibold">{userName}</p>
                <p className="text-gray-500">{userEmail}</p>
              </div>
            </div>
            <button
              className="mt-2 flex w-full items-center justify-center rounded p-1 text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LeftArrow className="mr-1" size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
