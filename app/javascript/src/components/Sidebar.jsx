import React from "react";

import { List, MatrixDots } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";

const Sidebar = () => (
  <div className="flex h-screen w-[5vw] flex-col items-center justify-between p-4 shadow-md">
    <div className="w-100 flex flex-col items-center justify-center space-y-2">
      <Button icon={() => <List />} style="link" />
      <Button icon={() => <MatrixDots />} style="link" />
    </div>
    <div>
      <img alt="" className="h-10 w-10 rounded-full bg-slate-300" src="" />
    </div>
  </div>
);

export default Sidebar;
