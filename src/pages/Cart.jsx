import React, { Component } from 'react';
import Button from '../components/Button';
import CartProduct from '../components/CartProduct';

export default class Cart extends Component {
  state = {
    productsList: [],
  };

  componentDidMount() {
    this.handleCartProduct();
  }

  handleCartProduct = async () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    console.log(cartProducts);
    this.setState({ productsList: cartProducts });
  };

  render() {
    const { productsList } = this.state;
    return (
      <div className="cart-div">
        <div>
          { (!productsList || productsList.length === 0) ? (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          ) : (
            productsList.map((item) => (
              <CartProduct
                name={ item.productObj.title }
                image={ item.productObj.thumbnail }
                quantity={ item.quantity }
                price={ item.productObj.price }
                key={ item.productObj.id }
              />
            )))}
        </div>
        <div className="checkout-button-div">
          <Button text="Finalizar Compra" />
        </div>
      </div>
    );
  }
}
