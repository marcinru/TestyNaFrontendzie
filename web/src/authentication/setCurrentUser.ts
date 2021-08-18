import cookie from "react-cookies";
import { ACCESS_TOKEN_NAME } from "./cookiesVariables";

export const setCurrentUser = (user: { accessToken: string; exp: number }) => {
  console.log("DATE: ", new Date(user.exp * 1000), user.exp);
  cookie.save(ACCESS_TOKEN_NAME, user.accessToken, {
    path: "/",
    expires: new Date(user.exp * 1000),
  });
};
