import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import addNewMemberReducer from './addNewMemberReducer';
import partyIsSelectedReducer from './partyIsSelectedReducer';
import recipeIsSelectedReducer from './recipeIsSelectedReducer';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  members: addNewMemberReducer,
  party: partyIsSelectedReducer,
  recipe: recipeIsSelectedReducer
});
