import React, { Component } from 'react';

import './styles/footer.css';

const github = require('../images/githubIcon.png');
const linkedIn = require('../images/linkedInIcon.png');
const dribbble = require('../images/dribbbleIcon.png');


export default class Footer extends Component {
  render() {
    return(
      <div className="footerContainer">
        <p>A Full Stack Project By Mike Dreiling Design & Development</p>
        <ul className="footerSocialLinks">
          <li><img src={github} alt="Mike Dreiling GitHub Link" width="20px" /></li>
          <li><img src={linkedIn} alt="Mike Dreiling linkedIn Link" width="20px" /></li>
          <li><img src={dribbble} alt="Mike Dreiling dribbble Link" width="20px" /></li>
        </ul>
      </div>
    )
  }
}
