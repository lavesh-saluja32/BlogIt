import axios from "axios";

const create = ({ post_slug, payload }) =>
  axios.post(`/api/v1/posts/${post_slug}/vote`, {
    vote: payload,
  });

const votesApi = { create };
export default votesApi;
