import React from "react";

import { Typography } from "@bigbinary/neetoui";

const PostCard = ({ title, created_at, description }) => (
  <div className="m-5 rounded-md border-b border-t-gray-300 bg-white p-4 pb-2">
    <Typography className="mb-2" style="h2">
      {title}
    </Typography>
    <Typography
      className="mt-1 line-clamp-2 overflow-hidden text-gray-400"
      style="body1"
      weight="light"
    >
      {description}
    </Typography>
    <Typography className="text-sm text-gray-600" style="body3" weight="light">
      {new Date(created_at.split(" ")[0]).toDateString()}
    </Typography>
  </div>
);
export default PostCard;
