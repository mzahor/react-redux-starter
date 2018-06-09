import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import auth from '../auth/auth.reducer';

export default function configureStore(preloadedState) {
  const store = createStore(
    auth,
    preloadedState,
    compose(applyMiddleware(thunk)),
  );

  return store;
}
