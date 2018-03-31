import moment from 'moment';
import { FETCH_DATA, UPDATE_PER_PAGE } from '../actions/types';

export default function(state = { page: 1, perPage: 5 }, action) {
  switch (action.type) {
    case UPDATE_PER_PAGE:
      return action.payload || false;
    default:
      // returns date range from start of time to current. this is to
      // make sure that we fetch all data
      return state;
  }
}
