import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
//import { createBrowserHistory } from 'history';
import App from './App';
import * as serviceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import reducer from './store/reducer/reducer';

import carouselBuilderReducer from './store/reducer/carouselBuilderReducer';
import recipeBuilderReducer from './store/reducer/recipeBuilderReducer';
import authReducer from './store/reducer/auth';
import darkModeReducer from './store/reducer/darkModeReducer';

//const history = createBrowserHistory();
//basename={process.env.PUBLIC_URL}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  carouselBuilder: carouselBuilderReducer,
  recipeBuilder: recipeBuilderReducer,
  auth: authReducer,
  darkModeEnable: darkModeReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  , document.getElementById('root')
);
serviceWorker.unregister();
