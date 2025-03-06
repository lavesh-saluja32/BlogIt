import React, { useEffect, useState } from "react";

import authApi from "apis/auth";

import SignupForm from "./Form/Signup";

import organizationsApi from "../../apis/organizations";

const Signup = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const fetchOrganizations = async () => {
    try {
      const { data } = await organizationsApi.fetch();
      setOrganizations(data);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async values => {
    setLoading(true);
    try {
      await authApi.signup({
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        organization_id: values.organization_id.value,
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return <SignupForm {...{ handleSubmit, loading, organizations }} />;
};

export default Signup;
