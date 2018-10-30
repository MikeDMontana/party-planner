import { RECIPE_IS_SELECTED } from '../actions/types';

const initialState = {
  recipes: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case RECIPE_IS_SELECTED:
      return [
        ...state,
        action.recipe
      ];
      default:
        return state;
  }
};
