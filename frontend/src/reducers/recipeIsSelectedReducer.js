import { RECIPE_IS_SELECTED } from '../actions/types';

const initialState = {
  recipe: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case RECIPE_IS_SELECTED:
      return {
        ...state,
        recipe: action.recipe
      };
      default:
        return state;
  }
};
