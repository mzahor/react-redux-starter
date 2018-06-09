import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import auth from '../auth/auth.reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  const store = createStore(
    auth,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, createLogger())),
  );

  return store;
}
