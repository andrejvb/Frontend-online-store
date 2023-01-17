import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class Categories extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  handleInputTwo = ({ target }) => {
    const { handleInput } = this.props;
    handleInput(target.id);
  };

  fetchCategories = async () => {
    const response = await getCategories();
    this.setState({
      categories: response,
    });
  };

  render() {
    const { categories } = this.state;
    return (
      <div className="categories-div">
        <p>Categorias</p>
        {categories.map((category) => (
          <div
            key={ category.id }
            className="categorie"
          >
            <label
              htmlFor={ category.id }
            >
              <input
                type="radio"
                name="valueId"
                onChange={ this.handleInputTwo }
                id={ category.id }
                data-testid="category"
              />
              { category.name }
            </label>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

Categories.propTypes = {
  handleInput: PropTypes.func.isRequired,
};
