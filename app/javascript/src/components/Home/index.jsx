import React, { useEffect, useState } from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";

import postsApi from "apis/posts";

import PageLoader from "../commons/PageLoader";
import PostCard from "../PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const navigateShowPost = slug => {
    history.push(`/post/${slug}/show`);
  };

  const navigateToCreatePost = () => {
    history.push("/post/create");
  };

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
        {posts.map(post => (
          <PostCard
            key={post.title}
            {...post}
            showPost={() => navigateShowPost(post.slug)}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
export const samplePosts = [
  {
    title: "Understanding React Hooks",
    date: "January 10, 2025",
    excerpt:
      "An introduction to React Hooks and how they improve functional components.",
  },
  {
    title: "JavaScript ES6 Features",
    date: "February 5, 2025",
    excerpt:
      "Exploring the modern features of JavaScript introduced in ES6 and beyond.",
  },
  {
    title: "CSS Grid vs Flexbox",
    date: "March 15, 2025",
    excerpt: "A comparison of CSS Grid and Flexbox for responsive web design.",
  },
];
