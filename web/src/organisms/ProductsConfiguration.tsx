import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../state/store";
import { fetchProducts } from "../state/cart";
import Loader from "../atoms/Loader";
import { Product } from "../types/Product";
import Button from "../atoms/Button";
import { displayPrice } from "../utils/money";
import { removeProduct } from "../api/api";

export const ProductsConfiguration = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { products, loading, error } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!products) {
      dispatch(fetchProducts());
    }
  }, []);

  if (loading || !products) return <Loader />;

  if (error) return <div>Error! ${error}</div>;

  const onRemove = async (id: string) => {
    await removeProduct(id);
    dispatch(fetchProducts());
  };

  return (
    <div>
      <h2>{t("Products")}</h2>
      {products.map((prod: Product) => {
        return (
          <ProductContainer key={prod._id}>
            <DetailsContainer>
              <span>
                {prod.name[language]} - {prod.brand}
              </span>
              <span>{displayPrice(prod.price)}</span>
            </DetailsContainer>
            <ButtonsContainer>
              <Button onClick={() => onRemove(prod._id)}>{t("Remove")}</Button>
            </ButtonsContainer>
          </ProductContainer>
        );
      })}
    </div>
  );
};

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid gray;
  padding: 5px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled.div``;
