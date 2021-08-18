import * as React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ShoppingCartImage from "../assets/icons/shopping-cart.png";
import Image from "../atoms/Image";
import { useAppSelector } from "../state/store";

export const Header = (): JSX.Element => {
  const history = useHistory();
  const cart = useAppSelector((state) => state.cart.items);

  return (
    <Container onClick={() => history.push("/cart")}>
      <CartImage src={ShoppingCartImage} />
      <span data-testId="cartSize">{cart.length}</span>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
`;

const CartImage = styled(Image)`
  margin-right: 10px;
`;
