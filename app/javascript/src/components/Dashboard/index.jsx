import React, { useEffect, useState } from "react";

import { Filter } from "@bigbinary/neeto-icons";
import {
  Typography,
  ActionDropdown,
  Checkbox,
  Button,
} from "@bigbinary/neetoui";
import { useLocation } from "react-router-dom";

import FilterPanel from "./FilterPanel";
import Table from "./Table";

import postsApi from "../../apis/posts";
import PageLoader from "../commons/PageLoader";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isOpenFilterPanel, setIsOpenFilterPanel] = useState(false);

  const [selectedColumns, setSelectedColumns] = useState({
    title: true,
    category: true,
    lastPublishedAt: true,
    status: true,
    action: true,
  });
  const { Menu, MenuItem } = ActionDropdown;

  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);

    return {
      categories: params.get("categories")?.split(",") || [],
      title: params.get("title"),
      status: params.get("status"),
    };
  };

  const fetchPosts = async () => {
    const params = getQueryParams();
    try {
      const response = await postsApi.user_posts(params);
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

  const toggleColumn = column => {
    setSelectedColumns(previousColumns => ({
      ...previousColumns,
      [column]: !previousColumns[column],
    }));
  };

  useEffect(() => {
    fetchPosts();
  }, [location.search]);

  if (loading) <PageLoader />;

  return (
    <div>
      <Typography className="m-2" style="h1" weight="extrabold">
        My blog post
      </Typography>
      <div className="flex w-full items-center justify-between p-3">
        {posts.length > 0 && (
          <Typography className="m-2" style="body1" weight="bold">
            {`${posts.length} articles`}
          </Typography>
        )}
        <div className="flex items-center">
          <ActionDropdown buttonStyle="secondary" label="Columns">
            <Menu className="space-y-2 p-2">
              <MenuItem>
                <Checkbox checked disabled label="Title" />
              </MenuItem>
              <MenuItem>
                <Checkbox
                  checked={selectedColumns["category"]}
                  label="Category"
                  onChange={() => toggleColumn("category")}
                />
              </MenuItem>
              <MenuItem>
                <Checkbox
                  checked={selectedColumns["lastPublishedAt"]}
                  label="Last published at"
                  onChange={() => toggleColumn("lastPublishedAt")}
                />
              </MenuItem>
              <MenuItem>
                <Checkbox
                  checked={selectedColumns["status"]}
                  label="Status"
                  onChange={() => toggleColumn("status")}
                />
              </MenuItem>
            </Menu>
          </ActionDropdown>
          <Button
            icon={() => <Filter />}
            style="link"
            onClick={() => setIsOpenFilterPanel(true)}
          />
        </div>
      </div>
      <Table
        {...{ selectedColumns }}
        data={posts}
        handleDelete={handleDelete}
        handlePublish={handlePublish}
      />
      <FilterPanel
        {...{
          isOpen: isOpenFilterPanel,
          setIsOpen: setIsOpenFilterPanel,
          fetchPosts,
        }}
      />
    </div>
  );
};

export default Dashboard;
