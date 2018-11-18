import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import coffee from '../images/coffeeNoCircle.png'

import './styles/profile.css';
import './styles/viewrecipe.css';

class ViewMeal extends Component {
  constructor(props) {
    super(props);

    this.findRecipesBtnHandler = this.findRecipesBtnHandler.bind(this);
  }

  findRecipesBtnHandler(mid) {
    let userID = this.props.match.params.user_id;
    let partyID = this.props.match.params.party_id;
    let mealID = mid.target.value;

    this.props.history.push('/' + userID + '/parties/' + partyID + '/meals/' + mealID + '/recipeSearch')
  }

  render() {
    const {meal} = this.props.meal;
    return(
      <div className="viewMealContainer">
        <div className="profileColumnLeft">
          <img src={coffee} alt="food illustration by Mike Dreiling Design and Development" />
          <h2 className="profileMealTitle">{meal.mealTitle}<span className="partiesLengthMeta">{' (' + meal.recipes.length + ') recipes total'}</span></h2>
          <button className="deleteRecipeBtn">DELETE MEAL</button>
          <button className="goToRecipeSearchBtn">SEARCH FOR MORE RECIPES</button>
        </div>

        <div className="recipeRightSide">

          <ul className="userMealsList">
          {meal.recipes.map((recipe, i) =>
            <div className="recipeListed">
              <div className="recipeRightHeader">
                <div>
                  <h2>{recipe.recipeName}</h2>
                  <a href={recipe.recipeLink} className="recipeLinkBtn" target="_blank">Go To Recipe Website</a>
                </div>
                <img src={recipe.recipeImage} alt="Image of Recipe" />
              </div>

              <div className="recipeRightBottom">
                <div className="ingredientList">
                  <h4>INGREDIENTS</h4>
                  <ul className="recipeIngredients">
                    {recipe.ingredients.map((ingredient, i) =>
                      <li className="recipeIngredient" key={ingredient}>
                        {ingredient}
                      </li>
                    )}
                  </ul>
                </div>
                <div>
                  <ul className="recipeHealthIngredients">
                    {recipe.healthLabels.map((healthLbl, i) =>
                      <li className="healthLabelItem" key={healthLbl}>
                        {healthLbl}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
            </ul>
        </div>
      </div>
    );
  }
}

ViewMeal.propTypes = {
  auth: PropTypes.object.isRequired,
  party: PropTypes.object.isRequired,
  meal: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  party: state.party,
  meal: state.meal
})

export default connect(mapStateToProps, null)(withRouter(ViewMeal));
