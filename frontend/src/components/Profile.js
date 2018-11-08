import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { viewSelectedParty } from '../actions/viewSelectedPartyActionCreator';

import './styles/profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.selectedPartyHandler = this.selectedPartyHandler.bind(this);
  }

  selectedPartyHandler(e) {
    let selectedParty = this.props.auth.user.parties[e.target.value];
    let userID = this.props.auth.user.id;

    this.props.viewSelectedParty(selectedParty);
    this.props.history.push('/' + userID + '/parties/' + selectedParty._id + '/view')
  }

  render() {
    const {user} = this.props.auth;
    return(
      <div className="profileContainer">
        <div className="profileColumn">
          <h2>Parties</h2>
          <ul className="userPartiesList">
            {user.parties.map((party, i) =>
              <div className="partyListed">
                <li key={party._id} className="partyDate">
                  {party.date != null
                    ? party.date.charAt(5) + party.date.charAt(6) + '/' + party.date.charAt(8) + party.date.charAt(9)
                    : "?"}
                </li>
                <li className="partyTitle"
                    key={party.partyTitle}
                    value={i}
                    onClick={this.selectedPartyHandler}>
                  {party.partyTitle}
                  <span className="partyDescription">{party.partyDescription ? party.partyDescription : "No Description Available"}</span>
                </li>
              </div>
            )}
          </ul>
          <div className="createNewPartyBtn">
            <Link to="/newparty">Create A New Party</Link>
          </div>
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

        <div className="profileColumn">
          <h2>Friends</h2>
        </div>
      </div>
    );
  }
}

// <li key={party.date}>
//   {party.date.charAt(5) + party.date.charAt(6) + '/' + party.date.charAt(8) + party.date.charAt(9)}
// </li>


Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  viewSelectedParty: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  party: state.party
})

export default connect(mapStateToProps, {viewSelectedParty})(withRouter(Profile));
