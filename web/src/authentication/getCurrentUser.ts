import cookie from "react-cookies";
import { ACCESS_TOKEN_NAME } from "./cookiesVariables";

export const getCurrentUser = () => {
  console.log("HERE: currentUser:", cookie.load(ACCESS_TOKEN_NAME));
  return cookie.load(ACCESS_TOKEN_NAME);
};
