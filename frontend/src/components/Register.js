import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';
import AvatarSlider from './AvatarSlider';

import './styles/register.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      avatar_select: 'orange',
      slogan: '',
      errors: {},
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAvatarSlider = this.handleAvatarSlider.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAvatarSlider(data) {
    const imageChosen = data
    this.setState({
      avatar_select: imageChosen
    });
  }


  handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
      avatar: this.state.avatar_select,
      slogan: this.state.slogan
    }
    this.props.registerUser(user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    const { errors } = this.state;
    return(
      <div className="registerContainer">
        <div className="avatarPreview">
        <AvatarSlider handlerFromRegister={this.handleAvatarSlider}/>
          {this.state.slogan.length > 0 &&
            <div className="sloganContainer">
              <h3>{this.state.slogan}</h3>
              <p>{"-  " + this.state.name}</p>
            </div>
          }
        </div>
        <div className="registerForm">
          <h2>Please Choose An Avatar, And Create A Login To Get Started!</h2>
          <form onSubmit={ this.handleSubmit }>
            <div>
              <input
                type="text"
                placeholder="Name"
                className={classnames("foodieInputs nameInput", {
                  'is-invalid': errors.name
                })}
                name="name"
                onChange={ this.handleInputChange }
                value={ this.state.name }
              />
              {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
            </div>
            <div>
                <input
                type="email"
                placeholder="Email"
                className={classnames("foodieInputs emailInput", {
                  'is-invalid': errors.email
                })}
                name="email"
                onChange={ this.handleInputChange }
                value={ this.state.email }
                />
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
            </div>
            <div>
                <input
                type="password"
                placeholder="Password"
                className={classnames("foodieInputs passwordInput", {
                  'is-invalid': errors.password
                })}
                name="password"
                onChange={ this.handleInputChange }
                value={ this.state.password }
                />
                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
            </div>
            <div>
                <input
                type="password"
                placeholder="Confirm Password"
                className={classnames("foodieInputs passwordConfirmInput", {
                  'is-invalid': errors.password_confirm
                })}
                name="password_confirm"
                onChange={ this.handleInputChange }
                value={ this.state.password_confirm }
                />
                {errors.password_confirm && (<div className="invalid-feedback"> {errors.password_confirm}</div>)}
            </div>
            <div>
                <input
                type="text"
                className="foodieInputs sloganInput"
                placeholder="Your Awesome Food Slogan Here... such as FEED ME SEYMORE"
                name="slogan"
                onChange={ this.handleInputChange }
                value={ this.state.slogan }
                />
            </div>
                <button type="submit" className="primaryBtn registerUserBtn">
                    Register User
                </button>
            </form>
          </div>
      </div>
)
}
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register));
