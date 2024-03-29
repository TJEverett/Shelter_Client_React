import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import { authDecrement, loopAt } from './actions/index';
import App from './components/App';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

store.dispatch(loopAt(authDecrement(), 60000));

store.subscribe(() => 
  console.log(store.getState())
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);