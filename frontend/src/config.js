import axios from "axios";

const dev = process.env.NODE_ENV === "development";
const prod = process.env.NODE_ENV === "production";
const staging =
  window.location.href.includes("codeanalyzer.herokuapp.com") ||
  window.location.href.includes("localhost:1337") ||
  process.env.NODE_ENV === "staging";

export const webUrl = (() => {
  if (staging) {
    // TODO: Yet to be updated
    return "https://4o2g1poz9d.execute-api.us-east-1.amazonaws.com";
  }

  if (dev) {
    return "https://4o2g1poz9d.execute-api.us-east-1.amazonaws.com";
  }

  if (prod) {
    // TODO: Yet to be updated
    return "https://4o2g1poz9d.execute-api.us-east-1.amazonaws.com";
  }
})();

const apiClient = axios.create({
  baseURL: webUrl + "/api",
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };