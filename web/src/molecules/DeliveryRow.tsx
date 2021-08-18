import React from "react";
import { useTranslation } from "react-i18next";

import { Cell, Name, Row } from "../atoms/Row";
import { getDelivery, getDiscountedSum } from "../state/selectors";
import { displayPrice } from "../utils/money";
import { getCurrentPrice } from "../utils/getCurrentPrice";
import { useAppSelector } from "../state/store";
import { useCurrency } from "../currencyContext/CurrencyContext";

const DeliveryRow = (): JSX.Element => {
  const {
    state: { selectedCurrency },
  } = useCurrency();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const delivery = useAppSelector(getDelivery);
  const discountedSum = useAppSelector(getDiscountedSum);
  const isNotFreeDelivery =
    getCurrentPrice(discountedSum, selectedCurrency) <
    ((delivery && getCurrentPrice(delivery.freeFrom, selectedCurrency)) ??
      Infinity);

  return (
    <>
      {delivery ? (
        <Row>
          <Name>{delivery.name[language]}</Name>
          <Cell>
            {isNotFreeDelivery ? displayPrice(delivery.price) : t("free")}
          </Cell>
        </Row>
      ) : null}
    </>
  );
};

export default DeliveryRow;
