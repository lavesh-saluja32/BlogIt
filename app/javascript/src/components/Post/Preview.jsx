import React from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui";
import { useLocation, useHistory } from "react-router-dom";

const Preview = () => {
  const location = useLocation();
  const history = useHistory();
  if (!location.state) history.goBack();
  const { post, categories, user } = location.state || {
    post: {},
    categories: [],
    user: {},
  };

  return (
    <div className="w-[90vw] space-y-4">
      <div className="flex space-x-2 p-1">
        {categories.map(category => (
          <Typography
            className="rounded-xl bg-green-300 p-1.5"
            key={category.value}
            style="nano"
          >
            {category.label}
          </Typography>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <img
          alt="image"
          className="h-12 w-12 rounded-full bg-yellow-300"
          src="#"
        />
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between p-4">
            <Typography className="text-sm" style="nano" weight="semibold">
              {user?.name}
            </Typography>
            <Button
              icon={() => <Edit />}
              style="link"
              onClick={() => history.goBack()}
            />
          </div>
          <Typography
            className="text-sm text-gray-600"
            style="body3"
            weight="light"
          >
            {post?.updated_at ? new Date(post.updated_at).toDateString() : ""}
          </Typography>
        </div>
      </div>
      <div className="flex items-center justify-start space-x-3">
        <Typography style="h1">{post?.title}</Typography>
        {post?.publish === "unpublished" && (
          <Typography
            className="rounded-xl p-1 text-sm text-red-500 outline outline-red-500"
            style="nano"
          >
            Draft
          </Typography>
        )}
      </div>
      <Typography style="body1">{post?.description}</Typography>
    </div>
  );
};

export default Preview;
