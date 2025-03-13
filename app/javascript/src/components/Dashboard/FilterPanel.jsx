import React, { useEffect, useState } from "react";

import { Pane, Typography } from "@bigbinary/neetoui";
import { Form, Input, Select, Button } from "@bigbinary/neetoui/formik";
import { useHistory, useLocation } from "react-router-dom";

import categoriesApi from "../../apis/categories";

const FilterPanel = ({ isOpen, setIsOpen }) => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories: categoriesResponse },
      } = await categoriesApi.fetch();

      setCategories(
        categoriesResponse.map(category => ({
          label: category.name,
          value: category.id,
        }))
      );
    } catch (error) {
      logger.error(error);
    }
  };

  const handleFilterNavigate = values => {
    const params = new URLSearchParams(location.search);
    if (values.title) params.set("title", values.title);
    else params.delete("title");

    if (values.categories.length) {
      params.set(
        "categories",
        values.categories.map(cat => cat.label).join(",")
      );
    } else {
      params.delete("categories");
    }

    if (values.status) params.set("status", values.status.value);
    else params.delete("status");

    history.push({ search: params.toString() });
    setIsOpen(false);
  };

  return (
    <Pane isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Pane.Header>
        <Typography style="h2">Filters</Typography>
      </Pane.Header>
      <Pane.Body>
        <Form
          formikProps={{
            initialValues: {
              title: "",
              categories: [],
              status: "",
            },
            onSubmit: handleFilterNavigate,
          }}
        >
          {({ resetForm }) => (
            <>
              <Input label="Title" name="title" />
              <Select
                isMulti
                label="Category"
                name="categories"
                options={categories}
              />
              <Select
                label="Status"
                name="status"
                options={[
                  { label: "Published", value: "published" },
                  { label: "Draft", value: "draft" },
                ]}
              />
              <Button className="mt-4" label="Done" type="submit" />
              <Button
                className="mt-4"
                label="Clear"
                style="secondary"
                type="reset"
                onClick={() => resetForm()}
              />
            </>
          )}
        </Form>
      </Pane.Body>
    </Pane>
  );
};

export default FilterPanel;
