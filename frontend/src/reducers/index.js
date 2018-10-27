import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import addNewMemberReducer from './addNewMemberReducer';
import partyIsSelectedReducer from './partyIsSelectedReducer';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  members: addNewMemberReducer,
  party: partyIsSelectedReducer
});
