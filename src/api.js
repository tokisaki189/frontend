import axios from "axios";
let instance = axios.create({
  baseURL: "http://localhost:3002/",
});
export default instance;
