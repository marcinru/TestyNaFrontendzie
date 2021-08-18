import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ErrorMessage from "../atoms/ErrorMessage";
import { availableDiscounts } from "../types/Discount";
import { addDiscount } from "../state/cart";

const DiscountSection = styled.div`
  margin-top: 30px;
`;

const Input = styled.input`
  margin-right: 10px;
`;

const Button = styled.button``;

const Discount = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState("");

  const handleAddDiscount = () => {
    const formattedCode = code.toUpperCase();
    if (
      code !== "" &&
      !availableDiscounts
        .map((discount) => discount.code)
        .includes(formattedCode)
    ) {
      console.log(formattedCode, availableDiscounts);
      setError("Kod rabatowy jest nieprawidłowy");
    }
    dispatch(addDiscount({ code: formattedCode }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setCode(event.target.value);
  };

  return (
    <DiscountSection>
      <Input
        placeholder={t("Add a discount code")}
        value={code}
        onChange={handleInputChange}
      />
      <Button onClick={handleAddDiscount}>{t("Add a code")}</Button>
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </DiscountSection>
  );
};

export default Discount;
