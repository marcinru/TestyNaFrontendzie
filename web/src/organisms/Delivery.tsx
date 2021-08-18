import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components";
import { useDispatch } from "react-redux";
import ListHeader from "../atoms/ListHeader";
import { Cell, Name, Row } from "../atoms/Row";
import { getDiscountedSum } from "../state/selectors";
import { shipmentMethods } from "../types/ShipmentMethod";
import { displayPrice } from "../utils/money";
import { getCurrentPrice } from "../utils/getCurrentPrice";
import { useAppSelector } from "../state/store";
import { chooseShipment } from "../state/delivery";
import { useCurrency } from "../currencyContext/CurrencyContext";

const DeliveryContainer = styled.section`
  margin-top: 20px;
`;

const Delivery = (): JSX.Element => {
  const {
    state: { selectedCurrency },
  } = useCurrency();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const dispatch = useDispatch();
  const shipment = useAppSelector((state) => state.delivery.shipmentMethod);
  const discountedSum = useAppSelector(getDiscountedSum);

  return (
    <DeliveryContainer>
      <ListHeader>{t("Delivery")}</ListHeader>
      {shipmentMethods.map((method) => {
        const isNotFreeDelivery =
          getCurrentPrice(discountedSum, selectedCurrency) <
          ((method && getCurrentPrice(method.freeFrom, selectedCurrency)) ??
            Infinity);
        const price = displayPrice(method.price);
        return (
          <Row key={method.type}>
            <Name>
              <label htmlFor={method.type}>
                <input
                  type="radio"
                  name="shipment"
                  id={method.type}
                  value={method.type}
                  checked={shipment?.type === method.type}
                  onChange={() =>
                    dispatch(chooseShipment({ methodType: method.type }))
                  }
                />
                {method.name[language]}
              </label>
            </Name>
            <Cell data-testid={`${method.type}Price`}>{isNotFreeDelivery ? price : t("free")}</Cell>
          </Row>
        );
      })}
    </DeliveryContainer>
  );
};

export default Delivery;
