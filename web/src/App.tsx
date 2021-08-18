// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";
import React from "react";
import { Provider } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AppRoutes } from "./AppRoutes";
import { CurrencyProvider } from "./currencyContext/CurrencyContext";
import { CurrencyChanger } from "./molecules/CurrencyChanger";
import store from "./state/store";
import { UserProvider } from "./userContext/UserContext";

const stripePromise = loadStripe(
  // @ts-ignore
  __SNOWPACK_ENV__.SNOWPACK_PUBLIC_STRIPE_PUBLIC || "",
);

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <CurrencyProvider>
        <UserProvider>
          <Elements stripe={stripePromise}>
            <CurrencyChanger />
            <AppRoutes />
          </Elements>
        </UserProvider>
      </CurrencyProvider>
    </Provider>
  );
}

export default App;
