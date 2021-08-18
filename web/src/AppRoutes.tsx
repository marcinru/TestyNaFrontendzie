import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import Summary from "./pages/Summary";
import { ProductPage } from "./pages/ProductPage";
import Admin from "./pages/Admin";

export const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/address">
          <Address />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/summary">
          <Summary />
        </Route>
        <Route path="/product/:id">
          <ProductPage />
        </Route>
      </Switch>
    </Router>
  );
};
