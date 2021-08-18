import { useHistory } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Product } from "../types/Product";
import addToCartImage from "../assets/icons/add-to-cart.png";
import removeFromCartImage from "../assets/icons/remove-from-cart.png";
import Image from "../atoms/Image";
import { displayPrice } from "../utils/money";
import { CartItem } from "../state/cart";

type ProductElementProps = {
  product: Product;
  cart: CartItem[];
  addToCart: (prodId: string) => void;
  removeFromCart: (prodId: string) => void;
};

export const ProductElement = ({
  product,
  cart,
  addToCart,
  removeFromCart,
}: ProductElementProps): JSX.Element => {
  const { i18n } = useTranslation();
  const history = useHistory();
  const inCart = cart.some((item) => item.id === product._id);

  return (
    <MainContainer>
      <NameContainer onClick={() => history.push(`/product/${product._id}`)}>
        {product.name[i18n.language]} - {product.brand}
      </NameContainer>
      <PriceContainer>{displayPrice(product.price)}</PriceContainer>
      {inCart ? (
        <Button onClick={() => removeFromCart(product._id)}>
          <Image alt="removeFromCart" src={removeFromCartImage} />
        </Button>
      ) : (
        <Button onClick={() => addToCart(product._id)}>
          <Image alt="addToCart" src={addToCartImage} />
        </Button>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  cursor: pointer;
  :hover {
    background: silver;
  }
`;

const NameContainer = styled.div`
  flex-grow: 1;
`;

const PriceContainer = styled.div`
  margin-right: 20px;
`;

const Button = styled.div``;
