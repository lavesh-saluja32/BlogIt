import React, { useEffect, useState } from "react";

import { Typography, Button, Select } from "@bigbinary/neetoui";
import { Form, Input, Textarea } from "@bigbinary/neetoui/formik";
import { useHistory } from "react-router-dom";

import categoriesApi from "../../apis/categories";
import postsApi from "../../apis/posts";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const handleSubmit = async values => {
    setLoading(true);
    try {
      const payload = {
        title: values.title,
        description: values.description,
        category_ids: values.category_ids, // ✅ Ensure correct API format
      };
      await postsApi.create(payload);
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.fetch();
      setCategories(
        response.data.categories.map(category => ({
          label: category.name,
          value: category.id,
        }))
      );
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="pt-15 w-[90vw] overflow-y-scroll p-10">
      <Typography style="h1" weight="extrabold">
        New Blog Post
      </Typography>
      <Form
        formikProps={{
          initialValues: { title: "", description: "", category_ids: [] },
          onSubmit: handleSubmit,
        }}
      >
        {({ setFieldValue }) => (
          <div className="w-full">
            <div className="h-[70vh] space-y-7 border-2 border-gray-500 p-3">
              <Input label="Title" name="title" placeholder="Enter Title" />
              <Select
                isMulti
                required
                label="Categories"
                name="category_ids"
                options={categories}
                placeholder="Select categories"
                onChange={selectedOptions => {
                  setFieldValue(
                    "category_ids",
                    selectedOptions.map(option => option.value)
                  );
                }}
              />
              <Textarea
                label="Description"
                maxLength={10000}
                name="description"
                placeholder="Enter description"
                rows={10}
              />
              <div className="float-right flex space-x-3 p-10">
                <Button label="Submit" {...{ loading }} type="submit" />
                <Button label="Cancel" style="danger" type="reset" />
              </div>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Create;
