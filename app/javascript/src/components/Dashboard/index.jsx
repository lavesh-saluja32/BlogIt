import React, { useEffect, useState } from "react";

import { Filter } from "@bigbinary/neeto-icons";
import {
  Typography,
  ActionDropdown,
  Checkbox,
  Button,
  Dropdown,
} from "@bigbinary/neetoui";
import { useLocation } from "react-router-dom";

import DeleteModal from "./DeleteModal";
import FilterPanel from "./FilterPanel";
import Table from "./Table";

import postsApi from "../../apis/posts";
import PageLoader from "../commons/PageLoader";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isOpenFilterPanel, setIsOpenFilterPanel] = useState(false);
  // const [filters, setFilters] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState({
    title: true,
    category: true,
    lastPublishedAt: true,
    status: true,
    action: true,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
      // setFilters({
      //   params,
      // });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatResponseAndSavePost = response => {
    const blogPosts = response.data.posts.map((post, index) => ({
      id: index + 1,
      post_id: post.id,
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

  const handleBulkPublish = async publishStatus => {
    try {
      await postsApi.update_publish_bulk({
        ids: selectedRows.map(data => data.post_id),
        publish: publishStatus,
      });
      fetchPosts();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleBulkDestroy = async () => {
    try {
      await postsApi.destroy_bulk({
        ids: selectedRows.map(data => data.post_id),
      });
      setShowDeleteModal(false);
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
          <div>
            {selectedRows.length > 0 ? (
              <div className="flex space-x-4">
                <Typography>
                  <span className="font-bold">{`${selectedRows.length} articles`}</span>
                  {` selected of ${posts.length}`}
                </Typography>
                <Dropdown buttonStyle="secondary" label="Change status">
                  <Menu className="space-y-2">
                    <MenuItem>
                      <MenuItem.Button
                        onClick={() => handleBulkPublish("unpublished")}
                      >
                        Draft
                      </MenuItem.Button>
                    </MenuItem>
                    <MenuItem>
                      <MenuItem.Button
                        onClick={() => handleBulkPublish("published")}
                      >
                        Publish
                      </MenuItem.Button>
                    </MenuItem>
                  </Menu>
                </Dropdown>
                <Button
                  label="Delete all"
                  style="danger"
                  onClick={() => setShowDeleteModal(true)}
                />
              </div>
            ) : (
              <Typography className="m-2" style="body1" weight="bold">
                {`${posts.length} articles`}
              </Typography>
            )}
          </div>
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
        {...{
          selectedColumns,
          setSelectedRows,
          selectedRowKeys,
          setSelectedRowKeys,
        }}
        data={posts}
        handleDelete={handleDelete}
        handlePublish={handlePublish}
      />
      <FilterPanel
        {...{
          isOpen: isOpenFilterPanel,
          setIsOpen: setIsOpenFilterPanel,
        }}
      />
      <DeleteModal
        {...{ showDeleteModal, setShowDeleteModal, handleBulkDestroy }}
      />
    </div>
  );
};

export default Dashboard;
