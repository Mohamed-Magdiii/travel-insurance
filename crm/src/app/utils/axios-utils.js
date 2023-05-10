import Axios from "axios";

const client = Axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

export const request = ({ ...options }) => {
  client.defaults.headers.common["x-access-token"] = localStorage.getItem(
    "authToken"
  );
  const onSuccess = (response) => response;
  const onError = (error) => error;
  return client(options)
    .then(onSuccess)
    .catch(onError);
};
