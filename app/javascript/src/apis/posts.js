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

const user_posts = (queryParams = {}) =>
  axios.get("api/v1/user_posts", { params: queryParams });

const update_publish_bulk = payload =>
  axios.patch("api/v1/update_publish_bulk", { posts: payload });

const destroy_bulk = payload =>
  axios.delete("api/v1/destroy_bulk", { data: { posts: payload } });

const generatePdf = slug => axios.post(`api/v1/posts/${slug}/report`);
const downloadPdf = slug =>
  axios.get(`api/v1/posts/${slug}/report/download`, { responseType: "blob" });

const postsApi = {
  fetch,
  create,
  show,
  destroy,
  update,
  user_posts,
  update_publish_bulk,
  destroy_bulk,
  generatePdf,
  downloadPdf,
};

export default postsApi;
