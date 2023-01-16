import React from 'react';
import { Link } from 'react-router-dom';
import ProdutcList from '../components/ProductList';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
    products: [],
    id: '',
    teste: false,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submitHandleTwo = (radioid) => {
    this.setState({
      id: radioid,
      search: '',
    }, async () => {
      const { search, id } = this.state;
      const result = await getProductsFromCategoryAndQuery(id, search);
      this.setState({ products: result, teste: true });
    });
  };

  submitHandle = () => {
    this.setState({
      id: '',
    }, async () => {
      const { search, id } = this.state;
      const result = await getProductsFromCategoryAndQuery(id, search);
      this.setState({ products: result, teste: true, search: '' });
    });
  };

  render() {
    const { products, id, search, teste } = this.state;
    return (
      <section>
        <div>
          <label htmlFor="search">
            Pesquisa:
            <input
              id="search"
              data-testid="query-input"
              type="text"
              name="search"
              onChange={ this.handleInput }
              value={ search }
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.submitHandle }
          >
            Pesquisar
          </button>
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
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
        <Categories value={ id } handleInput={ this.submitHandleTwo } />
        <div>
          {teste > 0
            ? (
              <ProdutcList
                products={ products.results }
              />
            )
            : <p>Nenhum produto foi encontrado</p> }
        </div>
      </section>
    );
  }
}

export default Home;
