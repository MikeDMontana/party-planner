import axios from 'axios';
import { GET_ERRORS, POST_NEW_PARTY } from './types';

export const postNewMeal = (meal, history, party, user) => dispatch => {
  let userID = user.id;
  let partyID = party.id;

  // update user then
  // the latest party created is returned via response
  // take the latest party data and push user to create meal screen
  axios.put('./api/users/' + userID + '/parties/' + partyID, meal)
    // .then(res => history.push('./api/users/' + userID + 'parties/' + res.data._id))
    .then(res => history.push('/about'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}
