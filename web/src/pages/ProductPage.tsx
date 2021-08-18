import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../templates/Container";
import Loader from "../atoms/Loader";
import { CommentsWrapper } from "../organisms/Comments";
import { Name, Row } from "../atoms/Row";
import NavigationButton from "../atoms/NavigationButton";
import ListHeader from "../atoms/ListHeader";
import { displayPrice } from "../utils/money";
import { useAppDispatch, useAppSelector } from "../state/store";
import { fetchProduct } from "../state/cart";

type ProductPageParams = {
  id: string;
};

export const ProductPage = (): JSX.Element => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams<ProductPageParams>();

  const { loading, error } = useAppSelector((state) => state.cart);
  const data = useAppSelector((state) =>
    state.cart.products?.find((elem) => elem._id === id),
  );

  useEffect(() => {
    if (!data) {
      dispatch(fetchProduct(id));
    }
  }, []);

  if (loading || !data) return <Loader />;

  if (error) return <div>Error! ${error}</div>;

  return (
    <Container>
      <h1>
        {data.name[language]} - {displayPrice(data.price)}
      </h1>
      <div>
        {t("Brand")}: {data.brand}
      </div>
      <ListHeader />
      <CommentsWrapper productId={data._id} />
      <ListHeader />
      <Row>
        <Name>
          <NavigationButton to="/">
            {"<<"} {t("Products List")}
          </NavigationButton>
        </Name>
      </Row>
    </Container>
  );
};
