import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { viewSelectedRecipe } from '../actions/viewSelectedRecipeActionCreator';
import './styles/newrecipesearch.css';

class NewRecipeSearch extends Component {
  constructor(props) {
    super(props);

    this.state={
      recipeSearch: '',
      searchResults: [],
      selectedRecipe: {},
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleRecipeSubmit = this.handleRecipeSubmit.bind(this);
    this.selectedRecipeHandler = this.selectedRecipeHandler.bind(this);
  }

  handleSearchChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  selectedRecipeHandler(e) {
    let newlySelectedRecipe = e;
    let userID = this.props.match.params.user_id;
    let partyID = this.props.match.params.party_id;
    let mealID = this.props.match.params.meal_id;

    this.props.viewSelectedRecipe(newlySelectedRecipe);
    this.props.history.push('/' + userID + '/parties/' + partyID + '/meals/' + mealID + '/recipeSearch/viewRecipe');
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
              this.state.recipeSearch
              // ,{headers: config}
            )
      .then((res) => {
        let newSearchResults = res.data.hits;
        console.log(newSearchResults);
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
              <div className='recipeCard'>
                <li key={i}>
                  <img src={recipe.recipe.image}
                  alt={recipe.recipe.label + 'display from Mike Dreiling Design and Development'} />
                </li>
                <li key={recipe.recipe.label}>
                  <p className="recipeCaption">{recipe.recipe.label}</p>
                </li>
                <li key={recipe.recipe.shareAs}><button
                    className="saveRecipeBtn"
                    value={recipe.recipe}
                    onClick={() => this.selectedRecipeHandler(recipe.recipe)}
                    >VIEW</button>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

NewRecipeSearch.propTypes = {
  viewSelectedRecipe: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  recipe: state.recipe
});

export default connect(mapStateToProps, { viewSelectedRecipe })(withRouter(NewRecipeSearch));
