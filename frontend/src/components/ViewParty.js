import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './styles/profile.css';

class ViewParty extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {user} = this.props.auth;
    const {selectedParty} = this.props.match.params.party_id;
    return(
      <div className="viewPartyContainer">
        <div className="profileColumn">
          <h2>View the selected Party</h2>
          <p>{user.parties[this.props.match.params.party_id].partyTitle}</p>
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

ViewParty.propTypes = {
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  match: state.match
})

export default connect(mapStateToProps, null)(withRouter(ViewParty));
