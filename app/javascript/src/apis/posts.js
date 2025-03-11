import axios from "axios";

const fetch = (queryParams = {}) =>
  axios.get("api/v1/posts", { params: queryParams });

const show = slug => axios.get(`api/v1/posts/${slug}`);

const create = payload =>
  axios.post("/api/v1/posts", {
    post: payload,
  });

const destroy = slug => axios.delete(`api/v1/posts/${slug}`);

const update = ({ slug, payload }) =>
  axios.put(`api/v1/posts/${slug}`, {
    post: payload,
  });

const user_posts = () => axios.get("api/v1/user_posts");

const postsApi = { fetch, create, show, destroy, update, user_posts };

export default postsApi;
