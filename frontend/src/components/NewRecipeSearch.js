import React, { Component } from 'react';
import axios from 'axios';
import './styles/newrecipesearch.css';

class NewRecipeSearch extends Component {
  constructor(props) {
    super(props);

    this.state={
      recipeSearch: '',
      searchResults: []
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
        let newSearchResults = res.data.results;
        this.setState({
          searchResults: newSearchResults
        });
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    return(
      <div className="newRecipeSearchContainer">
        <div className="newRecipeSearchTop">
          <form className="newRecipeSearchForm" onSubmit={ this.handleRecipeSubmit }>
            <h2>Find Recipes! Then Save!</h2>
            <input
              type="text"
              className="foodieInputs newRecipeSearchInput"
              name="recipeSearch"
              onChange={ this.handleSearchChange }
              value={ this.state.recipeSearch }
            />
            <button
              type="submit"
              className="primaryBtn recipeSearchBtn"
            >SEARCH</button>
          </form>
        </div>
        <div className="newRecipeSearchResultsContainer">
          <ul className="recipeResultsList">
            {this.state.searchResults.map((recipe, i) =>
              <div className="recipeCard">
                <li key={recipe.description}>
                  <img src={recipe.image}
                  alt={recipe.title + 'display from Mike Dreiling Design and Development'} />
                </li>
                <li key={recipe.title}>
                  <p className="recipeCaption">{recipe.title}</p>
                </li>
                <li><button className="saveRecipeBtn">VIEW</button></li>
              </div>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default NewRecipeSearch;
