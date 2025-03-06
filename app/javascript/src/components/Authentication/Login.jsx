import React, { useState } from "react";

import authApi from "apis/auth";

import LoginForm from "./Form/Login";

import { setAuthHeaders } from "../../apis/axios";
import { setToLocalStorage } from "../../utils/storage";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);
    try {
      const response = await authApi.login({
        email: values.email,
        password: values.password,
      });

      setToLocalStorage({
        authToken: response.data.authentication_token,
        email: values.email.toLowerCase(),
        userId: response.data.id,
        userName: response.data.name,
      });
      setAuthHeaders();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  return <LoginForm {...{ handleSubmit, loading }} />;
};

export default Login;
