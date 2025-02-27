import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";

import postsApi from "apis/posts";

import PageLoader from "../commons/PageLoader";
import PostCard from "../PostCard";
import Sidebar from "../Sidebar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="flex justify-between">
      <Sidebar />
      <div className="w-[90vw] overflow-y-scroll p-10 pt-20">
        <Typography style="h1" weight="extrabold">
          Blog posts
          {posts.map(post => (
            <PostCard key={post.title} {...post} />
          ))}
        </Typography>
      </div>
    </div>
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
