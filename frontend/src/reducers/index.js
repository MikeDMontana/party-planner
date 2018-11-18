import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import addNewMemberReducer from './addNewMemberReducer';
import partyIsSelectedReducer from './partyIsSelectedReducer';
import recipeIsSelectedReducer from './recipeIsSelectedReducer';
import mealIsSelectedReducer from './mealIsSelectedReducer';
import getAllPartiesReducer from './getAllPartiesReducer';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  members: addNewMemberReducer,
  party: partyIsSelectedReducer,
  recipe: recipeIsSelectedReducer,
  meal: mealIsSelectedReducer,
  allParties: getAllPartiesReducer
});
