import React from "react";

import { UpArrow, DownArrow } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui";

const PostCard = ({
  title,
  created_at,
  description,
  showPost,
  categories,
  user,
  vote,
  slug,
  current_user_vote: votedPost,
  net_votes: totalVotes,
  is_bloggable,
}) => (
  <div className="flex justify-between">
    <div
      className="m-5 w-full cursor-pointer rounded-md border-b border-t-gray-300 bg-white p-4 pb-2"
      onClick={showPost}
    >
      <Typography className="mb-2" style="h2">
        {title}{" "}
        {is_bloggable && (
          <span className="ml-5 rounded-full border-2 border-green-400 p-1 text-sm font-thin text-green-400">
            Blog It
          </span>
        )}
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
      <Typography
        className="text-sm text-gray-600"
        style="body3"
        weight="light"
      >
        {new Date(created_at.split(" ")[0]).toDateString()}
      </Typography>
    </div>
    <div className="flex h-full flex-col items-center justify-center space-y-2 pr-24">
      <Button
        className={votedPost > 0 && `text-green-500`}
        icon={() => <UpArrow />}
        style="link"
        onClick={() => vote(slug, 1)}
      />
      <Typography>{totalVotes}</Typography>
      <Button
        className={`text-2xl ${votedPost < 0 ? "text-red-500" : ""}`}
        icon={() => <DownArrow />}
        style="link"
        onClick={() => vote(slug, -1)}
      />
    </div>
  </div>
);

export default PostCard;
