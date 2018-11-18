import axios from 'axios';
import { GET_ERRORS, RETURN_PARTIES } from './types';

export const getAllParties = (userID) => dispatch => {
  axios.get('/api/users/' + userID + '/parties')
    .then(res => {
        dispatch({
          type: RETURN_PARTIES,
          payload: res.data
        });
      })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}
