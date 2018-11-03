import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import Profile from './components/Profile';
import NewParty from './components/NewParty';
import NewMeal from './components/NewMeal';
import NewRecipeSearch from './components/NewRecipeSearch';
import ViewParty from './components/ViewParty';
import ViewRecipe from './components/ViewRecipe';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
          <div>
            <Navbar />
            <Footer />
              <Route exact path='/' component={ About } />
              <div className='homeContainer'>
                <Route exact path='/register' component={ Register } />
                <Route exact path='/login' component={ Login } />
                <Route exact path='/about' component={ About } />
                <Route exact path='/profile' component={ Profile } />
                <Route exact path='/newparty' component={ NewParty } />
                <Route exact path='/:user_id/parties/:party_id' component= { NewMeal } />
                <Route exact path='/:user_id/parties/:party_id/view' component= { ViewParty } />
                <Route exact path='/:user_id/parties/:party_id/meals/:meal_id/recipeSearch' component={ NewRecipeSearch } />
                <Route exact path='/:user_id/parties/:party_id/meals/:meal_id/recipeSearch/viewRecipe' component={ ViewRecipe } />
              </div>
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
