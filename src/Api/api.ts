import axios from "axios";

export const api = axios.create({
  baseURL: "https://hrms-backend-nws5.onrender.com",
});