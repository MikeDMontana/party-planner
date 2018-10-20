import React, { Component } from 'react';
import axios from 'axios';
import './styles/newrecipesearch.css';

import coffee from '../images/coffeeNoCircle.png'

class NewRecipeSearch extends Component {
  constructor(props) {
    super(props);

    this.state={
      recipeSearch: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleRecipeSubmit = this.handleRecipeSubmit.bind(this);
  }

  handleSearchChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  handleRecipeSubmit(e) {
    e.preventDefault();
    let config = {'X-Mashape-Key': 'thENAA1AsWmshrk3g1Wkjto9yLEcp1l5DdUjsnNgmYe1qsTLC4',
                  'Accept': 'application/json'};

    axios.get('/api/users/' +
              this.props.match.params.user_id +
              '/parties/' +
              this.props.match.params.party_id +
              '/meals/' +
              this.props.match.params.meal_id +
              '/recipes/' +
              this.state.recipeSearch,
              {headers: config})
      .then((res) => {
        let searchResults = res.data.results;
        console.log(searchResults);
      });
  }

  render() {
    return(
      <div className="newRecipeSearchContainer">
        <div className="newRecipeSearchLeftSide">
          <img src={coffee} alt="food illustration by Mike Dreiling Design and Development" />
          <form className="newRecipeSearchForm" onSubmit={ this.handleRecipeSubmit }>
            <h2>Find Recipes! Then Save!</h2>
            <p>search <em>via ingredient(s)</em> below</p>
            <input
              type="text"
              className="foodiesInputs newRecipeSearchInput"
              name="recipeSearch"
              onChange={ this.handleSearchChange }
              value={ this.state.recipeSearch }
            />
            <button
              type="submit"
              className="primartyBtn recipeSearchBtn"
            >SEARCH</button>
          </form>
        </div>
        <div className="newRecipeSearchRightSide">
          <p>results</p>
        </div>
      </div>
    );
  }
}

export default NewRecipeSearch;
