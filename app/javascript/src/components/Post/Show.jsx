import React, { useState, useEffect } from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import { useParams, useHistory } from "react-router-dom";

import postsApi from "../../apis/posts";
import PageLoader from "../commons/PageLoader";

const Show = () => {
  const [post, setPost] = useState("");
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const { slug } = useParams();
  const history = useHistory();

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post, categories, user },
      } = await postsApi.show(slug);
      setPost(post);
      setUser(user);
      setCategories(categories);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  const handleEditNavigate = () => {
    history.push(`/post/${slug}/edit`);
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <div className="w-[90vw] space-y-4">
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
      <div className="flex items-center space-x-4">
        <img
          alt="image"
          className="h-12 w-12 rounded-full bg-yellow-300"
          src="#"
        />
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between p-4">
            <Typography className="text-sm" style="nano" weight="semibold">
              {user.name}
            </Typography>
            <Button
              icon={() => <Edit />}
              style="link"
              onClick={handleEditNavigate}
            />
          </div>
          <Typography
            className="text-sm text-gray-600"
            style="body3"
            weight="light"
          >
            {new Date(post.updated_at.split(" ")[0]).toDateString()}
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
export default Show;
