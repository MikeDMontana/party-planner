import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './styles/profile.css';

class ViewRecipe extends Component {
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
    const {user} = this.props.auth;
    const {party} = this.props.party;
    return(
      <div className="viewPartyContainer">
        <div className="profileColumn">
          <h2>{party.partyTitle}</h2>
          <ul className="userMealsList">
            {party.meals.map((meal, i) =>
              <div className="mealListed">
                <li className="mealTitle"
                    key={meal.mealTitle}
                    value={i}
                    onClick={this.selectedPartyHandler}>
                  <h3>{meal.mealTitle}</h3>
                </li>
                <li className="mealDescription" key={meal.mealDescription}>
                  {meal.mealDescription ? meal.mealDescription : <em>"No Description Available"</em>}
                </li>
                <li>
                  <button onClick={this.findRecipesBtnHandler}
                  className="goToRecipeSearchBtn"
                  value={meal._id}>Find Recipes</button>
                </li>
              </div>
            )}
            </ul>
        </div>

        <div className="profileColumn">
          <img
            src={`images/${user.avatar}.png`}
            alt={user.name}
            title={user.name}
            className="rounded-circle avatarImg"
          />
          <div className="sloganContainer">
            <p><b><em>{user.slogan + " " + " - "}</em></b>{user.name}</p>
          </div>
        </div>

      </div>
    );
  }
}

ViewRecipe.propTypes = {
  auth: PropTypes.object.isRequired,
  party: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  party: state.party
})

export default connect(mapStateToProps, null)(withRouter(ViewRecipe));
