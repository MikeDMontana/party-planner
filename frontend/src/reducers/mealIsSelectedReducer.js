import { MEAL_IS_SELECTED } from '../actions/types';

const initialState = {
  meal: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case MEAL_IS_SELECTED:
      return {
        ...state,
        meal: action.meal
      };
      default:
        return state;
  }
};
