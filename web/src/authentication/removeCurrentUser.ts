import cookie from "react-cookies";
import { ACCESS_TOKEN_NAME } from "./cookiesVariables";

export const removeCurrentUser = () => {
  cookie.remove(ACCESS_TOKEN_NAME);
};
