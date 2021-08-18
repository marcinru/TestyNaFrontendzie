import userEvent from "@testing-library/user-event";
import { getTestStore, render, screen } from "test-utils";
import React from "react";

import CartList from "../CartList/CartList";
import { addDiscount, CartItem } from "../../state/cart";
import { Currency } from "../../types/Currency";

const product: CartItem = {
  id: "123",
  brand: "Szkoła testów",
  name: {
    pl: "Kurs Testy na Frontendzie",
    en: "Frontend tests",
  },
  price: [{ currency: Currency.USD, price: 15000 }],
  quantity: 1,
};

describe("<CartList/>", () => {
  it("displays empty cart message when cart is empty", () => {
    render(<CartList />);
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("display contents of the cart when it is NOT empty", () => {
    const store = getTestStore({
      cart: { items: [product], appliedDiscount: null },
    });
    render(<CartList />, { store });

    expect(
      screen.getByText("Frontend tests - Szkoła testów"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("summary-price")).toHaveTextContent("150 $");
  });

  it("allows to increase quantity of a product in the cart", () => {
    const store = getTestStore({
      cart: { items: [product], appliedDiscount: null },
    });
    render(<CartList />, { store });

    const addMoreButton = screen.getByText("+1");
    expect(addMoreButton).toBeInTheDocument();

    userEvent.click(addMoreButton);
    expect(screen.getByTestId("product-quantity")).toHaveTextContent("2");
    expect(screen.getByTestId("toPay")).toHaveTextContent("300 $");
  });

  it("allows to decrease quantity of a product in the cart", () => {
    const store = getTestStore({
      cart: { items: [product], appliedDiscount: null },
    });
    render(<CartList />, { store });

    const removeOneButton = screen.getByText("-1");
    expect(removeOneButton).toBeInTheDocument();

    userEvent.click(removeOneButton);

    expect(screen.getByText("Your cart is empty"));
    expect(store.getState().cart.items).toHaveLength(0);
  });

  it("recalculates total after discount", () => {
    const store = getTestStore({
      cart: { items: [product], appliedDiscount: null },
    });
    render(<CartList />, { store });

    expect(screen.queryByText(/Discount/)).not.toBeInTheDocument();

    store.dispatch(addDiscount({ code: "DLA_NAJLEPSZYCH" }));

    expect(screen.getByText(/Discount/)).toBeInTheDocument();
    expect(screen.getByTestId("toPay")).toHaveTextContent("130.5 $");
  });
});
