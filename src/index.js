import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
//import { createBrowserHistory } from 'history';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux';

//const history = createBrowserHistory();
//basename={process.env.PUBLIC_URL}
const store = createStore(reducer);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  // </React.StrictMode>,
  , document.getElementById('root')
);
registerServiceWorker();
