import axios from 'axios';
import { GET_ERRORS, POST_NEW_PARTY } from './types';

export const postNewParty = (party, history, user) => dispatch => {
  let userID = user.id;

  // update user then
  // the latest party created is returned via response
  // take the latest party data and push user to create meal screen
  axios.put('/api/users/' + userID + '/newparty', party)
    // .then(res => history.push('./api/users/' + userID + 'parties/' + res.data._id))
    .then( (res) => {
      let partyID = res.data._id;
      history.push('/' + userID + '/parties/' + partyID)})
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}
