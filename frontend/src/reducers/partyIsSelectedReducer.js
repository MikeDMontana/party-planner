import { PARTY_IS_SELECTED } from '../actions/types';

const initialState = {
  party: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case PARTY_IS_SELECTED:
      return {
        ...state,
        party: action.party
      };
      default:
        return state;
  }
};
