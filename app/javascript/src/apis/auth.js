import axios from "axios";

const logout = () => axios.delete(`/api/v1/session`);

const signup = payload =>
  axios.post("/api/v1/users", {
    user: payload,
  });

const login = payload =>
  axios.post("/api/v1/session", {
    login: payload,
  });

const authApi = {
  signup,
  login,
  logout,
};
export default authApi;
