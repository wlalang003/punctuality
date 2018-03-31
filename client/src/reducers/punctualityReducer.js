import _ from 'underscore';
import moment from 'moment';
import 'moment-timezone';
import { FETCH_DATA } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_DATA:
      return mapShiftstoRosters(action.payload);
    default:
      return state;
  }
}

function mapShiftstoRosters(payload) {
  let results = [];
  const rosters = payload.rosters || [];
  const shifts = payload.shifts || [];
  results = _.map(rosters, roster => {
    const shift = _.find(shifts, shift => shift.date === roster.date);
    const attendance = {
      day: moment(roster.date, 'YYYY-MM-DD').tz('Australia/Sydney'),
      rosterStart: serializeDateFromApi(roster.start),
      rosterFinish: serializeDateFromApi(roster.finish)
    };
    if (shift) {
      attendance.shiftStart = serializeDateFromApi(shift.start);
      attendance.shiftFinish = serializeDateFromApi(shift.finish);
    }
    return attendance;
  });
  return results;
}

function serializeDateFromApi(date) {
  if (date == null) {
    return null;
  }
  // date from database 2013-07-31 17:30:00+10
  return moment(date, 'YYYY-MM-DD HH:mm:ssZ').tz('Australia/Sydney');
}
