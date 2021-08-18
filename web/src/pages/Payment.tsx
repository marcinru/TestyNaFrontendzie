import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ListHeader from "../atoms/ListHeader";
import { Cell, Name, Rest, Row } from "../atoms/Row";
import { Subtitle } from "../atoms/Subtitle";
import AddressDisplay from "../molecules/AddressDisplay";
import DeliveryRow from "../molecules/DeliveryRow";
import DiscountRow from "../molecules/DiscountRow";
import SumRow from "../molecules/SumRow";
import TotalRow from "../molecules/TotalRow";
import { useAppSelector } from "../state/store";
import Container from "../templates/Container";
import { displayPrice } from "../utils/money";
import Button from "../atoms/Button";
import { useCurrency } from "../currencyContext/CurrencyContext";
import { payForCart } from "../api/api";

const CartSection = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  padding-right: 20px;
`;

const CardContainer = styled.div`
  min-width: 500px;
`;

const Error = styled.p`
  color: red;
`;

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const Payment = (): JSX.Element => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const history = useHistory();
  const [error, setError] = useState<string | boolean>(false);
  const {
    state: { selectedCurrency },
  } = useCurrency();
  const stripe = useStripe();
  const elements = useElements();

  const cart = useAppSelector((state) => state.cart.items);
  const address = useAppSelector((state) => state.delivery.address);
  const shipmentMethod = useAppSelector(
    (state) => state.delivery.shipmentMethod,
  );

  const handlePayment = async () => {
    if (!stripe || !elements || !shipmentMethod) {
      return;
    }
    try {
      const clientSecret = await payForCart({
        products: cart.map((item) => item.id),
        shipmentMethod: shipmentMethod.type,
        address,
        currency: selectedCurrency,
      });

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        // @ts-ignore
        throw new Error("Card element not rendered");
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${address?.firstName} ${address?.lastName}`,
          },
        },
      });

      if (result.error) {
        setError(result.error?.message ?? true);
      } else if (result.paymentIntent.status === "succeeded") {
        history.push("/summary");
      }
    } catch {
      setError(true);
    }
  };

  return (
    <Container>
      <ListHeader>{t("Summary")}</ListHeader>
      <Row>
        <CartSection>
          <Subtitle>{t("Cart")}:</Subtitle>
          {cart.map((product) => (
            <Row key={product.id}>
              <Name>
                {product.name[language]} - {product.brand}
              </Name>
              <Cell>{product.quantity}</Cell>
              <Cell>{displayPrice(product.price)}</Cell>
              <Cell>{displayPrice(product.price, product.quantity)}</Cell>
            </Row>
          ))}
          <SumRow />
          <DiscountRow />
          <DeliveryRow />
          <TotalRow />
        </CartSection>
        <AddressDisplay address={address} />
      </Row>
      <Row>
        <CardContainer>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
          {error ? <Error>{t("paymentError")}</Error> : null}
        </CardContainer>
        <Rest>
          <Button onClick={handlePayment}>{t("Pay with a card")}</Button>
        </Rest>
      </Row>
    </Container>
  );
};

export default Payment;
