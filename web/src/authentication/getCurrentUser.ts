import cookie from "react-cookies";
import { ACCESS_TOKEN_NAME } from "./cookiesVariables";

export const getCurrentUser = () => {
  return cookie.load(ACCESS_TOKEN_NAME);
};
