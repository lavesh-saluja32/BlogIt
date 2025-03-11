import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";

import Table from "./Table";

import postsApi from "../../apis/posts";
import PageLoader from "../commons/PageLoader";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await postsApi.user_posts();
      formatResponseAndSavePost(response);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatResponseAndSavePost = response => {
    const blogPosts = response.data.posts.map((post, index) => ({
      id: index + 1,
      category: post.categories.map(category => category.name).join(", "),
      title: post?.title,
      lastPublishedAt: new Date(post.updated_at.split(" ")[0]).toDateString(),
      status: post?.published === "published" ? "Published" : "Draft",
      slug: post.slug,
    }));
    setPosts(blogPosts);
  };

  const handlePublish = async (slug, publishStatus) => {
    try {
      const payload = {
        publish: publishStatus,
      };
      await postsApi.update({ slug, payload });
      fetchPosts();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDelete = async slug => {
    try {
      await postsApi.destroy(slug);
      fetchPosts();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) <PageLoader />;

  return (
    <div>
      <Typography className="m-2" style="h1" weight="extrabold">
        My blog post
      </Typography>
      {posts.length > 0 && (
        <Typography className="m-2" style="body1" weight="bold">
          {`${posts.length} articles`}
        </Typography>
      )}
      <Table
        data={posts}
        handleDelete={handleDelete}
        handlePublish={handlePublish}
      />
    </div>
  );
};

export default Dashboard;
