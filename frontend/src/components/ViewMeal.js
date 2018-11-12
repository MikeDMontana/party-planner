import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import coffee from '../images/coffeeNoCircle.png'

import './styles/profile.css';

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
    // const {meal} = this.props.meal;
    return(
      <div className="viewMealContainer">
        <h1>Current Meal</h1>
      </div>
    );
  }
}

// <div className="profileColumnLeft">
//   <h2 className="profileMealTitle">{meal.mealTitle}<span className="partiesLengthMeta">{' (' + meal.recipes.length + ') recipes total'}</span></h2>
//   <ul className="userMealsList">
//   {meal.recipes.map((recipe, i) =>
//     <div className="recipesListed">
//       <div className="recipeTitleRow">
//         <li className="recipeDate">{i + 1}</li>
//         <li className="recipeTitle" key={recipe.recipeName}>
//           <h3>{recipe.recipeName}</h3>
//         </li>
//       </div>
//         <li className="recipeLink" key={recipe.recipeLink}>
//           <a href={recipe.recipeLink} target="_blank" alt="view full recipe">VIEW FULL RECIPE</a>
//         </li>
//         <button onClick={this.findRecipesBtnHandler}
//         className="findRecipesBtn"
//         value={this.props.meal._id}>Find Recipes</button>
//     </div>
//   )}
//     </ul>
// </div>
//
// <div className="profileColumnRight">
// <img
//   src={coffee}
//   className="characterIlloRight"
//   alt="character Illustration by Mike Dreiling Design And Development"
// />
// </div>



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
