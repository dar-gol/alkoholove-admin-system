import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { addAlcohol } from './actionCreators';
import allReducers from './reducers';
import { alcoholSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(alcoholSaga);

export { addAlcohol };
export default store;
