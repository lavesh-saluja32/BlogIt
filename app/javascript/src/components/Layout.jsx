import React from "react";

import Sidebar from "./Sidebar";

const Layout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="h-screen w-[90vw] p-10 pb-10 pt-20">{children}</div>
  </div>
);

export default Layout;
