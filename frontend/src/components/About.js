import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles/about.css';

const github = require('../images/githubIcon.png');
const linkedIn = require('../images/linkedInIcon.png');
const dribbble = require('../images/dribbbleIcon.png');
const ketchup = require('../images/ketchup.png');


class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="aboutContainer">
        <div className="aboutBox">
          <div className="aboutLeftSide">
            <h2>WELCOME!</h2>
            <hr />
            <p>Foodies Party Planner is an app illustrated, designed, and developed by Mike Dreiling.  Use this app to help you and your foodie friends plan get-togethers.</p>
            <ol>
              <li>Make parties</li>
              <li>Plan meals</li>
              <li>search for great recipes</li>
              <li>save recipes to your party board</li>
              <li>Party members can upvote or downvote recipe</li>
              <li>Too many downvotes and the recipe disappears</li>
            </ol>
            <p>In the end everyone knows what will be made and by whom!  <br />Easy <b><em>PEAS</em></b>-y.  Get started by <Link to="/register"><span className="inLineLink">Registering...</span></Link></p>
          </div>
          <div className="aboutRightSide">
            <img src={ketchup} alt="food illustration by Mike Dreiling Illustrator Developer Designer" />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
