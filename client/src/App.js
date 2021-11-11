import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import ClientHome from "./components/client/ClientHome";
import Products from "./components/client/Products";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <ClientHome />
          </Route>
          <Route exact path="/products"  state = "">
            <Products />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};
export default App;


