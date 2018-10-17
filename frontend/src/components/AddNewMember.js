import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addMember } from '../actions/addNewMemberActionCreator';

import './styles/addNewMember.css';

class AddNewMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMember: ''
    }

    this.handleNewMemberInput = this.handleNewMemberInput.bind(this);
    this.submitNewMember = this.submitNewMember.bind(this);
  }

  handleNewMemberInput(e) {
    this.setState({
      newMember: e.target.value
    });
  }

  submitNewMember(e) {
    e.preventDefault();
    this.setState({
      newMember: ''
    });
    this.props.addMember(this.state.newMember);
  }

  render() {
    return(
      <div className="addNewMemberContainer">
        <input
          type="text"
          className="addNewMemberInput"
          value={this.state.newMember}
          placeholder="Add foodie friend email!"
          onChange={this.handleNewMemberInput}
        />
        <button
        onClick={this.submitNewMember}
        className="addNewMemberBtn">SUBMIT</button>
      </div>
    );
  }
};

AddNewMember.propTypes = {
  addMember: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  members: state.members
})


export default connect(mapStateToProps, {addMember})(withRouter(AddNewMember));
