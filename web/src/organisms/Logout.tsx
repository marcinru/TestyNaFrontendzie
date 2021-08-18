import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../atoms/Button";
import { removeCurrentUser } from "../authentication/removeCurrentUser";
import { useUser } from "../userContext/UserContext";
import { UserContextAction } from "../userContext/actions";

export const Logout = () => {
  const { t } = useTranslation();
  const { dispatch } = useUser();

  const logout = () => {
    if (dispatch) {
      removeCurrentUser();
      dispatch({ type: UserContextAction.LOGOUT });
    }
  };
  return <Button onClick={() => logout()}>{t("Logout")}</Button>;
};
