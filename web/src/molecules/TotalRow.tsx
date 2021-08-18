import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components";
import { Cell, Name } from "../atoms/Row";
import { getTotal } from "../state/selectors";
import { useAppSelector } from "../state/store";
import { displayPrice } from "../utils/money";

const Summary = styled.h2`
  border-bottom: 2px solid #a0816c;
  display: flex;
`;

const TotalRow = (): JSX.Element => {
  const { t } = useTranslation();
  const total = useAppSelector(getTotal);

  return (
    <Summary>
      <Name>{t("To pay")}: </Name>
      <Cell data-testId="totalToPay">{displayPrice(total)}</Cell>
    </Summary>
  );
};

export default TotalRow;
