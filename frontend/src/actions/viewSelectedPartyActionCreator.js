import axios from 'axios';
import { GET_ERRORS, PARTY_IS_SELECTED } from './types';

// export const viewSelectedParty = (selectedParty, history, userID) => dispatch => {
//   axios.get('/api/users/' + userID + '/parties/' + selectedParty._id, selectedParty)
//     .then( (res) => {
//       return {
//         type: PARTY_IS_SELECTED,
//         party: selectedParty
//       }
//     })
//     .then(() => {
//       history.push('/' + userID + '/parties/' + selectedParty._id + '/view');
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       });
//     });
// }

export const viewSelectedParty = (selectedParty) => {
  return {
    type: PARTY_IS_SELECTED,
    party: selectedParty
  }
};
