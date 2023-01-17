import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';

class ProductList extends React.Component {
  componentDidMount() {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    if (!cartProducts) {
      localStorage.setItem('cartProducts', JSON.stringify([]));
    }
  }

  render() {
    const { products } = this.props;
    return (
      <div className="products-div">
        {products.map((element) => (
          <>
            <Link
              to={ `/product-details/${element.id}` }
              data-testid="product-detail-link"
              key={ element.id }
            >
              <div
                key={ element.id }
                data-testid="product"
                className="product-card"
              >
                <h2>{ element.title }</h2>
                <img src={ element.thumbnail } alt={ element.title } />
                <h2>{` R$${element.price} `}</h2>
              </div>
            </Link>
            <AddToCart productObj={ element } />
          </>
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf({
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default ProductList;
