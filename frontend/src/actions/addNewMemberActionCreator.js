import { ADD_NEW_MEMBER } from '../actions/types';

export const addMember = (member) => {
  return {
    type: ADD_NEW_MEMBER,
    member: member
  }
};
