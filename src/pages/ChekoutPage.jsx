import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartProduct from '../components/CartProduct';
import './CheckoutPage.css';

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
      <div className="checkout-page-app-div">
        <div className="shopping-cart-button-div">
          <Link
            to="/Cart"
          >
            <button
              type="button"
              data-testid="shopping-cart-button"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                alt="cart button"
              />
            </button>
          </Link>
        </div>
        <section>
          <div className="cart-products-div">
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
          </div>
        </section>
        <form method="GET">
          <h1>Finalizar Pedido</h1>
          <h3>Informações Pessoais</h3>
          {
            (isInvalid && clicked) && (
              <h3 data-testid="error-msg" className="error-msg">Campos inválidos</h3>
            )
          }
          <label htmlFor="fullname" className="label">
            Nome Completo:
            <input
              type="text"
              id="fullname"
              name="fullname"
              data-testid="checkout-fullname"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email" className="label">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              data-testid="checkout-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cpf" className="label">
            CPF:
            <input
              type="text"
              id="cpf"
              name="cpf"
              data-testid="checkout-cpf"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="phone" className="label">
            Telefone:
            <input
              type="text"
              id="phone"
              name="phone"
              data-testid="checkout-phone"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cep" className="label">
            CEP:
            <input
              type="text"
              id="cep"
              name="cep"
              data-testid="checkout-cep"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="address" className="label">
            Endereço:
            <input
              type="text"
              id="address"
              name="address"
              data-testid="checkout-address"
              onChange={ this.handleChange }
            />
          </label>
          <h2>Método de Pagamento:</h2>
          <section className="payment-selector-section">
            <label htmlFor="ticket">
              Boleto
              <img
                src="https://imagepng.org/wp-content/uploads/2019/09/boleto-simbolo.png"
                alt="boleto"
              />
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
              <img
                src="https://conteudos.xpi.com.br/wp-content/uploads/2022/01/image-963.png?w=640"
                alt="boleto"
              />
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
              <img
                src="https://freepngimg.com/thumb/credit_card/25637-6-credit-card-visa-and-master-card-transparent-image.png"
                alt="boleto"
              />
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
              <img
                src="https://3.bp.blogspot.com/-mMRfKGgcQ38/WAlbT7YTNTI/AAAAAAAASzo/JqBsj22m4O4fxhyOvyVcyxggyblRUItcgCLcB/s1600/Cart%25C3%25A3o%2BElo%2Bpatrocina%2B42%25C2%25AA%2Bedi%25C3%25A7%25C3%25A3o%2Bdo%2BS%25C3%25A3o%2BPaulo%2BFashion%2BWeek.png"
                alt="boleto"
              />
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
          <Link
            to={ !isInvalid && '/' }
            className="buy-button"
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
      </div>
    );
  }
}

export default ChekoutPage;
