import axios from 'axios';
import { GET_ERRORS, POST_NEW_PARTY } from './types';

export const postNewParty = (party, history, user) => dispatch => {
  let userID = user.id;

  axios.put('./api/users/' + userID + '/newparty', party)
    .then(res => history.push('./about'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}
