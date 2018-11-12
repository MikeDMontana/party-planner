import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import coffee from '../images/coffeeNoCircle.png'

import './styles/profile.css';

class ViewParty extends Component {
  constructor(props) {
    super(props);

    this.findRecipesBtnHandler = this.findRecipesBtnHandler.bind(this);
    this.selectedMealHandler = this.selectedMealHandler.bind(this);
  }

  findRecipesBtnHandler(mid) {
    let userID = this.props.match.params.user_id;
    let partyID = this.props.match.params.party_id;
    let mealID = mid.target.value;

    this.props.history.push('/' + userID + '/parties/' + partyID + '/meals/' + mealID + '/recipeSearch')
  }

  selectedMealHandler(e) {
    let userID = this.props.match.params.user_id;
    let partyID = this.props.match.params.party_id;
    let selectedMeal = this.props.party.party.meals[e.target.value]._id;

    this.props.history.push('/' + userID + '/parties/' + partyID + '/meals/' + selectedMeal + '/view')
  }

  render() {
    const {user} = this.props.auth;
    const {party} = this.props.party;
    return(
      <div className="viewPartyContainer">
        <div className="profileColumnLeft">
          <h2 className="profilePartiesTitle">{party.partyTitle}<span className="partiesLengthMeta">{' (' + party.meals.length + ') meals total'}</span></h2>
          <ul className="userMealsList">
          {party.meals.map((meal, i) =>
            <div className="mealListed">
              <div className="mealTitleRow">
                <li className="mealDate">{i + 1}</li>
                <li className="mealTitle" key={meal.mealTitle}
                  value={i} onClick={this.selectedMealHandler}>
                  {meal.mealTitle}
                </li>
              </div>
                <li className="mealDescription" key={meal.mealDescription}>
                  {meal.mealDescription ? meal.mealDescription : <em>"No Description Available"</em>}
                </li>
                <button onClick={this.findRecipesBtnHandler}
                className="findRecipesBtn"
                value={meal._id}>Find Recipes</button>
            </div>
          )}
            </ul>
        </div>

        <div className="profileColumnRight">
        <img
          src={coffee}
          className="characterIlloRight"
          alt="character Illustration by Mike Dreiling Design And Development"
        />
        </div>

      </div>
    );
  }
}

ViewParty.propTypes = {
  auth: PropTypes.object.isRequired,
  party: PropTypes.object.isRequired,
  meal: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  party: state.party,
  meal: state.meal
})

export default connect(mapStateToProps, null)(withRouter(ViewParty));
