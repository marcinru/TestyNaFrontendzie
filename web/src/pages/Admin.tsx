import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ProductsConfiguration } from "../organisms/ProductsConfiguration";
import Container from "../templates/Container";
import { Login } from "../organisms/Login";
import { Logout } from "../organisms/Logout";
import { useUser } from "../userContext/UserContext";
import Button from "../atoms/Button";
import { NewProductForm } from "../organisms/NewProductForm";

const Admin = () => {
  const { t } = useTranslation();
  const [addNewProductOpen, setAddNewProductOpen] = useState<boolean>(false);
  const {
    state: { user },
  } = useUser();

  if (!user) {
    return (
      <Container>
        <Login />
      </Container>
    );
  }

  const onNewProductOpen = () => {
    setAddNewProductOpen(!addNewProductOpen);
  };

  const onNewProductSubmit = () => {
    setAddNewProductOpen(false);
  };

  return (
    <>
      <StyledContainer>
        <LogoutContainer>
          <Button onClick={onNewProductOpen}>{t("Add new product")}</Button>
          <Logout />
        </LogoutContainer>
        <ProductsContainer>
          <ProductsConfiguration />
        </ProductsContainer>
      </StyledContainer>
      {addNewProductOpen && (
        <Container>
          <NewProductForm onSubmit={onNewProductSubmit} />
        </Container>
      )}
    </>
  );
};

export default Admin;

const StyledContainer = styled(Container)`
  position: relative;
`;

const LogoutContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  width: 200px;
  justify-content: space-between;
`;

const ProductsContainer = styled.div`
  padding-top: 30px;
`;
