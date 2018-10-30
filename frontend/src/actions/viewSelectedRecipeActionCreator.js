import axios from 'axios';
import { GET_ERRORS, RECIPE_IS_SELECTED } from './types';

export const viewSelectedRecipe = (selectedRecipe) => {
  return {
    type: RECIPE_IS_SELECTED,
    recipe: selectedRecipe
  }
};
