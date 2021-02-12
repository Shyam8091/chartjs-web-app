import axios from "axios";
import * as constant from "../constants";

export const client = axios.create({
  baseURL: constant.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
