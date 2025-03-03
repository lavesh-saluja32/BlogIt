import React, { useState } from "react";

import { Typography, Button } from "@bigbinary/neetoui";
import { Form, Input, Textarea } from "@bigbinary/neetoui/formik";

import postsApi from "../../apis/posts";

const Create = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);
    try {
      await postsApi.create(values);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="pt-15 w-full overflow-y-scroll p-10">
      <Typography style="h1" weight="extrabold">
        New blog post
      </Typography>
      <Form
        formikProps={{
          initialValues: { title: "", description: "" },
          onSubmit: handleSubmit,
        }}
      >
        <div className="w-full">
          <div className="h-[70vh] space-y-7 border-2 border-gray-500 p-3 ">
            <Input label="Title" name="title" placeholder="Enter Title" />
            <Textarea
              label="Description"
              maxLength={10000} // ✅ Add "name" prop
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
      </Form>
    </div>
  );
};

export default Create;
