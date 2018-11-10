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
    console.log(user);
    return(
      <div className="profileContainer">
        <div className="profileColumnLeft">
          <h2 className="profilePartiesTitle">Parties<span className="partiesLengthMeta">{' (' + user.parties.length + ') total'}</span></h2>
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

        <div className="profileColumnRight">
          <img
            src={`images/${user.avatar}.png`}
            alt={user.name}
            title={user.name}
            className="rounded-circle avatarImg"
          />
          <div className="sloganContainer">
            <p><b><em>{user.slogan + " " + " - "}</em></b>{user.name}</p>
          </div>
          <p className="userMeta">
          User since {user.date.charAt(5) + user.date.charAt(6) + '/'
          + user.date.charAt(8) + user.date.charAt(9) + '/'
          + user.date.charAt(2) + user.date.charAt(3)}
          </p>
        </div>
      </div>
    );
  }
}



Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  viewSelectedParty: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  party: state.party
})

export default connect(mapStateToProps, {viewSelectedParty})(withRouter(Profile));
