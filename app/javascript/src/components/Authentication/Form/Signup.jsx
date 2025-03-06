import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Form, Input, Select } from "@bigbinary/neetoui/formik";
import { Link } from "react-router-dom";

const Signup = ({ handleSubmit, loading, organizations = [] }) => (
  <div className="flex h-screen w-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
        Sign Up
      </h2>
      <div className="text-center">
        <Link
          to="/"
          className="text-bb-purple mt-2 text-sm font-medium transition duration-150 ease-in-out
            focus:underline focus:outline-none"
        >
          Or Login Now
        </Link>
      </div>
      <Form
        formikProps={{
          initialValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            organization_id: "", // Added organization_id
          },
          onSubmit: handleSubmit,
        }}
      >
        {() => (
          <div className="mt-8 flex flex-col gap-y-6">
            <Input required label="Name" name="name" placeholder="Oliver" />
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
            <Input
              required
              label="Password Confirmation"
              name="password_confirmation"
              placeholder="********"
              type="password"
            />
            <Select
              required
              label="Organization"
              name="organization_id"
              placeholder="Select an organization"
              options={organizations.map(org => ({
                label: org.name,
                value: org.id,
              }))}
            />
            <Button label="Register" loading={loading} type="submit" />
          </div>
        )}
      </Form>
    </div>
  </div>
);

export default Signup;
