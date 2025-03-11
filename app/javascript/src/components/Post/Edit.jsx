import React, { useEffect, useState } from "react";

import { Articles } from "@bigbinary/neeto-icons";
import { Typography, Button, Select } from "@bigbinary/neetoui";
import { Form, Input, Textarea } from "@bigbinary/neetoui/formik";
import { useParams, useHistory } from "react-router-dom";

import PublishButton from "./PublishButton";

import categoriesApi from "../../apis/categories";
import postsApi from "../../apis/posts";
import PageLoader from "../commons/PageLoader";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [postDetail, setPostDetail] = useState({});
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [user, setUser] = useState({});

  const history = useHistory();
  const { slug } = useParams();

  const handleDelete = async slug => {
    try {
      await postsApi.destroy(slug);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async (values, publishStatus) => {
    setLoading(true);
    try {
      const payload = {
        title: values.title,
        description: values.description,
        category_ids: values.category_ids.map(category => category.value),
        publish: publishStatus,
      };
      await postsApi.update({ slug, payload });
      setLoading(false);
      history.push(`/post/${slug}/show`);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.fetch();
      const formattedCategories = response.data.categories.map(category => ({
        label: category.name,
        value: category.id,
      }));
      setCategories(formattedCategories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post, categories, user },
      } = await postsApi.show(slug);
      setPostDetail(post);
      setUser(user);
      setCategoryDetails(
        categories.map(category => ({
          label: category.name,
          value: category.id,
        }))
      );
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  const handlePreview = () => {
    history.push({
      pathname: `/post/${slug}/preview`,
      state: {
        post: postDetail,
        categories: categoryDetails,
        user,
      },
    });
  };

  useEffect(() => {
    fetchCategories();
    fetchPostDetails();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="pt-15 w-[90vw] overflow-y-scroll p-10">
      <Form
        formikProps={{
          initialValues: {
            title: postDetail?.title || "",
            description: postDetail?.description || "",
            category_ids: categoryDetails || [],
          },
          enableReinitialize: true,
          onSubmit: handleSubmit,
        }}
      >
        {({ setFieldValue, values }) => (
          <div className="w-full">
            <div className="flex w-full justify-between p-4">
              <Typography style="h1" weight="extrabold">
                Edit blog post
              </Typography>
              <div className="flex items-center justify-between space-x-3">
                <PublishButton
                  {...{ handleSubmit, values }}
                  isDelete
                  handleDelete={() => handleDelete(postDetail.slug)}
                />
                <Button label="Cancel" style="secondary" type="reset" />
                <Button
                  icon={() => <Articles />}
                  style="link"
                  onClick={handlePreview}
                />
              </div>
            </div>
            <div className="h-[70vh] space-y-7 border-2 border-gray-500 p-3">
              <Input label="Title" name="title" placeholder="Enter Title" />
              <Select
                isMulti
                required
                label="Categories"
                name="category_ids"
                options={categories}
                placeholder="Select categories"
                value={values.category_ids}
                onChange={selectedOptions => {
                  setFieldValue("category_ids", selectedOptions);
                }}
              />
              <Textarea
                label="Description"
                maxLength={10000}
                name="description"
                placeholder="Enter description"
                rows={10}
              />
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Edit;
