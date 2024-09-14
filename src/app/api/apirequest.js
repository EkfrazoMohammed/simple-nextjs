import axios from "axios";
const baseURL=`https://admin.aventuras.co.in/`;
const API = axios.create({
  baseURL,
});

export {API,baseURL};
