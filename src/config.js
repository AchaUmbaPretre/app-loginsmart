import axios from "axios";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export default {
  REACT_APP_SERVER_DOMAIN : 'http://localhost:5050'
};

export const userRequest = axios.create({
  baseURL: 'http://localhost:5050',
  headers: { Authorization: `Bearer ${TOKEN}` },
});