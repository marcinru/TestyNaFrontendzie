import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { login } from "../api/api";
import { setCurrentUser } from "../authentication/setCurrentUser";
import { useUser } from "../userContext/UserContext";
import { UserContextAction } from "../userContext/actions";

export const Login = () => {
  const { dispatch } = useUser();
  const { t } = useTranslation();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const passwordChanged = (password: string) => {
    setLoginForm({ ...loginForm, password });
  };

  const loginChanged = (email: string) => {
    setLoginForm({ ...loginForm, email });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login({
      email: loginForm.email,
      password: loginForm.password,
    });

    if (result.success && dispatch) {
      dispatch({ type: UserContextAction.LOGIN, user: result.accessToken });
    }
  };

  return (
    <LoginForm onSubmit={onSubmit}>
      <Input
        placeholder={t("Email")}
        value={loginForm.email}
        onChange={(e) => loginChanged(e.target.value)}
      />
      <Input
        type="password"
        placeholder={t("Password")}
        value={loginForm.password}
        onChange={(e) => passwordChanged(e.target.value)}
      />
      <Button type="submit">{t("Sign in")}</Button>
    </LoginForm>
  );
};

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
