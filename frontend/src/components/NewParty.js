import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddNewMember from './AddNewMember';
import { withRouter } from 'react-router-dom';
import { postNewParty } from '../actions/partiesActionCreator';
import './styles/newparty.css';

import coffee from '../images/coffeeNoCircle.png'

class NewParty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      partyTitle: '',
      date: '',
      partyDescription: '',
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
    const newParty = {
      partyTitle: this.state.partyTitle,
      date: this.state.date,
      partyDescription: this.state.partyDescription,
      members: this.props.members,
    }
    this.props.postNewParty(newParty, this.props.history, user);
  }

  // this component will create a new party or Event
  // the user will fill out a form giving a date, title, description of the Event
  // the user will also add member by member emails to the party

  render() {
    const {user} = this.props.auth;
    return (
      <div className="newPartyContainer">
      <div className="newPartyFormContainer">
        <div className="titleColumn">
          <img src={coffee} alt="coffee cup illustration by Mike Dreiling Design and Development"/>
        </div>
        <form className="newPartyForm" onSubmit={ this.handleSubmit }>
          <div>
            <h2>New Party</h2>
            <p>Create a party with friends so you can plan
            out recipes that everyone wants. Make sure to add your
            friends emails one by one and dont leave out a single foodie!</p>
          </div>
          <div>
            <input
            type="text"
            placeholder="Name Your Party or Event"
            className="foodieInputs partyNameInput"
            name="partyTitle"
            onChange={ this.handleInputChange }
            value={ this.state.partyTitle }
            />
          </div>
          <div>
            <input
            type="Date"
            className="foodieInputs partyNameInput"
            name="date"
            onChange={ this.handleInputChange }
            value={ this.state.date }
            />
          </div>
          <div>
            <input
            type="text"
            placeholder="Short Description Of Your Party or Foodie Event"
            className="foodieInputs partyNameInput"
            name="partyDescription"
            onChange={ this.handleInputChange }
            value={ this.state.partyDescription }
            />
          </div>
          <AddNewMember />
          <div>
            <button type="submit" className="primaryBtn loginUserBtn">Submit</button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}


NewParty.propTypes = {
  postNewParty: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  members: state.members,
});

export default connect(mapStateToProps, { postNewParty })(withRouter(NewParty));
