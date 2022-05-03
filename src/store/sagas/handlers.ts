import { call, put } from 'redux-saga/effects';
import { addAlcohol } from '../actionCreators';
import { getAlcohol } from './requests';

export function* handleGetAlcohol() {
  try {
    const data: Alcohol = yield call(getAlcohol);
    console.log(data);
    yield put(addAlcohol(data));
  } catch (e) {
    console.error(e);
  }
}
