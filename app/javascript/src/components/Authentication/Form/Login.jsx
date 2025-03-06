import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Form, Input } from "@bigbinary/neetoui/formik";
import { Link } from "react-router-dom";

const Login = ({ handleSubmit, loading }) => (
  <div className="flex h-full items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
        Login
      </h2>
      <div className="text-center">
        <Link
          to="/signup"
          className="text-bb-purple mt-2 text-sm font-medium transition duration-150 ease-in-out
            focus:underline focus:outline-none"
        >
          Or Sign Up Now
        </Link>
      </div>
      <Form
        formikProps={{
          initialValues: {
            email: "",
            password: "",
          },
          onSubmit: handleSubmit,
        }}
      >
        {() => (
          <div className="mt-8 flex flex-col gap-y-6">
            <Input
              required
              label="Email"
              name="email"
              placeholder="oliver@example.com"
              type="email"
            />
            <Input
              required
              label="Password"
              name="password"
              placeholder="********"
              type="password"
            />
            <Button label="Login" loading={loading} type="submit" />
          </div>
        )}
      </Form>
    </div>
  </div>
);

export default Login;
