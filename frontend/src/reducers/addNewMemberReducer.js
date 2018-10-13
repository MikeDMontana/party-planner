import { ADD_NEW_MEMBER } from '../actions/types';

const initialState = {
  members: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_NEW_MEMBER:
      return [
        ...state,
        action.member
      ];
      default:
        return state;
  }
};
