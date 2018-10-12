import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { postNewParty } from '../actions/partiesActionCreator';

import './styles/newparty.css';

class NewParty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      partyTitle: '',
      date: '',
      partyDescription: '',
      members: [],
      newMember: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewMemberChange = this.handleNewMemberChange.bind(this);
    this.handleNewMemberSubmit = this.handleNewMemberSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    });
    console.log(e);
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = this.props.auth.user;
    const newParty = {
      partyTitle: this.state.partyTitle,
      date: this.state.date,
      partyDescription: this.state.partyDescription,
      members: this.state.members,
    }
    this.props.postNewParty(newParty, this.props.history, user);
  }

  handleNewMemberChange(e) {
    const newMemberInput = e.target.value;
    this.setState({
      newMember: newMemberInput
    });
  }

  handleNewMemberSubmit(e) {
    e.preventDefault();
    // call to redux reducer here to add newMember to the members array
  }


  // this component will create a new party or Event
  // the user will fill out a form giving a date, title, description of the Event
  // the user will also add member by member emails to the party

  render() {
    const {user} = this.props.auth;
    return (
      <div className="newPartyContainer">
        <h2>New Party</h2>
        <form onSubmit={ this.handleSubmit }>
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
          <div>
            <input
            type="text"
            placeholder="Enter Member Emails Here"
            className="foodieInputs partyNameInput"
            name="newMember"
            onChange={ this.handleInputChange }
            value={ this.state.newMember }
            />
            <button>Add Member</button>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

NewParty.propTypes = {
  postNewParty: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  newMember: state.newMember,
  auth: state.auth
});

export default connect(mapStateToProps, { postNewParty })(withRouter(NewParty));
