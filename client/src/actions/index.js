import axios from 'axios';
import settings from '../config/settings';
import { FETCH_DATA } from './types';

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
