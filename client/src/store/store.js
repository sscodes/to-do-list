import { applyMiddleware, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk'; // Correct import

import rootReducer from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) // Use thunk middleware correctly
);

export default store;
