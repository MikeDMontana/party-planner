import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import logo from '../images/logo.png';

import './styles/navbar.css';

class Navbar extends Component {

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const {isAuthenticated, user} = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
      <li>
        <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
          <img
            src={`images/${user.avatar}.png`}
            alt={user.name}
            title={user.name}
            className="rounded-circle"
            style={{ width: '25px', marginRight: '5px'}}
          />
          Logout
        </a>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      </ul>
    )
    const guestLinks = (
      <ul className="navLinks">
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Sign In</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </ul>
    )
    return (
      <nav className="navbar">
        <Link to="/"><img src={logo} alt="Foodies Party Planner logo" /></Link>
        <div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
