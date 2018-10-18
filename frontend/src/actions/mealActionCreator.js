import axios from 'axios';
import { GET_ERRORS } from './types';

export const postNewMeal = (meal, history, partyID, userID) => dispatch => {
  axios.put('/api/users/' + userID + '/parties/' + partyID, meal)
    // .then(res => history.push('./api/users/' + userID + 'parties/' + res.data._id))
    .then(console.log(meal))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}
