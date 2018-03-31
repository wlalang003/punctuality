import axios from 'axios';
import settings from '../config/settings';
import { FETCH_DATA, UPDATE_PER_PAGE, UPDATE_PAGE } from './types';

export const fetchData = (from, to) => async dispatch => {
  const values = await Promise.all([
    fetchShifts(from, to),
    fetchRosters(from, to)
  ]);
  dispatch({
    type: FETCH_DATA,
    payload: { shifts: values[0].data, rosters: values[1].data }
  });
};

export const updatePerPage = (perPage, menuValue) => dispatch => {
  dispatch({ type: UPDATE_PER_PAGE, payload: { perPage, menuValue } });
};

export const updatePage = page => dispatch => {
  dispatch({ type: UPDATE_PAGE, payload: { page } });
};

const fetchShifts = (from, to) => {
  return axios.get(
    'http://localhost:' +
      settings.port +
      '/shifts/' +
      from.format() +
      '/' +
      to.format()
  );
};

const fetchRosters = (from, to) => {
  return axios.get(
    'http://localhost:' +
      settings.port +
      '/rosters/' +
      from.format() +
      '/' +
      to.format()
  );
};
