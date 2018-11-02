import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './styles/profile.css';

class ViewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeName: this.props.recipe.recipe.label,
      ingredients: this.props.recipe.recipe.ingredientLines,
      recipeLink: this.props.recipe.recipe.url,
      upvotes: 0,
      downvotes: 0
    }
    this.saveRecipeHandler = this.saveRecipeHandler.bind(this);
  }

  saveRecipeHandler() {
    let saveThisRecipe = {
      recipeName: this.state.recipeName,
      ingredients: this.state.ingredients,
      recipeLink: this.state.recipeLink,
      upvotes: 0,
      downvotes: 0
    }

    let userID = this.props.match.params.user_id;
    let partyID = this.props.match.params.party_id;
    let mealID = this.props.match.params.meal_id;

    axios.put('/api/users/' + userID + '/parties/' + partyID + '/meals/' + mealID + '/recipes/viewrecipe', saveThisRecipe)
          .then( (res) =>
            console.log(res))
          .catch((err) => console.log(err));
  }


  render() {
    return(
      <div className="viewPartyContainer">
        <div className="profileColumn">
          <h2>{this.state.recipeName}</h2>
          <ul className="recipeIngredients">
            {this.state.ingredients.map((ingredient, i) =>
                <li className="recipeItem" key={i}>
                  {ingredient}
                </li>
            )}
          </ul>
          <a href={this.state.recipeLink} className="primaryBtn recipeLinkBtn">Go To Recipe</a>
          <button className="primaryBtn saveRecipeBtn" onClick={this.saveRecipeHandler}>SAVE RECIPE!</button>
        </div>

        <div className="profileColumn">

        </div>

      </div>
    );
  }
}

ViewRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  recipe: state.recipe,
  user: state.user,
  party: state.party,
  meal: state.meal
})

export default connect(mapStateToProps, null)(withRouter(ViewRecipe));
