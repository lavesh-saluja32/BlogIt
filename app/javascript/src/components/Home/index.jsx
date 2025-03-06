import React, { useEffect, useState } from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import { useLocation, useHistory } from "react-router-dom";

import postsApi from "apis/posts";

import PageLoader from "../commons/PageLoader";
import PostCard from "../PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const location = useLocation();

  const navigateShowPost = slug => {
    history.push(`/post/${slug}/show`);
  };

  const navigateToCreatePost = () => {
    history.push("/post/create");
  };

  // Extract categories from URL query params
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);

    return params.get("category_names")?.split(",") || [];
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const categoryNames = getQueryParams();
      const response = await postsApi.fetch({ category_names: categoryNames });
      setPosts(response.data.posts);
    } catch (error) {
      logger.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [location.search]); // Refetch posts when query params change

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-between p-10">
        <Typography style="h1" weight="extrabold">
          Blog posts
        </Typography>
        <Button
          className="hover:none bg-black text-white"
          label="Add new blog post"
          style="primary"
          onClick={navigateToCreatePost}
        />
      </div>
      <div className="pt-15 h-5/6 w-full overflow-y-scroll p-10">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard
              key={post.title}
              {...post}
              showPost={() => navigateShowPost(post.slug)}
            />
          ))
        ) : (
          <Typography className="text-center text-gray-500" style="h3">
            No posts available
          </Typography>
        )}
      </div>
    </>
  );
};

export default Home;
