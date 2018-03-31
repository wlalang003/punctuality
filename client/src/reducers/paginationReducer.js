import { UPDATE_PER_PAGE, UPDATE_PAGE } from '../actions/types';

export default function(
  state = { page: 1, perPage: 25, menuValue: 25 },
  action
) {
  switch (action.type) {
    case UPDATE_PER_PAGE:
      return {
        page: 1,
        perPage: action.payload.perPage,
        menuValue: action.payload.menuValue
      };
    case UPDATE_PAGE:
      return {
        page: action.payload.page,
        perPage: state.perPage,
        menuValue: state.menuValue
      };
    default:
      return state;
  }
}
