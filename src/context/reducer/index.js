import {ADD_TEKNISI, LOGIN, LOGOUT} from '../types';
import {loginReducer, logoutReducer} from './authenticationReducer';
import { addTeknisi } from './teknisiReducer';

export function reducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return loginReducer(state, action.payload);
    case LOGOUT:
      return logoutReducer(state);

    case ADD_TEKNISI:
      return addTeknisi(state, action.payload);

    default:
      return state;
  }
}
