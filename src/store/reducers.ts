import { combineReducers } from 'redux';
import { alcoholReducer } from './reducer';

const allReducers = combineReducers({
  alcohol: alcoholReducer,
});

export default allReducers;
