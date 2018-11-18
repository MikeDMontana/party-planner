import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './styles/viewrecipe.css';

class ViewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeName: this.props.recipe.recipe.label,
      ingredients: this.props.recipe.recipe.ingredientLines,
      recipeLink: this.props.recipe.recipe.url,
      recipeImage: this.props.recipe.recipe.image,
      healthLabels: this.props.recipe.recipe.healthLabels,
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
      recipeImage: this.state.recipeImage,
      healthLabels: this.state.healthLabels,
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
      <div className="viewRecipeContainer">
        <div className="recipeLeftSide">
          <button className="primaryBtn saveRecipeBtn" onClick={this.saveRecipeHandler}>SAVE RECIPE!</button>
          <button className="primaryBtn goToRecipeSearchBtn">... OR KEEP SEARCHING</button>
        </div>

        <div className="recipeRightSide">
          <div className="recipeRightHeader">
            <div>
              <h2>{this.state.recipeName}</h2>
              <a href={this.state.recipeLink} className="recipeLinkBtn" target="_blank">Go To Recipe Website</a>
            </div>
            <img src={this.state.recipeImage} alt="Image of Recipe"/>
          </div>
          <div className="recipeRightBottom">
            <div className="ingredientList">
              <h4>INGREDIENTS</h4>
              <ul className="recipeIngredients">
                {this.state.ingredients.map((ingredient, i) =>
                    <li className="recipeItem" key={i}>
                      {ingredient}
                    </li>
                )}
              </ul>
            </div>
            <div>
              <ul className="recipeHealthIngredients">
                {this.state.healthLabels.map((healthLbl, i) =>
                  <li className="healthLabelItem" key={healthLbl}>
                    {healthLbl}
                  </li>
                )}
              </ul>
            </div>
          </div>
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
