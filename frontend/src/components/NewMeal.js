import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { postNewMeal } from '../actions/mealActionCreator';
import './styles/newmeal.css';

import coffee from '../images/coffeeNoCircle.png'

class NewMeal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mealTitle: '',
      mealDescription: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = this.props.auth.user;
    let party = this.props.auth.user.parties[this.props.auth.user.parties.length - 1];
    const newMeal = {
      mealTitle: this.state.partyTitle,
      mealDescription: this.state.partyDescription,
      recipes: []
    }
    this.props.postNewMeal(newMeal, this.props.history, party, user);
  }

  // this component will create a new meal
  // the user will fill out a form giving a title and description of the meal

  render() {
    return (
      <div className="newMealContainer">
      <div className="newMealFormContainer">
        <div className="titleColumn">
          <img src={coffee} alt="coffee cup illustration by Mike Dreiling Design and Development"/>
        </div>
        <form className="newMealForm" onSubmit={ this.handleSubmit }>
          <div>
            <h2>New Meal</h2>
            <p>Now create a meal <em>(ya know, lunch, appetizer, dinner etc.. )</em>.
            Next, you will search and save recipes INSIDE each meal you create!</p>
          </div>
          <div>
            <input
            type="text"
            placeholder="Name Your Meal"
            className="foodieInputs mealNameInput"
            name="mealTitle"
            onChange={ this.handleInputChange }
            value={ this.state.mealTitle }
            />
          </div>
          <div>
            <input
            type="text"
            placeholder="Short Description Of Your Meal"
            className="foodieInputs mealDescriptionInput"
            name="mealDescription"
            onChange={ this.handleInputChange }
            value={ this.state.mealDescription }
            />
          </div>
          <div>
            <button type="submit" className="primaryBtn loginUserBtn">Submit</button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}



NewMeal.propTypes = {
  postNewMeal: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { postNewMeal })(withRouter(NewMeal));
