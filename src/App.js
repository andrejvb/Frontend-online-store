import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import './App.css';
import Cart from './pages/Cart';
import ChekoutPage from './pages/ChekoutPage';
import Home from './pages/Home';
import Product from './pages/Product';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ Cart } />
          <Route exact path="/checkout" component={ ChekoutPage } />
          <Route path="/product-details/:id" component={ Product } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
