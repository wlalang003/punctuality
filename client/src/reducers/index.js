import { combineReducers } from 'redux';
import datesReducer from './datesReducer';
import punctualityReducer from './punctualityReducer';
import paginationReducer from './paginationReducer';

export default combineReducers({
  dates: datesReducer, // parameter from and to
  punctuality: punctualityReducer, // record of total shifts and rosters
  pagination: paginationReducer // current pagination parameters
});
