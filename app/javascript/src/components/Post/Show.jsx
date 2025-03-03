import React, { useState, useEffect } from "react";

import { Typography } from "@bigbinary/neetoui";
import { useParams, useHistory } from "react-router-dom";

import postsApi from "../../apis/posts";
import PageLoader from "../commons/PageLoader";

const Show = () => {
  const [post, setPost] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const { slug } = useParams();
  const history = useHistory();

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <Typography style="h1">{post?.title}</Typography>
      <Typography style="body1">{post?.description}</Typography>
    </div>
  );
};
export default Show;
