import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './styles/profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {user} = this.props.auth;
    return(
      <div className="profileContainer">
        <div className="profileColumn">
          <h2>Parties</h2>
          <Link to="/newparty">Create A New Party</Link>
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

Profile.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(withRouter(Profile));
