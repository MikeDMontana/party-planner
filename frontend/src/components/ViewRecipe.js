import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './styles/profile.css';

class ViewRecipe extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log(this.props.recipe);
    return(
      <div className="viewPartyContainer">
        <div className="profileColumn">
          <h2>View Selected Recipe</h2>
        </div>

        <div className="profileColumn">

        </div>

      </div>
    );
  }
}

ViewRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  recipe: state.recipe,
})

export default connect(mapStateToProps, null)(withRouter(ViewRecipe));
