import axios from 'axios';
import { GET_ERRORS } from './types';

export const postNewMeal = (meal, history, partyID, userID) => dispatch => {
  axios.put('/api/users/' + userID + '/parties/' + partyID, meal)
    .then( (res) => {
      let mealID = res.data._id;
      history.push('/' + userID + '/parties/' + partyID + '/meals/' + mealID)})
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}
