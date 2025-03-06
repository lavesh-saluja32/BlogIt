import axios from "axios";

const fetch = () => axios.get("api/v1/categories");
const create = payload =>
  axios.post("/api/v1/categories", {
    category: payload,
  });
const categoriesApi = { fetch, create };
export default categoriesApi;
