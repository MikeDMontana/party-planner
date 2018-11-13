import axios from 'axios';
import { GET_ERRORS, MEAL_IS_SELECTED } from './types';

export const viewSelectedMeal = (selectedMeal) => {
  return {
    type: MEAL_IS_SELECTED,
    meal: selectedMeal
  }
};
