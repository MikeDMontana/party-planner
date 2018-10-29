import axios from 'axios';
import { GET_ERRORS, PARTY_IS_SELECTED } from './types';

export const viewSelectedParty = (selectedParty) => {
  return {
    type: PARTY_IS_SELECTED,
    party: selectedParty
  }
};
