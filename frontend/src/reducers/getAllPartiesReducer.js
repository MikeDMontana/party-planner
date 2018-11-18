import { RETURN_PARTIES } from '../actions/types';

const initialState = {
  allParties: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case RETURN_PARTIES:
      return [
        ...state,
        action.payload
      ];
      default:
        return state;
  }
};
