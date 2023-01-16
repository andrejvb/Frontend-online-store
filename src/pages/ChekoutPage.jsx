import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartProduct from '../components/CartProduct';

class ChekoutPage extends Component {
  state = {
    checkoutList: [],
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    isInvalid: true,
    clicked: false,
  };

  componentDidMount() {
    this.getLSItems();
  }

  getLSItems = async () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    console.log(cartProducts);
    this.setState({ checkoutList: cartProducts });
  };

  handleClick = () => {
    const { isInvalid } = this.state;
    this.setState({
      clicked: true,
    });

    if (!isInvalid) {
      localStorage.setItem('cartProducts', JSON.stringify([]));
      console.log(localStorage.getItem('cartProducts'));
    }
  };

  checkInvalid = () => {
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      payment,
    } = this.state;

    const result = !!(
      !fullname || !email || !cpf || !phone || !cep || !address || !payment
    );
    this.setState({
      isInvalid: result,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.checkInvalid);
  };

  render() {
    const { checkoutList, isInvalid, clicked } = this.state;
    return (
      <>
        <section>
          <Link
            to="/Cart"
          >
            <button
              type="button"
              data-testid="shopping-cart-button"
            >
              Carrinho de compras
            </button>
          </Link>
          <h2>
            {
              checkoutList.map((item) => (
                <CartProduct
                  name={ item.productObj.title }
                  image={ item.productObj.thumbnail }
                  quantity={ item.quantity }
                  price={ item.productObj.price }
                  key={ item.productObj.id }
                />
              ))
            }
          </h2>
        </section>
        <form method="GET">
          <label htmlFor="fullname">
            Nome Completo:
            <input
              type="text"
              id="fullname"
              name="fullname"
              data-testid="checkout-fullname"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              data-testid="checkout-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cpf">
            CPF:
            <input
              type="text"
              id="cpf"
              name="cpf"
              data-testid="checkout-cpf"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="phone">
            Telefone:
            <input
              type="text"
              id="phone"
              name="phone"
              data-testid="checkout-phone"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cep">
            CEP:
            <input
              type="text"
              id="cep"
              name="cep"
              data-testid="checkout-cep"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="address">
            Endereço:
            <input
              type="text"
              id="address"
              name="address"
              data-testid="checkout-address"
              onChange={ this.handleChange }
            />
          </label>
          <section className="payment-selector-section">
            <p>Método de Pagamento:</p>
            <label htmlFor="ticket">
              Boleto
              <input
                type="radio"
                name="payment"
                id="ticket"
                value="ticket"
                data-testid="ticket-payment"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="visa">
              Visa
              <input
                type="radio"
                name="payment"
                id="visa"
                value="visa"
                data-testid="visa-payment"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="master">
              Master
              <input
                type="radio"
                name="payment"
                id="master"
                value="master"
                data-testid="master-payment"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="elo">
              Elo
              <input
                type="radio"
                name="payment"
                id="elo"
                data-testid="elo-payment"
                value="elo"
                onChange={ this.handleChange }
              />
            </label>
          </section>
          {
            (isInvalid && clicked) && (
              <h3 data-testid="error-msg">Campos inválidos</h3>
            )
          }
          <Link
            to={ !isInvalid && '/' }
          >
            <button
              type="button"
              data-testid="checkout-btn"
              onClick={ this.handleClick }
            >
              Comprar
            </button>
          </Link>
        </form>
      </>
    );
  }
}

export default ChekoutPage;
