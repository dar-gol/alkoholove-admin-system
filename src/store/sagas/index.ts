import { takeLatest } from 'redux-saga/effects';
import { GET_ALCOHOL } from '../actionTypes';
import { handleGetAlcohol } from './handlers';

export function* alcoholSaga() {
  yield takeLatest(GET_ALCOHOL, handleGetAlcohol);
}
