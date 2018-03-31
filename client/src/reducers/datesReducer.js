import moment from 'moment';
import { FETCH_DATA } from '../actions/types';

export default function(state = getInitialDates(), action) {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload || false;
    default:
      // returns date range from start of time to current. this is to
      // make sure that we fetch all data
      return state;
  }
}

function getInitialDates() {
  return { from: moment.utc('1', 'X'), to: moment.utc() };
}
