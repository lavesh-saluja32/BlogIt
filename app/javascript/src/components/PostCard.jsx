import React from "react";

import { Typography } from "@bigbinary/neetoui";

const PostCard = ({
  title,
  created_at,
  description,
  showPost,
  categories,
  user,
}) => (
  <div
    className="m-5 cursor-pointer rounded-md border-b border-t-gray-300 bg-white p-4 pb-2"
    onClick={showPost}
  >
    <Typography className="mb-2" style="h2">
      {title}
    </Typography>
    <div className=" flex space-x-2 p-1">
      {categories.map(category => (
        <Typography
          className="rounded-xl bg-green-300 p-1.5 "
          key={category.id}
          style="nano"
        >
          {category.name}
        </Typography>
      ))}
    </div>
    <Typography
      className="my-6 mt-1 line-clamp-2 overflow-hidden text-gray-400"
      style="body1"
      weight="light"
    >
      {description}
    </Typography>
    <Typography className="text-sm" style="nano" weight="semibold">
      {user.name}
    </Typography>
    <Typography className="text-sm text-gray-600" style="body3" weight="light">
      {new Date(created_at.split(" ")[0]).toDateString()}
    </Typography>
  </div>
);

export default PostCard;
